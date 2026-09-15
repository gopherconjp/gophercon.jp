# Copilot instructions

## Design (Penpot)

- See `penpot-design` skill for the full workflow. Only run when the user explicitly asks.
- Two design files: `gopherconjp` (shared) and `gopherconjp-2027` (year-specific). Confirm `penpot.currentFile.name` first, then follow `penpot-page-shared` or `penpot-page-2027` respectively (`penpot-design` covers shared MCP mechanics).

## Code

- `LocaleRedirector` and `LocaleSwitcher` are intentionally separate; do not merge.
- In Astro files, order blocks as markup, `script`, then `style`.

## Git and PR

- Penpot: `bun run penpot:export` first, snapshot separately.

## Verification

- After any code change: `bun run check`, `bun run lint`, `bun run format`, `bun run build`.
- After any Actions change: `actionlint`, `ghalint run`, `ghalint run-action`, `zizmor`.
- After any Astro/design change, also `bun run preview` in the browser.
