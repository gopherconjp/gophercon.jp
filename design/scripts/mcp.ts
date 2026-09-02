import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createInterface } from "node:readline";

import { runMain } from "./lib/cli.ts";
import { paths } from "./lib/config.ts";

const ask = (prompt: string): Promise<string> =>
  new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

const main = async (): Promise<void> => {
  const url = (await ask("MCP URL (Account -> Integrations -> MCP Server): ")).trim();
  if (!url) {
    throw new Error("No URL given");
  }

  mkdirSync(dirname(paths.vscodeMcp), { recursive: true });
  await Bun.write(
    paths.vscodeMcp,
    `${JSON.stringify({ servers: { penpot: { type: "http", url } } }, null, 2)}\n`,
  );

  console.log(`Wrote ${paths.vscodeMcp}`);
  console.log("Reload the VS Code window (Developer: Reload Window), then verify with");
  console.log("`MCP: List Servers` or by asking Copilot Chat to use the penpot tools.");
  console.log("The file contains your MCP key but is git-ignored (.vscode/).");
};

runMain(main);
