import { existsSync } from "node:fs";

import { ask, runMain } from "./lib/cli.ts";
import { cfg, paths } from "./lib/config.ts";
import { uploadFonts } from "./lib/fonts.ts";
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

  console.log(`Importing ${paths.snapshot} ...`);

  const project = design?.project ?? (await ensureProject(penpot));
  const fileId = await penpot.importFile(project.id, cfg.file, Bun.file(paths.snapshot));

  const previousFileId = design?.file?.id;
  if (previousFileId && previousFileId !== fileId) {
    console.log(`Deleting the previous "${cfg.file}" file (${previousFileId}) ...`);

    // oxlint-disable no-await-in-loop -- sequential delete retries on purpose
    for (let attempt = 1; ; attempt++) {
      try {
        await penpot.deleteFile(previousFileId);
        break;
      } catch (error) {
        if (attempt >= 3) {
          throw new Error(
            `Imported "${cfg.file}" (${fileId}) but failed to delete previous file (${previousFileId}).`,
            { cause: error },
          );
        }

        await Bun.sleep(1000);
      }
    }
  }

  console.log("");
  console.log(`Imported "${cfg.file}" (${fileId}) into project "${cfg.project}".`);

  console.log("Uploading fonts from public/font ...");

  const teams = await penpot.getTeams();
  const team = teams.find((t) => t.isDefault) ?? teams[0];
  if (team) {
    await uploadFonts(penpot, team.id);
  }
};

runMain(main);
