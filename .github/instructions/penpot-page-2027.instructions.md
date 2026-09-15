---
description: "Penpot page assembly for the gopherconjp-2027 file (Common Components, Home, About, Contact). Use when editing 2027 page designs, H2/Link styling, section spacing, or Desktop/Mobile composition in that file."
---

# Penpot page assembly (2027)

File: `gopherconjp-2027` — pages `Common Components`, `Home`, `About`, `Contact`. Code inherits via sync with no strict constraints.

## Boards

- Per page: `Desktop` / `Mobile` selections plus `Components` board.
- `Components` holds per-section variants (e.g. `home / Section1`, `Language` x `Viewport`); `Desktop` / `Mobile` compose instances only (page-banner, sections, header, footer).
- `Language` x `Viewport` containers: 2x2 grid, Desktop row on top (JA left, EN right), Mobile row below; `60px` gaps.

## Sections

- ContentBox-based (`normal` / `text`); full-width `content` frame; `64px` vertical padding; `32px` / `40px` / `48px` gaps; centered, inner left-aligned except `body` centered.
- Section background is the exception to the no-fill rule: paint `#FFFFFF` when white is specified.
- H2 follows code (`src/components/2027/_styles/elements.css`): board shrink-wraps text (`inline-block`, `max-width: 100%`); band is `clamp(board, 168, 372)`. Measure single-line width (join wrapped lines temporarily; re-read after settle). Fits content → 1-line variant, else 2-line. `Length`: `<168px` Short, `>372px` Long, else Medium (cf. About Section1). Never resize height — from `Lines` variant.
- `h2.center` is Short-only: `Align=Center` only when text fits the 168px band (~134px or narrower); wider stays `Align=Left`, else band misaligns.
- Body inline links use Link Default styling (`#68CCE7`, underline) via `TextRange`, not separate Link instances.

## Assembly

- Instances only: variant choice, resize, text content (text-element height rule: see `penpot-design`).
- Anything else probably needs a new variant; report and ask a human.
- `Desktop` / `Mobile`: instances in order; variant selection only.
