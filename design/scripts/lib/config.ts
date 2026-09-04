import { resolve } from "node:path";

export const cfg = {
  url: "http://localhost:9001",
  email: "creative@gophercon.jp",
  password: "password",
  project: "gophercon.jp",
  file: "gophercon.jp",
};

const LIB = import.meta.dir; // design/scripts/lib
export const paths = {
  design: resolve(LIB, "../.."),
  compose: resolve(LIB, "../../compose.yaml"),
  snapshot: resolve(LIB, "../../snapshot/gopherconjp.penpot"),
  fonts: resolve(LIB, "../../../public/font"),
  vscodeMcp: resolve(LIB, "../../../.vscode/mcp.json"),
};
