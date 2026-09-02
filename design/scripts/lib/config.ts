import { resolve } from "node:path";

// Local-only Penpot setup: fixed values, no environment overrides.
export const cfg = {
  url: "http://localhost:9001",
  email: "creative@gophercon.jp",
  password: "password",
  project: "gophercon.jp",
  file: "gophercon.jp",
};

const LIB = import.meta.dir; // design/scripts/lib
export const paths = {
  design: resolve(LIB, "../.."), // design
  compose: resolve(LIB, "../../compose.yaml"),
  snapshot: resolve(LIB, "../../snapshot/gopherconjp.penpot"),
  vscodeMcp: resolve(LIB, "../../../.vscode/mcp.json"),
};
