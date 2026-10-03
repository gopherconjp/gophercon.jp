---
name: playwright
description: "Use when recording a Playwright-based Shorts video with scripts/playwright. Covers virtual-clock animation sync, PC cursor click with real hover, and ffmpeg assembly."
---

# Playwright video

- One script per video in `scripts/playwright/<operation>.ts` + shared `lib/`; run with `bun scripts/playwright/<operation>.ts`.
- Shoot stills at `VideoSpec` CSS px × `spec.scale`, join offline at `spec.fps`; never realtime-record.
- Pin WAAPI time per-animation via `advanceClock` (each starts from its own beginning); register newcomers via `syncClock` before each shot; never wall-clock waits. JS marquees ignore it — verify at operation width first.
- Move real mouse for `:hover`, ripple press only, then `goto`; never mid-sequence `click`. Needs non-mobile emulation.
