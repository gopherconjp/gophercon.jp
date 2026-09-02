import { $ } from "bun";

import { cfg, paths } from "./config.ts";

const MARKER = "[PASSWORD]";

const redact = (text: string): string =>
  cfg.password ? text.split(cfg.password).join(MARKER) : text;

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
    const detail = redact(out.stderr.toString().trim() || out.stdout.toString().trim());
    const printCmd = cmd.map((arg) => JSON.stringify(redact(arg))).join(" ");
    throw new Error(`${printCmd} failed (exit ${out.exitCode})${detail ? `: ${detail}` : ""}`);
  }

  return out.stdout.toString().trim();
};
