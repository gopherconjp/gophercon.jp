---
name: penpot-design
description: Edit Penpot designs via the MCP plugin (boards, components, variants, tokens, layout). Use when changing a Penpot design, creating variants, adjusting spacing, or syncing design tokens to code.
---

# Penpot Design

Run only when the user explicitly asks for a design change.

## Preconditions

- Read the high-level overview first; work via `execute_code` with ids in `storage`; prefer `penpotUtils`; `openPage` before edits. Cross-page `clone`, `appendChild`, and `remove` are not allowed; if these actions are needed, consult a human to move shapes.

## Frames and spacing

- Page margin `40px`; group boards padding `60px`, gap `60px`; variant containers padding `30px`, gap `60px`.
- Frames: `dark` (`#00547D`) stroke, width `2` (`borderWidth-2`), solid center, no fill unless specified.
- Pixels multiples of 4 (8 from 40 up; key-visual exempt); tokenize spacing/dimensions.

## Edits

- `width` / `height` are read-only, use `resize` (`proportionLock = false` first); `parentX` / `parentY` use `setParentXY`; `fills` / `strokes` replaced whole, never mutated.
- Image stretch: spread-copy `fillImage` with `keepAspectRatio: false`. Uploads are human-only. No variant-switch interaction; dynamic states in code. Underlines use an inner stroke (`borderWidth-2`), not a fill.

## Text and layout

- `growType`: `auto-width` follows content, `auto-height` grows down, `fixed` never reflows; `characters` change may need `resize`; `textBounds` can be stale, re-read to verify.
- Band geometry follows CSS: board is text `+15`, text bottom at board `-15`; center variant centers text and band.
- Bottom-anchored text and band (`constraintsVertical: bottom`); width via `leftright` / `left` / `center` per spec; board `auto` sizing, `clipContent: false` (flex children use `layoutChild: fill`; `leftright` texts need `auto-height`).
- Verify board equals children union with bottom gaps intact after edits.

## Variants and tokens

- `createVariantContainer` plus `renameProperty` / `setVariantProperty`. Shape `tokens` are read-only (silent ignore); token renames orphan references, relink manually. Sync tokens to `token.css` (`--_*`).

## Verification

- `export_shape` PNG check; `penpot:export` plus snapshot commit, never skip; `check` / `lint` / `format`; `build` plus `preview` for Astro/design.

## Limits (explain, don't retry)

- Layer panel toggle, instance text relayout (use per-line-count variants), export darkening under translucent bands (geometry is truth).
