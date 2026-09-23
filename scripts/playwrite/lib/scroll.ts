import type { Page } from "playwright-core";

import { advanceClock, type FrameDriver } from "./timeline.ts";

export const maxScrollY = (page: Page): Promise<number> =>
  page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

export const scrollToY = (page: Page, y: number): Promise<void> =>
  page.evaluate((yy: number) => window.scrollTo({ left: 0, top: yy, behavior: "instant" }), y);

export const settleFrame = (page: Page): Promise<void> =>
  page.evaluate(
    () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))),
  );

const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// oxlint-disable no-await-in-loop -- frames must render sequentially
export const hold = async (
  timeline: FrameDriver,
  frames: number,
  onFrame: (index: number) => Promise<void>,
): Promise<void> => {
  for (let i = 0; i < frames; i++) {
    await advanceClock(timeline);
    await onFrame(i);
  }
};

// oxlint-disable no-await-in-loop -- frames must render sequentially
export const smoothScroll = async (
  timeline: FrameDriver,
  maxY: number,
  frames: number,
  onFrame: (index: number) => Promise<void>,
): Promise<void> => {
  for (let i = 0; i < frames; i++) {
    const t = frames === 1 ? 1 : i / (frames - 1);
    await scrollToY(timeline.page, Math.round(easeInOutCubic(t) * maxY));
    await advanceClock(timeline);
    await onFrame(i);
  }
};
