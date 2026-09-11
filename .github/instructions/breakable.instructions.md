---
description: "Use when writing or converting break-controlled copy for the Breakable component. Covers the pipe syntax (| || |||) for break priority, 改行位置指定, nested arrays, *...* accent emphasis, and [...] link."
applyTo: "src/components/_common/breakable/**, src/**/*.content.ts"
---

# Breakable copy

- Render via `Breakable` (`src/components/_common/breakable/index.astro`): `<Breakable value={title} locale={locale} />`. Break separator is `""` for `ja`, `" "` otherwise. Style is self-contained.
- Type `Breakable = string | Breakable[] | { accent: Breakable } | { link: Breakable; href: string }` (`types.ts` in the same directory, also usable from `*.content.ts` via `t<Breakable>`). Unlimited nesting; outer breaks before inner. `{ accent }` renders in accent color, wraps any `Breakable`, and recurses; `{ link, href }` renders an `<a href={href}>` wrapping any `Breakable` (each link carries its own href, so multiple links are supported); pipe-syntax parsing yields pipe-free string leaves.

## Pipe syntax (user to code)

Write break intent inline with pipes: more pipes = higher priority (breaks first).

- `|` inner, `||` outer, `|||` further outer, ...
- `en` trims spaces around pipes; `ja` needs none. Literal `|` is `｜` (full-width).
- Accent emphasis:
  1. Wrap a pipe-free span in `*...*` (e.g. `*情熱*`, `*passion*`).
  2. No `|` or `*` inside; must not span `||` or higher.
  3. Multi-word emphasis with an inner break: one accent per word joined by `|`: `*reach*|*Japan*`. Accent boundaries act as `|` (inner) breaks. Literal `*` is `＊` (full-width).
- Link:
  1. Wrap a pipe-free span in `[...]`, e.g. `[About page →]`, `[Aboutページ]`.
  2. No `|` or `[` / `]` inside; must not span `||` or higher.
  3. Multi-word link with an inner break: one link per word joined by `|`: `[About]|[page →]`. Link boundaries act as `|` (inner) breaks. Literal `[` / `]` are `［` / `］` (full-width).
- Invalid syntax (unmatched `*` / `[` / `]`, nested accent/link, pipe inside accent/link, empty accent/link): report an error naming which case occurred with the correct format.

Examples:

- `世界の|情熱を||日本へ。` → `[["世界の", "情熱を"], "日本へ。"]`
- `Let the world's | passion || reach | Japan.` → `[["Let the world's", "passion"], ["reach", "Japan."]]`
- `世界の*情熱*を||日本へ。` → `[["世界の", { accent: "情熱" }, "を"], "日本へ。"]`
- `Let the world's *passion* || reach | Japan.` → `[["Let the world's", { accent: "passion" }], ["reach", "Japan."]]`
- `*reach*|*Japan*` → `[{ accent: "reach" }, { accent: "Japan" }]`
- `Check out our [About page →]` → `["Check out our", { link: "About page →", href: "/2027/about" }]`
- `[About]|[page →]` → `[{ link: "About", href: "/2027/about" }, { link: "page →", href: "/2027/about" }]`

## Procedure

1. Extract each non-greedy, pipe-free, non-empty `*...*` as atomic `{ accent: <inner> }` and each non-greedy, pipe-free, bracket-balanced, non-empty `[...]` as atomic `{ link: <inner> }` (`*...*` first, then `[...]`; nesting accent inside link or vice versa is invalid).
2. Split by longest pipe run first (`|||`, then `||`, then `|`), recursively trimming `en` whitespace, into nested arrays. Unsplit segments stay plain strings without singleton wrapping.
3. Declare as `t<Breakable>({ en: [...], ja: [...] })`. Depths may differ per locale.
4. Pass through unchanged: `<Breakable value={title} locale={locale} />`.
