---
name: coderabbit-review-loop
description: Run CodeRabbit reviews repeatedly until no findings remain before creating a PR. Use when the user asks to review with CodeRabbit or raise code quality before a PR.
---

# CodeRabbit Review Loop

Run before creating a PR to raise code quality. Only run when the user explicitly asks.

1. Ensure a feature branch (create/switch if needed), record HEAD as `<loop-base>`, then commit the worktree.
2. Run `coderabbit review --agent --base-commit <last reviewed>` (first: `<loop-base>`).
3. Ask the user on design decisions; ask before adding invalid findings to `.coderabbit.yaml` `path_instructions`.
4. Fix valid findings, run `bun run check`, `lint`, `format`, commit; repeat until `findings: 0`.
5. `git reset <loop-base>` (mixed, keep worktree), notify and wait, then recommit granularly.
