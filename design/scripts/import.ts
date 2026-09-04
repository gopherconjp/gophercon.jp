import { existsSync } from "node:fs";

import { ask, runMain } from "./lib/cli.ts";
import { cfg, snapshotPath } from "./lib/config.ts";
import { uploadFonts } from "./lib/fonts.ts";
import { ensureProject } from "./lib/import.ts";
import { Penpot } from "./lib/penpot.ts";

// oxlint-disable no-await-in-loop -- files import sequentially on purpose

const importOne = async (penpot: Penpot, file: string): Promise<void> => {
  const snapshot = snapshotPath(file);
  if (!existsSync(snapshot)) {
    throw new Error(`No snapshot found: ${snapshot}. Run: bun run penpot:export ${file}`);
  }

  const design = await penpot.findDesign(cfg.project, file);
  if (design?.file) {
    const answer = (
      await ask(`The design file "${file}" will be overwritten with ${snapshot}. Continue? [y/N] `)
    )
      .trim()
      .toLowerCase();
    if (answer !== "y" && answer !== "yes") {
      console.log("Aborted.");
      return;
    }
  }

  console.log(`Importing ${snapshot} ...`);

  const project = design?.project ?? (await ensureProject(penpot));
  const fileId = await penpot.importFile(project.id, file, Bun.file(snapshot));

  const previousFileId = design?.file?.id;
  if (previousFileId && previousFileId !== fileId) {
    console.log(`Deleting the previous "${file}" file (${previousFileId}) ...`);

    for (let attempt = 1; ; attempt++) {
      try {
        await penpot.deleteFile(previousFileId);
        break;
      } catch (error) {
        if (attempt >= 3) {
          throw new Error(
            `Imported "${file}" (${fileId}) but failed to delete previous file (${previousFileId}).`,
            { cause: error },
          );
        }

        await Bun.sleep(1000);
      }
    }
  }

  console.log("");
  console.log(`Imported "${file}" (${fileId}) into project "${cfg.project}".`);
};

const main = async (): Promise<void> => {
  const files = process.argv[2] ? [process.argv[2]] : cfg.files;

  const penpot = new Penpot(cfg.url);
  await penpot.login(cfg.email, cfg.password);

  for (const file of files) {
    await importOne(penpot, file);
  }

  console.log("Uploading fonts from public/font ...");

  const teams = await penpot.getTeams();
  const team = teams.find((t) => t.isDefault) ?? teams[0];
  if (team) {
    await uploadFonts(penpot, team.id);
  }
};

runMain(main);
