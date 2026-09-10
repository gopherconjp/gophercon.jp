---
name: penpot-design
description: Edit Penpot designs via the MCP plugin (boards, components, variants, tokens, layout). Use when changing a Penpot design, creating variants, adjusting spacing, or syncing design tokens to code.
---

# Penpot Design

Run only when the user explicitly asks for a design change.

## Preconditions

- Read the high-level overview first; work via `execute_code` with ids in `storage`; prefer `penpotUtils`; `openPage` before edits. Cross-page `clone` / `appendChild` / `remove` are not allowed — consult a human.

## Frames and spacing

- Page margin `40px`; group boards padding `60px`, gap `60px`; variant containers padding `30px`, gap `60px`.
- Frames: `common/<category>` group boards `#8715E2` stroke, variant containers (`common/<Name>`, `isVariantContainer() === true`) `#BB97D8` inner stroke, width `2`, solid, no fill unless specified. Component mains and plain boards have no stroke or fill unless specified.
- Pixels multiples of 4 (8 from 40 up; key-visual exempt); tokenize spacing/dimensions.

## Edits

- `width` / `height` read-only → `resize` (`proportionLock = false` first); `parentX` / `parentY` → `setParentXY`; `fills` / `strokes` replaced whole, never mutated.
- Image stretch: spread-copy `fillImage` with `keepAspectRatio: false`. Uploads are human-only. No variant-switch interaction; dynamic states in code. Underlines use an inner stroke (`borderWidth-2`), not a fill.

## Text and layout

- `growType`: `auto-width` follows content, `auto-height` grows down, `fixed` never reflows; `characters` change may need `resize`; `textBounds` can be stale, re-read to verify.
- Band geometry: board is text `+15`, text bottom at board `-15`; center variant centers text and band.
- Bottom-anchored text and band (`constraintsVertical: bottom`); width via `leftright` / `left` / `center` per spec; board `auto` sizing, `clipContent: false` (flex children use `layoutChild: fill`; `leftright` texts need `auto-height`).
- Verify board equals children union with bottom gaps intact after edits.
- `createText` requires a string arg; set `growType` after `resize`.
- After changing text in nested instances, re-anchor the label (`setParentXY(label, 0, 0)`).
- Don't add text labels that merely repeat shape names.

## Tokens

- Library: `penpot.library.local.tokens` — `addSet({name})` → `set.addToken({type,name,value})` → `set.toggleActive()`. Values: color `"#RRGGBB"`, fontSizes string number, fontFamilies string[] of family names.
- `fontFamilies` apply sets the FIRST family matching an installed font.
- Color-token `applyToShapes` is unreliable on text nested in variant mains: set `shape.fills = []` first, then apply, then read.
- No faux bold in Penpot: bold needs an uploaded Bold font file (fonts are team-level, not in snapshots).
- Variants: `createVariantContainer` plus `renameProperty` / `setVariantProperty`. Shape `tokens` are read-only (silent ignore); token renames orphan references, relink manually.
- Sync tokens to `token.css` (`--_*`).

## Components

- Names: `common/<category>/<Name>` (shared) / `home/<Name>` (home). Variant components need `.path` set explicitly (name ignores slash).
- Resizing a variant main propagates to instances.

## Verification

- `export_shape` PNG check; `penpot:export` plus snapshot commit, never skip; `check` / `lint` / `format`; `build` plus `preview` for Astro/design.
- After edits, verify propagation to instances and report code-design diffs before fixing.

## Limits (explain, don't retry)

- Layer panel toggle, instance text relayout (use per-line-count variants), export darkening under translucent bands (geometry is truth).
