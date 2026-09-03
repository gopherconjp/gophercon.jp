import { createInterface } from "node:readline";

export const runMain = (main: () => Promise<void>): void => {
  main().catch((error: unknown) => {
    console.error(`[penpot] ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
};

export const ask = (prompt: string): Promise<string> =>
  new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });

    // EOF (e.g. piped empty stdin) emits "close" without invoking the question callback;
    // settle with an empty answer so callers abort.
    rl.once("close", () => {
      resolve("");
    });
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
