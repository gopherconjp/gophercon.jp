---
description: "Penpot page assembly for the shared gopherconjp file (Core Components, 404). Use when editing shared page designs, section spacing, or Desktop/Mobile composition in that file."
---

# Penpot page assembly (shared)

File: `gopherconjp`. Code inherits via sync with no strict constraints.

## Boards

- Per page: `Desktop` / `Mobile` selections plus `Components` board.
- `Components` holds per-section variants (e.g. `404 / Section1`); `Desktop` / `Mobile` compose instances only.
- Variant containers arrange variants in a grid with `60px` gaps.

## Sections

- ContentBox-based; full-width `content` frame; `64px` vertical padding; `32px` / `48px` gaps; centered, inner left-aligned except `body` centered.
- Section background is the exception to the no-fill rule: paint `#FFFFFF` when white is specified.
- Body inline links use Link Default styling (`#68CCE7`, underline) via `TextRange`, not separate Link instances.

## Assembly

- Instances only: variant choice, resize, text content (text-element height rule: see `penpot-design`).
- Anything else probably needs a new variant; report and ask a human.
- `Desktop` / `Mobile`: instances in order; variant selection only.
