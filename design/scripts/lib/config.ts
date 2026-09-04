import { resolve } from "node:path";

export const cfg = {
  url: "http://localhost:9001",
  email: "creative@gophercon.jp",
  password: "password",
  project: "gophercon.jp",
  files: ["gopherconjp-2027"],
};

const LIB = import.meta.dir; // design/scripts/lib
export const paths = {
  design: resolve(LIB, "../.."),
  compose: resolve(LIB, "../../compose.yaml"),
  snapshotDir: resolve(LIB, "../../snapshot"),
  fonts: resolve(LIB, "../../../public/font"),
  vscodeMcp: resolve(LIB, "../../../.vscode/mcp.json"),
};

// Snapshot path for a design file: design/snapshot/<file>.penpot
export const snapshotPath = (file: string): string => `${paths.snapshotDir}/${file}.penpot`;
