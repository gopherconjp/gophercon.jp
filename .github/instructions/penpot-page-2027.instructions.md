---
description: "Penpot page assembly for the gopherconjp-2027 file (Common Components, Home, About, Contact). Use when editing 2027 page designs, H2/Link styling, section spacing, or Desktop/Mobile composition in that file."
---

# Penpot page assembly (2027)

File: `gopherconjp-2027`. Code inherits via sync with no strict constraints.

## Boards

- Per page: `Desktop` / `Mobile` selections plus `Components` board.
- `Components` holds per-section variant containers (e.g. `home / Section1`, `Language` x `Viewport`); sections are variant components, not plain boards. `Desktop` / `Mobile` compose instances only (page-banner, sections, header, footer).
- `Language` x `Viewport` containers: 2x2 grid, Desktop row on top (EN left, JA right), Mobile row below (EN left, JA right); `60px` gaps.

## Sections

- Section layout checklist:
  1. ContentBox-based (`normal` / `text`), full-width `content` frame, `64px` vertical padding.
  2. Gaps `32px` / `40px` / `48px`; H2-Body and H3-Body `40px`.
  3. Outer frame centered; inner content left-aligned except `body` centered.
- Exception to no-fill rule: white sections paint `#FFFFFF`; `content` frames never take fills (clear `createBoard` white default).
- H2 sizing per `src/components/2027/_styles/elements.css`: board shrink-wraps text (`inline-block`, `max-width: 100%`); band `clamp(board, 168, 372)`. Measure single-line width (join wraps temporarily; re-read after settle). Fits content → 1-line variant, else 2-line. `Length`: `<168px` Short, `>372px` Long, else Medium (cf. About Section1). Never resize height — from `Lines` variant.
- H3 same pattern: board shrink-wraps text (`block`, band `min(100%, 544px)`); `Length`: single-line width `<684px` Short, else Long. Center variant (`Align=Center`) with board width = text width (capped at content width); content flex centers board. Center via `align` (not `textAlign` — phantom, ignored); Center mains already `align=center`, instances inherit it.
- Body centered (`align=center` on text element) unless specified otherwise.
- `h2.center` is Short-only: `Align=Center` only when text fits the 168px band (~134px or narrower); wider stays `Align=Left`, else band misaligns.
- Body inline links use Link Default styling (`#68CCE7`, underline) via `TextRange`, not separate Link instances.

## Assembly

- Instances only: variant choice, resize, text content (text-element height rule: see `penpot-design`).
- Anything else needs a new variant; report and ask a human. Unsupported variant request → error listing valid variants, no guessing.
- `Desktop` / `Mobile`: instances in order; variant selection only.
