import { resolve } from "node:path";

export const cfg = {
  url: (process.env.PENPOT_PUBLIC_URI ?? "http://localhost:9001").replace(/\/+$/, ""),
  email: process.env.PENPOT_EMAIL ?? "creative@gophercon.jp",
  password: process.env.PENPOT_PASSWORD ?? "password",
  project: process.env.PENPOT_PROJECT ?? "gophercon.jp",
  file: process.env.PENPOT_FILE ?? "gophercon.jp",
};

const LIB = import.meta.dir; // design/scripts/lib
export const paths = {
  design: resolve(LIB, "../.."), // design
  compose: resolve(LIB, "../../compose.yaml"),
  snapshot: resolve(LIB, "../../snapshot/gopherconjp.penpot"),
  vscodeMcp: resolve(LIB, "../../../.vscode/mcp.json"),
};
