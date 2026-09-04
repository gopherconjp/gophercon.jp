import { runMain } from "./lib/cli.ts";
import { cfg } from "./lib/config.ts";
import { runCompose } from "./lib/docker.ts";
import { uploadFonts } from "./lib/fonts.ts";
import { ensureDesign } from "./lib/import.ts";
import { Penpot, PenpotError } from "./lib/penpot.ts";

// oxlint-disable no-await-in-loop -- the login retry loop awaits sequentially on purpose

const main = async (): Promise<void> => {
  console.log(await runCompose("up", "-d"));

  console.log("Waiting for the Penpot API ...");

  // Create the profile once on the very first boot.
  const penpot = new Penpot(cfg.url);
  const deadline = Date.now() + 4 * 60 * 1000;
  let provisioned = false;

  for (;;) {
    try {
      await penpot.login(cfg.email, cfg.password);
      break;
    } catch (error) {
      const isAuth =
        error instanceof PenpotError &&
        error.status !== undefined &&
        error.status >= 400 &&
        error.status < 500;
      if (isAuth && !provisioned) {
        console.log("Profile not found - creating it with manage.py ...");

        await runCompose(
          "exec",
          "-T",
          "penpot-backend",
          "python3",
          "manage.py",
          "create-profile",
          "-e",
          cfg.email,
          "-p",
          cfg.password,
          "-n",
          "gophercon.jp Creative",
          "--skip-tutorial",
          "--skip-walkthrough",
        );
        provisioned = true;
        continue;
      }

      if (Date.now() > deadline) {
        throw error;
      }
      await Bun.sleep(3000);
    }
  }

  console.log("Ensuring the gophercon.jp project / design file ...");

  const design = await ensureDesign(penpot);

  console.log("Uploading fonts from public/font ...");

  const team = (await penpot.getTeams()).find((t) => t.isDefault) ?? (await penpot.getTeams())[0];
  if (team) {
    await uploadFonts(penpot, team.id);
  }

  console.log("");
  console.log("Penpot is ready:");
  console.log(`  URL:     ${cfg.url}`);
  console.log(`  Account: ${cfg.email} / ${cfg.password}`);
  console.log(`  Project: ${cfg.project} (${design.projectId})`);
  console.log(`  File:    ${cfg.file} (${design.fileId})   [${design.action}]`);
  console.log("");
  console.log("To design with VS Code Copilot Chat (via MCP):");
  console.log(`  1. Open ${cfg.url} and sign in with the account above.`);
  console.log("  2. Open the design file (project: gophercon.jp).");
  console.log("  3. Enable MCP: Account -> Integrations -> MCP Server (generate a key if asked).");
  console.log(
    "  4. Run `bun run penpot:mcp` and paste the URL it shows (writes .vscode/mcp.json).",
  );
  console.log("  5. Reload the VS Code window, keep the design file focused in Penpot, and ask");
  console.log("     Copilot Chat to create the design.");
  console.log("");
  console.log("MCP always acts on the page focused in the active Penpot tab.");
};

runMain(main);
