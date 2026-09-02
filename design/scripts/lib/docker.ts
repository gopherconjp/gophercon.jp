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
    const detail = out.stderr.toString().trim() || out.stdout.toString().trim();
    throw new Error(
      `docker compose ${args.join(" ")} failed (exit ${out.exitCode})${detail ? `: ${detail}` : ""}`,
    );
  }

  return out.stdout.toString().trim();
};
