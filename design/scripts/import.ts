import { existsSync } from "node:fs";

import { ask, runMain } from "./lib/cli.ts";
import { cfg, paths } from "./lib/config.ts";
import { ensureProject } from "./lib/import.ts";
import { Penpot } from "./lib/penpot.ts";

const main = async (): Promise<void> => {
  if (!existsSync(paths.snapshot)) {
    throw new Error(`No snapshot found: ${paths.snapshot}. Run: bun run penpot:export`);
  }

  const penpot = new Penpot(cfg.url);
  await penpot.login(cfg.email, cfg.password);

  const design = await penpot.findDesign(cfg.project, cfg.file);
  if (design?.file) {
    const answer = (
      await ask(
        `The design file "${cfg.file}" will be overwritten with ${paths.snapshot}. Continue? [y/N] `,
      )
    )
      .trim()
      .toLowerCase();
    if (answer !== "y" && answer !== "yes") {
      console.log("Aborted.");
      return;
    }
  }

  const project = design?.project ?? (await ensureProject(penpot));

  console.log(`Importing ${paths.snapshot} ...`);

  const fileId = await penpot.importFile(project.id, cfg.file, Bun.file(paths.snapshot));

  if (design?.file && design.file.id !== fileId) {
    console.log(`Deleting the previous "${cfg.file}" file (${design.file.id}) ...`);

    await penpot.deleteFile(design.file.id);
  }

  console.log("");
  console.log(`Imported "${cfg.file}" (${fileId}) into project "${cfg.project}".`);
};

runMain(main);
