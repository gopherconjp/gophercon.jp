# Copilot instructions

## Language

- Code comments, commit messages (imperative, no prefix), and PR title/description in English.

## Design (Penpot)

- See `penpot-design` skill for the full workflow. Only run when the user explicitly asks.

## Code

- `LocaleRedirector` and `LocaleSwitcher` are intentionally separate; do not merge.
- Avoid comments; add one only for Why / Why Not of a behavior.
- In Astro files, order blocks as markup, `script`, then `style`.

## Verification

- After any code change: `bun run check`, `bun run lint`, `bun run format`.
- After any Astro/design change, also `bun run build` plus `bun run preview` in the browser.
