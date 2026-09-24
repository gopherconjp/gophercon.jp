import type { Page } from "playwright-core";

import type { VideoSpec } from "./spec.ts";
import { frameMs } from "./spec.ts";

export interface FrameDriver {
  page: Page;
  spec: VideoSpec;
}

export const createTimeline = (page: Page, spec: VideoSpec): FrameDriver => ({ page, spec });

const driveClock = (page: Page, mode: number | "reset" | null): Promise<void> =>
  page.evaluate((step: number | "reset" | null) => {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- untyped page global
    const store = globalThis as unknown as Record<string, unknown>;
    if (step === "reset") {
      store.playwrightClock = new WeakMap<Animation, number>();
      return;
    }
    if (!(store.playwrightClock instanceof WeakMap)) {
      store.playwrightClock = new WeakMap<Animation, number>();
    }
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- just narrowed above
    const elapsed = store.playwrightClock as WeakMap<Animation, number>;

    for (const animation of document.getAnimations()) {
      try {
        if (animation.playState !== "paused") {
          animation.pause();
        }

        const prev = elapsed.get(animation);
        if (prev === undefined) {
          animation.currentTime = 0;
          elapsed.set(animation, 0);
        } else if (typeof step === "number") {
          const next = prev + step;
          animation.currentTime = next;
          elapsed.set(animation, next);
        }
      } catch {
        // Ignore non-seekable animations (e.g. finished transitions).
      }
    }

    void document.body?.offsetHeight;
  }, mode);

// Register animations created since the last frame without advancing time.
export const syncClock = (timeline: FrameDriver): Promise<void> => driveClock(timeline.page, null);

export const advanceClock = (timeline: FrameDriver, frames = 1): Promise<void> =>
  driveClock(timeline.page, frames * frameMs(timeline.spec));

export const resetClock = (timeline: FrameDriver): Promise<void> =>
  driveClock(timeline.page, "reset");
