import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { createInterface } from "node:readline";

import { runMain } from "./lib/cli.ts";
import { paths } from "./lib/config.ts";

const ask = (prompt: string): Promise<string> =>
  new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const loadMcpConfig = (): Record<string, unknown> => {
  if (!existsSync(paths.vscodeMcp)) {
    return {};
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(paths.vscodeMcp, "utf8"));
  } catch {
    throw new Error(`Cannot parse ${paths.vscodeMcp} as JSON; fix it manually, then re-run.`);
  }
  if (!isRecord(parsed)) {
    throw new Error(`${paths.vscodeMcp} must be a JSON object; fix it manually, then re-run.`);
  }

  return parsed;
};

const main = async (): Promise<void> => {
  const url = (await ask("MCP URL (Account -> Integrations -> MCP Server): ")).trim();
  if (!url) {
    throw new Error("No URL given");
  }

  const config = loadMcpConfig();
  const existingServers = config.servers;
  if (existingServers !== undefined && !isRecord(existingServers)) {
    throw new Error(
      `${paths.vscodeMcp} has an invalid "servers" entry; fix it manually, then re-run.`,
    );
  }

  config.servers = {
    ...existingServers,
    penpot: { type: "http", url },
  };

  mkdirSync(dirname(paths.vscodeMcp), { recursive: true });
  await Bun.write(paths.vscodeMcp, `${JSON.stringify(config, null, 2)}\n`);

  console.log(`Wrote ${paths.vscodeMcp}`);
  console.log("Reload the VS Code window (Developer: Reload Window), then verify with");
  console.log("`MCP: List Servers` or by asking Copilot Chat to use the penpot tools.");
  console.log("The file contains your MCP key but is git-ignored (.vscode/).");
};

runMain(main);
