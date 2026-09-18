import { resolve } from "node:path";

export const cfg = {
  url: "http://localhost:9001",
  email: "creative@gophercon.jp",
  password: "password",
  project: "gophercon.jp",
  files: ["gopherconjp", "gopherconjp-2027"],
  libs: ["Material-Design-Icons"],
};

const LIB = import.meta.dir; // design/scripts/lib
export const paths = {
  design: resolve(LIB, "../.."),
  compose: resolve(LIB, "../../compose.yaml"),
  snapshotDir: resolve(LIB, "../../snapshot"),
  libDir: resolve(LIB, "../../lib"),
  fonts: resolve(LIB, "../../../public/font"),
  vscodeMcp: resolve(LIB, "../../../.vscode/mcp.json"),
};

export const snapshotPath = (file: string): string => `${paths.snapshotDir}/${file}.penpot`;

export const libPath = (file: string): string => `${paths.libDir}/${file}.penpot`;

export const isLib = (file: string): boolean => cfg.libs.includes(file);
