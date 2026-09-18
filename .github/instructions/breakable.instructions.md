---
description: "Use when writing or converting break-controlled copy for the Breakable component. Covers the pipe syntax (| || |||) for break priority, 改行位置指定, nested arrays, *...* accent emphasis, and [...] link."
applyTo: "src/components/_common/breakable/**, src/**/*.content.ts"
---

# Breakable copy

- Render: `<Breakable value={title} space={...} />`. `space` inserts a space between chunks (default `true`); `space={false}` for `ja` or fixed no-space content (e.g. emails).
- Type: `Breakable = string | Breakable[] | { accent } | { link; href } | { break: true }` (`types.ts`, via `t<Breakable>`). Unlimited nesting; outer breaks before inner.
- With `space={false}`, never split a span containing a space (`Abema Towers`): the `""` separator deletes it. Keep one chunk; the browser wraps at the space.
- Line breaks are `{ break: true }` (rendered `<br />`), never `\n`. Arrays containing a break are not chunk-wrapped.

## Pipe syntax (user to code)

More pipes = higher priority: `|` inner, `||` outer, `|||` further outer. `\n` is the outermost break → top-level `{ break: true }`. `en` trims spaces around pipes; `ja` needs none. Literal `|` is `｜`.

- Accent: `*...*` (`*情熱*`). No `|`/`*` inside; must not span `||`+. Multi-word: `*reach*|*Japan*`; accent boundaries act as `|`. Literal `*` is `＊`.
- Link: `[...]` (`[Aboutページ]`). No `|`/`[`/`]` inside; must not span `||`+. Multi-word: `[About]|[page →]`; link boundaries act as `|`. Literal `[`/`]` are `［`/`］`.
- Invalid syntax (unmatched `*`/`[`/`]`, nested accent/link, pipe inside accent/link, empty accent/link): report an error naming the case with the correct format.

Examples:

- `世界の|情熱を||日本へ。` → `[["世界の", "情熱を"], "日本へ。"]`
- `世界の*情熱*を||日本へ。` → `[["世界の", { accent: "情熱" }, "を"], "日本へ。"]`
- `*reach*|*Japan*` → `[{ accent: "reach" }, { accent: "Japan" }]`
- `Check out our [About page →]` → `["Check out our", { link: "About page →", href: "/2027/about" }]`
- `これは|サンプル文章です。\nこれは|サンプル文章です。` → `[["これは", "サンプル文章です。"], { break: true }, ["これは", "サンプル文章です。"]]`

## Procedure

1. Split by `\n` → top-level `{ break: true }` between segments.
2. Extract pipe-free `*...*` as `{ accent }`, then `[...]` as `{ link }` (nesting accent/link is invalid).
3. Split by longest pipe run first (`|||` → `||` → `|`), recursively trimming `en` whitespace, into nested arrays. Unsplit segments stay plain strings.
4. Declare as `t<Breakable>({ en: [...], ja: [...] })`. Depths may differ per locale.
5. Pass `Breakable` through unchanged.
