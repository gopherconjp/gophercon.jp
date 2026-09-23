import type { Response } from "playwright-core";

import { runMain } from "../lib/cli.ts";
import { findLinkCenter, runClick } from "./lib/cursor.ts";
import { encodeFrames, resolveOperationDirs } from "./lib/encode.ts";
import { launchRecorder } from "./lib/recorder.ts";
import { hold, maxScrollY, scrollToY, smoothScroll } from "./lib/scroll.ts";
import { secondsToFrames, shorts4k60 } from "./lib/spec.ts";
import { resetClock } from "./lib/timeline.ts";

const OPERATION = "2027-cfp-commercial";
const HOME_URL = "https://gophercon.jp/2027/";
const CFP_URL = "https://gophercon.jp/2027/cfp";

const assertOk = (response: Response | null, url: string): void => {
  if (!response || !response.ok()) {
    throw new Error(`Failed to load ${url}: HTTP ${response?.status() ?? "no response"}`);
  }
};

const main = async (): Promise<void> => {
  const spec = shorts4k60;
  const { framesDir, out } = resolveOperationDirs(OPERATION, spec);
  const { browser, page, timeline, shot, frameCount } = await launchRecorder(framesDir, spec);

  try {
    assertOk(await page.goto(HOME_URL, { waitUntil: "networkidle" }), HOME_URL);
    await scrollToY(page, 0);
    await resetClock(timeline);

    await hold(timeline, secondsToFrames(spec, 3), shot);

    const homeMax = await maxScrollY(page);
    await smoothScroll(timeline, homeMax, secondsToFrames(spec, 5), shot);

    await hold(timeline, secondsToFrames(spec, 1), shot);

    const target = await findLinkCenter(page, "CFP Page");
    if (!target) {
      throw new Error('Link "CFP Page" not found');
    }
    await runClick(
      timeline,
      { x: 520, y: 940 },
      target,
      { moveSeconds: 0.5, pressFrame: 60, releaseFrame: 66 },
      shot,
    );

    assertOk(await page.goto(CFP_URL, { waitUntil: "networkidle" }), CFP_URL);
    await scrollToY(page, 0);
    await resetClock(timeline);

    await hold(timeline, secondsToFrames(spec, 2), shot);

    const cfpMax = await maxScrollY(page);
    await smoothScroll(timeline, cfpMax, secondsToFrames(spec, 5), shot);
  } finally {
    await browser.close();
  }
  console.log(`shot total=${frameCount()} in ${framesDir}`);

  await encodeFrames(framesDir, out, spec);
};

runMain(main, "playwrite");
