import KeyVisualFrame from "./KeyVisualFrame.astro";

/**
 * The key visual responds to its container width (container queries), so the
 * stories render it inside `KeyVisualFrame`, a thin wrapper that fixes the
 * container width. The `width` control lets you drag through every phase:
 *
 *  - Phase 1 (>= 1350px): the outer frame is locked at 1350x900
 *  - Phase 2 (700px .. 1350px): the width shrinks while the height stays 900
 *    (cloud_l recedes left below 1150px and is fully hidden by 900px)
 *  - Phase 3 (< 700px): the whole composition scales down
 */
export default {
  title: "2027/Home/KeyVisual",
  component: KeyVisualFrame,
  argTypes: {
    width: {
      control: { type: "range", min: 200, max: 2000, step: 10 },
    },
  },
  args: { width: 1350 },
};

/** Parent wider than 1350px; the display width is capped at 1350px. */
export const Width1600 = {
  args: { width: 1600 },
  name: "1600px — Phase 1: fixed",
};

/** Outer frame locked at 1350x900. */
export const Width1350 = {
  args: { width: 1350 },
  name: "1350px — Phase 1: fixed",
};

/** Width shrink, middle of the range. */
export const Width1100 = {
  args: { width: 1100 },
  name: "1100px — Phase 2: width shrink",
};

/** cloud_l partially receded (its recession runs from 1150px down to 900px). */
export const Width1000 = {
  args: { width: 1000 },
  name: "1000px — Phase 2: cloud_l recede",
};

/** cloud_l fully hidden at the --kv-cloud-l-hide boundary. */
export const Width900 = {
  args: { width: 900 },
  name: "900px — Phase 2: cloud_l fully hidden",
};

/** End of the width-shrink range (each layer at its target position). */
export const Width700 = {
  args: { width: 700 },
  name: "700px — Phase 2: limit",
};

/** The whole composition scales down. */
export const Width500 = {
  args: { width: 500 },
  name: "500px — Phase 3: scale down",
};

/** The whole composition scales down (further). */
export const Width350 = {
  args: { width: 350 },
  name: "350px — Phase 3: scale down",
};
