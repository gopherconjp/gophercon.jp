import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

import { chromium, type Browser, type Page } from "playwright-core";

import { settleFrame } from "./scroll.ts";
import type { VideoSpec } from "./spec.ts";
import { createTimeline, type FrameDriver } from "./timeline.ts";

export interface Recorder {
  browser: Browser;
  page: Page;
  timeline: FrameDriver;
  shot: () => Promise<void>;
  frameCount: () => number;
}

export interface LaunchOptions {
  executablePath?: string;
  locale?: string;
}

export const launchRecorder = async (
  framesDir: string,
  spec: VideoSpec,
  options: LaunchOptions = {},
): Promise<Recorder> => {
  await mkdir(framesDir, { recursive: true });
  for await (const file of new Bun.Glob("*.png").scan(framesDir)) {
    await rm(path.join(framesDir, file));
  }

  const browser = await chromium.launch({
    executablePath:
      options.executablePath ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    chromiumSandbox: true,
    args: ["--disable-dev-shm-usage", "--disable-gpu", "--hide-scrollbars"],
  });

  let page: Page;
  try {
    const context = await browser.newContext({
      viewport: { width: spec.cssWidth, height: spec.cssHeight },
      deviceScaleFactor: spec.scale,
      // Desktop hover needs non-mobile emulation; mobile emulation suppresses :hover.
      isMobile: false,
      hasTouch: false,
      locale: options.locale ?? "en-US",
    });
    page = await context.newPage();
  } catch (error) {
    await browser.close();
    throw error;
  }

  const timeline = createTimeline(page, spec);

  let seq = 0;
  const shot = async (): Promise<void> => {
    await settleFrame(page);
    await page.screenshot({ path: path.join(framesDir, `${String(seq).padStart(4, "0")}.png`) });
    seq += 1;
  };

  return { browser, page, timeline, shot, frameCount: () => seq };
};
