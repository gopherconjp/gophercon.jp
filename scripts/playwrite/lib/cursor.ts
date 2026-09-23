import type { Page } from "playwright-core";

import { advanceClock, type FrameDriver } from "./timeline.ts";

export interface Point {
  x: number;
  y: number;
}

export interface ClickDirection {
  moveSeconds: number;
  pressFrame: number;
  releaseFrame: number;
}

const CURSOR_ID = "playwrite-cursor";
const RIPPLE_ID = "playwrite-ripple";

const ensureOverlays = (page: Page): Promise<void> =>
  page.evaluate(
    (ids: { cursor: string; ripple: string }) => {
      document.getElementById(ids.cursor)?.remove();

      const cursor = document.createElement("div");
      cursor.id = ids.cursor;
      cursor.style.cssText = [
        "position:fixed",
        "z-index:9999",
        "left:0",
        "top:0",
        "width:0",
        "height:0",
        "pointer-events:none",
        "opacity:0",
        "filter:drop-shadow(0 2px 2px rgba(0,0,0,0.35))",
      ].join(";");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "36");
      svg.setAttribute("height", "54");
      svg.setAttribute("viewBox", "0 0 24 36");
      svg.innerHTML =
        '<path d="M5 3 L5 27 L11 21.5 L14 28 L17.5 26.4 L14.6 20 L20 20 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/>';
      cursor.appendChild(svg);
      document.body.appendChild(cursor);

      document.getElementById(ids.ripple)?.remove();

      const ripple = document.createElement("div");
      ripple.id = ids.ripple;
      ripple.style.cssText = [
        "position:fixed",
        "z-index:9998",
        "left:0",
        "top:0",
        "width:72px",
        "height:72px",
        "margin:-36px 0 0 -36px",
        "border-radius:50%",
        "pointer-events:none",
        "border:5px solid #FF7A65",
        "opacity:0",
      ].join(";");
      document.body.appendChild(ripple);
    },
    { cursor: CURSOR_ID, ripple: RIPPLE_ID },
  );

const placeCursor = (page: Page, at: Point, pressed: boolean): Promise<void> =>
  page.evaluate(
    (args: { at: Point; pressed: boolean }) => {
      const cursor = document.getElementById("playwrite-cursor");
      if (cursor) {
        cursor.style.opacity = "1";
        cursor.style.transform = `translate(${args.at.x}px,${args.at.y}px) scale(${args.pressed ? 0.86 : 1})`;
      }

      const ripple = document.getElementById("playwrite-ripple");
      if (ripple) {
        ripple.style.opacity = "0";
      }
    },
    { at, pressed },
  );

const fireRipple = (page: Page, at: Point, progress: number): Promise<void> =>
  page.evaluate(
    (args: { at: Point; progress: number }) => {
      const ripple = document.getElementById("playwrite-ripple");
      if (ripple) {
        ripple.style.opacity = args.progress > 0 ? `${1 - args.progress}` : "0";
        ripple.style.transform = `translate(${args.at.x}px,${args.at.y}px) scale(${1 + args.progress * 1.6})`;
      }
    },
    { at, progress },
  );

// oxlint-disable no-await-in-loop -- frames must render sequentially
export const runClick = async (
  timeline: FrameDriver,
  from: Point,
  to: Point,
  direction: ClickDirection,
  onFrame: () => Promise<void>,
): Promise<void> => {
  const { page, spec } = timeline;
  const moveFrames = Math.round(direction.moveSeconds * spec.fps);
  const total =
    direction.pressFrame + Math.max(1, direction.releaseFrame - direction.pressFrame + 9);

  await ensureOverlays(page);

  for (let k = 0; k < total; k++) {
    const p = Math.min(1, k / Math.max(1, moveFrames));
    const eased = 1 - (1 - p) ** 3;
    const at = { x: from.x + (to.x - from.x) * eased, y: from.y + (to.y - from.y) * eased };
    const pressed = k >= direction.pressFrame && k <= direction.releaseFrame;
    const rippleP =
      k < direction.pressFrame
        ? 0
        : Math.min(1, (k - direction.pressFrame) / Math.max(1, total - 1 - direction.pressFrame));

    await placeCursor(page, at, pressed);
    await page.mouse.move(at.x, at.y);

    if (pressed) {
      await fireRipple(page, at, rippleP);
    }

    await advanceClock(timeline);

    await onFrame();
  }
};

export const findLinkCenter = async (page: Page, text: string): Promise<Point | null> => {
  const box = await page
    .locator(`a:has-text('${text}')`)
    .first()
    .boundingBox()
    .catch(() => null);
  if (!box) {
    return null;
  }

  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};
