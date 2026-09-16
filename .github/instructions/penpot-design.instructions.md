---
description: "Penpot MCP mechanics shared by all design files. Use when editing any Penpot design via the MCP plugin (boards, components, variants, tokens, layout, verification)."
---

# Penpot design (shared)

Run only when the user explicitly asks for a design change.

## Preconditions

- Read overview first; `execute_code` with ids in `storage`; prefer `penpotUtils`; `openPage` before edits. No cross-page `clone` / `appendChild` / `remove` — ask a human.
- Use `gopherconjp` for shared components (`Core Components`, `404`); use `gopherconjp-2027` for year-specific designs. Confirm `penpot.currentFile.name`; never assume.

## Frames and spacing

- Page margin `40px`; group boards padding `60px`, gap `60px`; variant containers padding `30px`, gap `60px`.
- Frames: group boards (`common/<category>`) `#8715E2` stroke; variant containers (`common/<Name>`, `isVariantContainer()`) `#BB97D8` inner stroke, width `2`, solid. No fill/stroke unless specified.
- Pixels multiples of 4 (8 from 40 up; key-visual exempt); tokenize spacing/dimensions.

## Edits

- `width` / `height` read-only → `resize` (`proportionLock = false` first); `parentX` / `parentY` → `setParentXY`; `fills` / `strokes` replaced whole, never mutated.
- Image stretch: spread-copy `fillImage` with `keepAspectRatio: false`. Uploads are human-only. No variant-switch interactions; states in code. Underlines use an inner stroke (`borderWidth-2`), not a fill.

## Text and layout

- `growType`: `auto-width` follows content, `auto-height` grows down, `fixed` never reflows; `characters` change may need `resize`; `textBounds` can be stale, re-read to verify.
- Band: board is text `+15`, text bottom at board `-15`, bottom-anchored (`constraintsVertical: bottom`); center variant centers both. Width via `leftright` / `left` / `center` per spec; board `auto` sizing, `clipContent: false` (flex children `layoutChild: fill`; `leftright` texts need `auto-height`); verify board equals children union with bottom gaps intact.
- `createText` needs a string arg; set `growType` after `resize`.
- After changing nested-instance text, re-anchor label (`setParentXY(label, 0, 0)`).
- No labels echoing shape names.
- Column flex margins are additive (`bottomMargin` + next `topMargin`); write `topMargin` / `bottomMargin` individually, never `verticalMargin` (linked). If a write looks ignored, rewrite both sides individually, then re-verify `parentY` / `height` and `tokens`.

## Tokens

- Library: `penpot.library.local.tokens` — `addSet({name})` → `set.addToken({type,name,value})` → `set.toggleActive()`. Values: color `"#RRGGBB"`, fontSizes string number, fontFamilies string[] of family names.
- `fontFamilies` apply uses FIRST matching installed font.
- Color-token on text nested in variant mains: `shape.fills = []` first, then apply, then read.
- No faux bold: bold needs an uploaded Bold file (fonts are team-level, not in snapshots).
- Variants: `createVariantContainer` + `renameProperty` / `setVariantProperty`. `tokens` read-only (silent ignore); renames orphan references, relink manually.
- Sync tokens to `token.css` (`--_*`).

## Components

- Names: `common/<category>/<Name>` (shared) / `<page>/<Name>` (page-local, e.g. `home/<Name>`, `404/<Name>`). Variant components need `.path` set explicitly (name ignores slash).
- Variant-main resize propagates to instances.
- Instance text (`auto-width` follows content):
  1. Never `resize` height (comes from the variant, e.g. `Lines`).
  2. To change height, switch the variant.
  3. Otherwise replace with a fresh instance.

## Verification

- `export_shape` PNG check; `penpot:export` + snapshot commit, never skip; verify instance propagation and report code-design diffs before fixing.

## Limits (explain, don't retry)

- Layer panel toggle, instance text relayout (use per-line-count variants), export darkening under translucent bands (geometry is truth).
