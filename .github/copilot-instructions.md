# Copilot instructions

## Language

- Code comments, commit messages (imperative, no prefix), and PR title/description in English.

## Design (Penpot)

- See `penpot-design` skill for the full workflow. Only run when the user explicitly asks.

## Code

- `LocaleRedirector` and `LocaleSwitcher` are intentionally separate; do not merge.
- Avoid comments; add one only for Why / Why Not of a behavior.

## Skills

- `git-commit-and-pr`: commit / push / create PR workflow. Only run when the user explicitly asks.
- `cleanup-merged-branch`: switch to main and delete the branch after a merge. Run proactively after a PR merge.
- `coderabbit-review-loop`: run CodeRabbit reviews until no findings remain before a PR. Only run when the user explicitly asks.
- `penpot-design`: edit Penpot designs via the MCP plugin. Only run when the user explicitly asks.
- `parallel-worktree`: open a sibling worktree in a new window for a parallel agent. Only run when the user explicitly asks.

## Verification

- After any code change: `bun run check`, `bun run lint`, `bun run format`.
- After any Astro/design change, also `bun run build` plus `bun run preview` in the browser.
