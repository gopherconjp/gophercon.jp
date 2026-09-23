import type { Page } from "playwright-core";

import type { VideoSpec } from "./spec.ts";
import { frameMs } from "./spec.ts";

// Pause every CSS/WAAPI animation and pin the virtual clock to t ms.
// Real-time animations would otherwise freeze during holds and race during scrolls.
export const driveClock = (page: Page, ms: number): Promise<void> =>
  page.evaluate((t: number) => {
    for (const animation of document.getAnimations()) {
      try {
        if (animation.playState !== "paused") {
          animation.pause();
        }
        animation.currentTime = t;
      } catch {
        // Ignore non-seekable animations (e.g. finished transitions).
      }
    }

    void document.body?.offsetHeight;
  }, ms);

export interface FrameDriver {
  page: Page;
  spec: VideoSpec;
  clockMs: number;
}

export const createTimeline = (page: Page, spec: VideoSpec): FrameDriver => ({
  page,
  spec,
  clockMs: 0,
});

export const tick = (timeline: FrameDriver, frames = 1): void => {
  timeline.clockMs += frames * frameMs(timeline.spec);
};

export const resetClock = (timeline: FrameDriver): void => {
  timeline.clockMs = 0;
};
