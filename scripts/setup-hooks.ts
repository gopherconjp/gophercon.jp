import { execFileSync } from "node:child_process";
import { chmodSync, existsSync } from "node:fs";
import path from "node:path";

import { $ } from "bun";

import { ask, runMain } from "./lib/cli.ts";

const HOOKS = ["post-merge", "post-checkout", "post-rewrite"];
const MANIFESTS = ["package.json", "bun.lock"];

const main = async (): Promise<void> => {
  const root = path.resolve(import.meta.dir, "..");
  const hooksDir = path.join(root, ".githooks");

  for (const hook of HOOKS) {
    const hookPath = path.join(hooksDir, hook);
    if (!existsSync(hookPath)) {
      throw new Error(`Hook not found: ${hookPath}`);
    }

    chmodSync(hookPath, 0o755);
  }

  const current = await $`git config --get core.hooksPath`.cwd(root).quiet().nothrow().text();
  const existing = current.trim();
  if (existing !== "" && existing !== ".githooks") {
    const answer = (
      await ask(`core.hooksPath is currently "${existing}". Replace it with ".githooks"? [y/N] `)
    )
      .trim()
      .toLowerCase();
    if (answer !== "y" && answer !== "yes") {
      console.log("Aborted. Existing hooks configuration preserved.");
      return;
    }
  }

  await $`bun install`.cwd(root);

  const hashes = execFileSync("git", ["hash-object", ...MANIFESTS], { cwd: root })
    .toString()
    .trim();
  await Bun.write(path.join(root, "node_modules", ".githooks-installed"), `${hashes}\n`);

  await $`git config core.hooksPath .githooks`.cwd(root).quiet();

  console.log("");
  console.log("Git hooks enabled (core.hooksPath=.githooks).");
  console.log("bun install runs automatically after pull / checkout / rebase");
  console.log("when package.json or bun.lock changed.");
};

runMain(main, "setup-hooks");
