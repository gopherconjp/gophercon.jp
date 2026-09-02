import { $ } from "bun";

import { paths } from "./config.ts";

export const runCompose = async (...args: string[]): Promise<string> => {
  const cmd = [
    "docker",
    "compose",
    "-p",
    "penpot",
    "--project-directory",
    paths.design,
    "-f",
    paths.compose,
    ...args,
  ];

  const out = await $`${cmd}`.cwd(paths.design).nothrow().quiet();
  if (out.exitCode !== 0) {
    throw new Error(out.stderr.toString().trim());
  }

  return out.stdout.toString().trim();
};
