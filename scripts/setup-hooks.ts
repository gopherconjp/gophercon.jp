import { execFileSync } from "node:child_process";
import { chmodSync, existsSync } from "node:fs";
import path from "node:path";

import { $ } from "bun";

import { ask, runMain } from "./lib/cli.ts";

const HOOKS = ["post-merge", "post-checkout", "post-rewrite"];
const MANIFESTS = ["package.json", "bun.lock"];

const main = async (isInit: boolean): Promise<void> => {
  const root = path.resolve(import.meta.dir, "..");
  const hooksDir = path.join(root, ".githooks");

  // Skip hook setup where no git checkout exists, such as CI or published tarballs.
  const { exitCode } = await $`git rev-parse --is-inside-work-tree`.cwd(root).quiet().nothrow();
  if (exitCode !== 0) {
    console.log("Skipping git hooks setup (not inside a git work tree).");
    return;
  }

  for (const hook of HOOKS) {
    const hookPath = path.join(hooksDir, hook);
    if (!existsSync(hookPath)) {
      throw new Error(`Hook not found: ${hookPath}`);
    }

    chmodSync(hookPath, 0o755);
  }

  const current = (
    await $`git config --get core.hooksPath`.cwd(root).quiet().nothrow().text()
  ).trim();
  if (current !== "" && current !== ".githooks") {
    // Postinstall runs non-interactively, so an existing hooks configuration is preserved instead of asking.
    if (!isInit) {
      console.warn(
        `[setup-hooks] core.hooksPath is currently "${current}". Skipping hook setup to preserve existing configuration.`,
      );
      return;
    }

    const answer = (
      await ask(`core.hooksPath is currently "${current}". Replace it with ".githooks"? [y/N] `)
    )
      .trim()
      .toLowerCase();
    if (answer !== "y" && answer !== "yes") {
      console.log("Aborted. Existing hooks configuration preserved.");
      return;
    }
  }

  if (isInit) {
    await $`bun install`.cwd(root);
  }

  const hashes = execFileSync("git", ["hash-object", ...MANIFESTS], { cwd: root })
    .toString()
    .trim();
  await Bun.write(path.join(root, "node_modules", ".githooks-installed"), `${hashes}\n`);

  await $`git config core.hooksPath .githooks`.cwd(root).quiet();

  console.log("");
  console.log("Git hooks enabled (core.hooksPath=.githooks).");
  console.log(
    "bun install runs automatically after pull / checkout / rebase when package.json or bun.lock changed.",
  );
};

const isInit = process.argv.includes("--init");
runMain(() => main(isInit), "setup-hooks");
