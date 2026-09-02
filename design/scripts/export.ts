import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import { runMain } from "./lib/cli.ts";
import { cfg, paths } from "./lib/config.ts";
import { Penpot } from "./lib/penpot.ts";

const main = async (): Promise<void> => {
  const penpot = new Penpot(cfg.url);
  await penpot.login(cfg.email, cfg.password);

  const file = (await penpot.findDesign(cfg.project, cfg.file))?.file;
  if (!file) {
    throw new Error("No design file yet. Run: bun run penpot");
  }

  console.log(`Exporting "${file.name}" ...`);

  mkdirSync(dirname(paths.snapshot), { recursive: true });
  await Bun.write(paths.snapshot, await penpot.exportFile(file.id));

  console.log("");
  console.log("Snapshot: design/snapshot/gopherconjp.penpot");
  console.log("Restore:  bun run penpot imports it automatically when the file is missing");
};

runMain(main);
