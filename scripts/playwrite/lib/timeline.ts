import type { Page } from "playwright-core";

import type { VideoSpec } from "./spec.ts";
import { frameMs } from "./spec.ts";

export interface FrameDriver {
  page: Page;
  spec: VideoSpec;
}

export const createTimeline = (page: Page, spec: VideoSpec): FrameDriver => ({ page, spec });

export const advanceClock = (timeline: FrameDriver, frames = 1): Promise<void> =>
  timeline.page.evaluate(
    (stepMs: number) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- untyped page global
      const store = globalThis as unknown as Record<string, unknown>;
      if (!(store.playwriteClock instanceof WeakMap)) {
        store.playwriteClock = new WeakMap<Animation, number>();
      }
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- just narrowed above
      const elapsedMap = store.playwriteClock as WeakMap<Animation, number>;

      for (const animation of document.getAnimations()) {
        try {
          if (animation.playState !== "paused") {
            animation.pause();
          }

          const prev = elapsedMap.get(animation);
          if (prev === undefined) {
            animation.currentTime = 0;
            elapsedMap.set(animation, 0);
          } else {
            const next = prev + stepMs;
            animation.currentTime = next;
            elapsedMap.set(animation, next);
          }
        } catch {
          // Ignore non-seekable animations (e.g. finished transitions).
        }
      }

      void document.body?.offsetHeight;
    },
    frames * frameMs(timeline.spec),
  );

export const resetClock = (timeline: FrameDriver): Promise<void> =>
  timeline.page.evaluate(() => {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- untyped page global
    (globalThis as unknown as Record<string, unknown>).playwriteClock = new WeakMap<
      Animation,
      number
    >();

    for (const animation of document.getAnimations()) {
      try {
        if (animation.playState !== "paused") {
          animation.pause();
        }
        animation.currentTime = 0;
      } catch {
        // Ignore non-seekable animations (e.g. finished transitions).
      }
    }

    void document.body?.offsetHeight;
  });
