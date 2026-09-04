import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import { runMain } from "./lib/cli.ts";
import { cfg, snapshotPath } from "./lib/config.ts";
import { Penpot } from "./lib/penpot.ts";

// oxlint-disable no-await-in-loop -- files export sequentially on purpose

const exportOne = async (penpot: Penpot, file: string): Promise<void> => {
  const snapshot = snapshotPath(file);

  const design = await penpot.findDesign(cfg.project, file);
  if (!design?.file) {
    throw new Error(`No design file "${file}" yet. Run: bun run penpot`);
  }

  console.log(`Exporting "${file}" ...`);

  mkdirSync(dirname(snapshot), { recursive: true });
  await Bun.write(snapshot, await penpot.exportFile(design.file.id));

  console.log(`Snapshot: design/snapshot/${file}.penpot`);
};

const main = async (): Promise<void> => {
  const files = process.argv[2] ? [process.argv[2]] : cfg.files;

  const penpot = new Penpot(cfg.url);
  await penpot.login(cfg.email, cfg.password);

  for (const file of files) {
    await exportOne(penpot, file);
  }

  console.log("");
  console.log("Restore:  bun run penpot imports it automatically when the file is missing");
};

runMain(main);
