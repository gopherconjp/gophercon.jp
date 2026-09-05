---
name: coderabbit-review-loop
description: Run CodeRabbit reviews repeatedly until no findings remain before creating a PR. Use when the user asks to review with CodeRabbit or raise code quality before a PR.
---

# CodeRabbit Review Loop

Run before creating a PR to raise code quality. Only run when the user explicitly asks.

1. Record HEAD as `<loop-base>` (latest commit before the loop), then commit the worktree (use `git-commit-and-pr` commit-only flow).
2. Run `coderabbit review --agent --base-commit <last reviewed commit>` (first iteration: `<loop-base>`).
3. Check findings. Ask the user if any need a human design decision; if a finding is invalid, ask the user to add it to `.coderabbit.yaml` `path_instructions`.
4. Fix valid findings, run the standard checks (`bun run check`, `bun run lint`, `bun run format`), commit, and repeat until `findings: 0`.
5. When findings are 0: `git reset <loop-base>` (mixed: keep working tree, unstage), notify the user and wait for confirmation that there is nothing for the user to fix directly, then commit again with proper granularity (per `git-commit-and-pr`).
