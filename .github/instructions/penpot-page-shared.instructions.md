---
description: "Penpot page assembly for the shared gopherconjp file (Core Components, 404). Use when editing shared page designs, section spacing, or Desktop/Mobile composition in that file."
---

# Penpot page assembly (shared)

File: `gopherconjp`. Code inherits via sync with no strict constraints.

## Boards

- Per page: `Desktop` / `Mobile` selections plus `Components` board.
- `Components` holds per-section variant containers (e.g. `404 / Section1`); sections are variant components, not plain boards. `Desktop` / `Mobile` compose instances only.
- Variant containers arrange variants in a grid with `60px` gaps.

## Sections

- Section layout checklist:
  1. ContentBox-based, full-width `content` frame, `64px` vertical padding.
  2. Gaps `32px` / `48px`.
  3. Outer frame centered; inner content left-aligned except `body` centered.
- Exception to no-fill rule: white sections paint `#FFFFFF`; `content` frames never take fills (clear `createBoard` white default).
- Body centered (`align=center` on text element) unless specified otherwise.
- Body inline links use Link Default styling (`#68CCE7`, underline) via `TextRange`, not separate Link instances.

## Assembly

- Instances only: variant choice, resize, text content (text-element height rule: see `penpot-design`).
- Anything else needs a new variant; report and ask a human. Unsupported variant request → error listing valid variants, no guessing.
- `Desktop` / `Mobile`: instances in order; variant selection only.
