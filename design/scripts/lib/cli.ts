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

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
