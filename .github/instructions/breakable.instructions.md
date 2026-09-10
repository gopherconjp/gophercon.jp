---
description: "Use when writing or converting break-controlled copy for the Breakable component. Covers the pipe syntax (| || |||) for break priority, 改行位置指定, and nested arrays."
applyTo: "src/components/2027/_common/breakable/**, src/**/*.content.ts"
---

# Breakable copy

- Render via `Breakable` (`src/components/2027/_common/breakable/index.astro`): `<Breakable value={title} locale={locale} />`. Separator: `ja` = `""`, otherwise `" "`. Style is self-contained.
- Type `Breakable = string | Breakable[]` (`types.ts` in the same directory, also usable from `*.content.ts` via `t<Breakable>`). Nesting is unlimited; outer boundaries break before inner ones.

## Pipe syntax (user to code)

User writes break intent inline with pipes: more pipes means higher priority (breaks first).

- `|` inner, `||` outer, `|||` further outer, and so on.
- `en` ignores spaces around pipes; `ja` needs none. Literal `|` in copy is `｜` (full-width).
- Invalid pipe syntax: respond with an error message indicating the correct format.

Examples:

- `世界の | 情熱を || 日本へ。` → `[["世界の", "情熱を"], "日本へ。"]`
- `Let the world's | passion || reach | Japan.` → `[["Let the world's", "passion"], ["reach", "Japan."]]`

## Procedure

1. Split by the longest pipe run first (`|||`, then `||`, then `|`), recursively trimming `en` whitespace, to build nested arrays. Segments without further splits stay as plain strings with no singleton wrapping.
2. Declare as `t<Breakable>({ en: [...], ja: [...] })`. Depths may differ per locale.
3. Pass through unchanged: `<Breakable value={title} locale={locale} />`.
