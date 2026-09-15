# Copilot instructions

## Design (Penpot)

- See `penpot-design` skill for the full workflow. Only run when the user explicitly asks.
- Two files: `gopherconjp` (shared) and `gopherconjp-2027` (year-specific). Confirm `penpot.currentFile.name` first, then follow `penpot-page-shared` / `penpot-page-2027` respectively (`penpot-design` covers shared mechanics).

## Code

- `LocaleRedirector` and `LocaleSwitcher` are intentionally separate; do not merge.
- In Astro files, order blocks as markup, `script`, then `style`.
- `body`'s `margin: 0` covers only `body` itself; `p` needs its own reset (UA default `1em`). `h1`/`h2`/`h3` are covered globally.
- Quotes are straight `"` only; never curly `“”` / `‘’` (Gremlins flags them). Literal `"` inside `*.content.ts` strings uses single-quoted literals. Same rule applies to Penpot text.

## Git and PR

- Penpot: `bun run penpot:export` first, snapshot separately.

## Verification

- After any code change: `bun run check`, `bun run lint`, `bun run format`, `bun run build`.
- After any Actions change: `actionlint`, `ghalint run`, `ghalint run-action`, `zizmor`.
- After any Astro/design change, also `bun run preview` in the browser.
