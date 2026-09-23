---
name: playwrite
description: "Use when recording a Playwright-based Shorts video (2160x3840 60fps) with scripts/playwrite. Covers virtual-clock animation sync, PC cursor click with real hover, and ffmpeg assembly."
---

# Playwrite video

- One script per video in `scripts/playwrite/<operation>.ts` + shared `lib/`; run with `bun scripts/playwrite/<operation>.ts`.
- Shoot stills at `VideoSpec` CSS px × `spec.scale`, join offline at `spec.fps`; never realtime-record.
- Pin WAAPI time per-animation via `advanceClock` (each starts from its own beginning); never wall-clock waits. JS marquees ignore it — verify at operation width first.
- Move real mouse for `:hover`, ripple press only, then `goto`; never mid-sequence `click`. Needs non-mobile emulation.
