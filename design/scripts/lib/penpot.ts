interface Team {
  id: string;
  isDefault?: boolean;
}

interface Project {
  id: string;
  name: string;
}

interface DesignFile {
  id: string;
  name: string;
}

interface DesignTarget {
  project: Project;
  file?: DesignFile;
}

export class PenpotError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "PenpotError";
  }
}

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

const isLoopbackHost = (hostname: string): boolean => {
  const octets = hostname.split(".");
  const isLoopbackIpv4 =
    octets.length === 4 &&
    octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255) &&
    octets[0] === "127";

  return (
    hostname === "localhost" ||
    isLoopbackIpv4 ||
    hostname === "::1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost")
  );
};

// Minimal client for Penpot's RPC API: POST /api/main/methods/<name>,
// auth via the `auth-token` cookie returned by login().
export class Penpot {
  private token: string | null = null;
  private readonly origin: string;

  constructor(readonly url: string) {
    let parsed: URL;
    try {
      parsed = new URL(this.url);
    } catch {
      throw new PenpotError(`invalid Penpot URL: ${this.url}`);
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new PenpotError(`invalid Penpot URL protocol: ${parsed.protocol}`);
    }
    if (parsed.protocol === "http:" && !isLoopbackHost(parsed.hostname)) {
      throw new PenpotError(
        `refusing cleartext http:// to ${parsed.hostname}; use https:// or a loopback address`,
      );
    }

    this.origin = parsed.origin;
  }

  private authHeaders(): Record<string, string> {
    return this.token ? { Cookie: `auth-token=${this.token}` } : {};
  }

  private headers(): Record<string, string> {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...this.authHeaders(),
    };
  }

  private async post(method: string, params: Record<string, unknown>): Promise<string> {
    const res = await fetch(`${this.url}/api/main/methods/${method}`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(params),
    });

    const text = await res.text();
    if (!res.ok) {
      throw new PenpotError(`${method} -> HTTP ${res.status}: ${text.slice(0, 200)}`, res.status);
    }

    return text;
  }

  private async request<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    const text = await this.post(method, params);

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- JSON.parse is untyped
    return text ? (JSON.parse(text) as T) : (null as T);
  }

  async login(email: string, password: string): Promise<void> {
    const res = await fetch(`${this.url}/api/main/methods/login-with-password`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      redirect: "error",
    });
    if (!res.ok) {
      throw new PenpotError(`login -> HTTP ${res.status}`, res.status);
    }

    this.token =
      res.headers
        .getSetCookie()
        .map((cookie) => cookie.match(/auth-token=([^;]+)/)?.[1])
        .find(Boolean) ?? null;
    if (!this.token) {
      throw new Error("login: no auth-token cookie returned");
    }
  }

  getTeams(): Promise<Team[]> {
    return this.request("get-teams");
  }

  getAllProjects(): Promise<Project[]> {
    return this.request("get-all-projects");
  }

  getProjectFiles(projectId: string): Promise<DesignFile[]> {
    return this.request("get-project-files", { projectId });
  }

  createProject(teamId: string, name: string): Promise<Project> {
    return this.request("create-project", { teamId, name });
  }

  createFile(projectId: string, name: string): Promise<DesignFile> {
    return this.request("create-file", { projectId, name });
  }

  async findDesign(projectName: string, fileName: string): Promise<DesignTarget | undefined> {
    const project = (await this.getAllProjects()).find((p) => p.name === projectName);
    if (!project) {
      return undefined;
    }

    const file = (await this.getProjectFiles(project.id)).find((f) => f.name === fileName);
    return { project, file };
  }

  async importFile(projectId: string, name: string, file: Blob): Promise<string> {
    if (!this.token) {
      throw new PenpotError("import-binfile: not logged in");
    }

    const form = new FormData();
    form.append("name", name);
    form.append("project-id", projectId);
    form.append("file", file, "gopherconjp.penpot");

    const res = await fetch(`${this.url}/api/main/methods/import-binfile`, {
      method: "POST",
      headers: { Accept: "application/json", ...this.authHeaders() },
      body: form,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new PenpotError(
        `import-binfile -> HTTP ${res.status}: ${text.slice(0, 200)}`,
        res.status,
      );
    }

    const lines = text.split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i] === "event: end") {
        const fileId = lines[i + 1]?.match(UUID)?.[0];
        if (fileId) {
          return fileId;
        }
      }
    }

    throw new Error("import-binfile: no created file id in response");
  }

  async exportFile(fileId: string): Promise<Response> {
    const body = await this.post("export-binfile", {
      fileId,
      includeLibraries: false,
      embedAssets: true,
    });

    const uri = body.match(/"~#uri":"([^"]+)"/)?.[1];
    if (!uri) {
      throw new Error("export-binfile: no asset URL in response");
    }

    const target = new URL(uri, this.url);
    if (target.origin !== this.origin) {
      throw new PenpotError(`export-binfile: unexpected asset origin: ${target.origin}`);
    }

    const res = await fetch(target, { headers: this.headers(), redirect: "error" });
    if (!res.ok) {
      throw new PenpotError(`download -> HTTP ${res.status}`, res.status);
    }

    return res;
  }
}
