# Copilot instructions

## Language

- Code comments, commit messages (imperative, no prefix), and PR title/description in English.

## Design (Penpot)

- After any Penpot change, run `bun run penpot:export` and commit the snapshot. Never skip.
- Sync changed tokens to `src/components/2027/_styles/token.css` (`--_*`).
- Pixels are multiples of 4 (multiples of 8 from 40 up; key-visual exempt); tokenize spacing/dimensions.
- Image uploads are manual (human), not the agent.
- No variant-switch interaction in Penpot; dynamic states are implemented in code.
- Underlines use an inner stroke bound to the `borderWidth-2` token, not a fill.

## Code

- `LocaleRedirector` (auto redirect) and `LocaleSwitcher` (explicit switch) are intentionally separate; do not merge.

## Skills

- `git-commit-and-pr`: commit / push / create PR workflow. Only run when the user explicitly asks.
- `cleanup-merged-branch`: switch to main and delete the branch after a merge. Run proactively after a PR merge.
- `coderabbit-review-loop`: run CodeRabbit reviews until no findings remain before a PR. Only run when the user explicitly asks.

## Verification

- After any code change: `bun run check`, `bun run lint`, `bun run format`.
- After any Astro/design change, also `bun run build` plus `bun run preview` in the browser.
