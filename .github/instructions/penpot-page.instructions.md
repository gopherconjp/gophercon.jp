---
description: "Use when editing Penpot page designs (boards, variants, instances, layout). Covers board layout, section spacing, instance-only assembly, and Desktop/Mobile composition. Excludes the Core Components page."
applyTo: "design/**"
---

# Penpot page assembly

- Penpot-only except `Core Components`; code inherits via sync with no strict constraints.

## Boards

- Per page: `Desktop` / `Mobile` selections plus `Components` board.
- `Components` holds per-section variants (e.g. `home / Section1`, `Language` x `Viewport`); `Desktop` / `Mobile` compose instances only (page-banner, sections, header, footer).

## Sections

- ContentBox-based (`normal` / `text`); all elements inside full-width `content` frame.
- `64px` vertical padding; `32px` / `48px` gaps; centered, inner left-aligned except `body` centered.

## Assembly

- Instances only; allowed overrides: variant choice, resize, text content.
- Anything else probably needs a new variant; report and ask a human.
- `Desktop` / `Mobile`: place instances in order; variant selection only.
