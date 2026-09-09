import ContentBoxFrame from "./ContentBoxFrame.astro";

/**
 * ContentBox responds to its parent width (container queries), so the
 * stories render it inside `ContentBoxFrame`, a thin wrapper that fixes the
 * parent width. The `width` control lets you drag through every phase:
 *
 *  - Default (`variant: "default"`):
 *    - Phase 1 (>= 1500px): content locked at 1200px
 *    - Phase 2 (400px .. 1500px): linear interpolation between (400, 360)
 *      and (1500, 1200)
 *    - Phase 3 (< 400px): full width minus 20px margins on each side
 *  - Text (`variant: "text"`): same curve capped at 720px, so
 *    - Phase 1 (>= 872px): content locked at 720px
 *    - Phase 2 (400px .. 872px): linear interpolation between (400, 360)
 *      and (872, 720)
 *    - Phase 3 (< 400px): same as default
 */
export default {
  title: "Common/ContentBox",
  component: ContentBoxFrame,
  argTypes: {
    width: {
      control: { type: "range", min: 200, max: 2000, step: 10 },
    },
    variant: {
      control: "inline-radio",
      options: ["default", "text"],
    },
  },
  args: { width: 1200, variant: "default" },
};

/** Parent wider than 1500px; the content width is capped at 1200px. */
export const Width1700 = {
  args: { width: 1700 },
  name: "1700px — Phase 1: fixed",
};

/** Text capped at 720px; default is 1200px here. */
export const Width1700Text = {
  args: { width: 1700, variant: "text" },
  name: "1700px / text — Phase 1: fixed",
};

/** Upper boundary of the interpolation range (80% of parent). */
export const Width1500 = {
  args: { width: 1500 },
  name: "1500px — Phase 1/2 boundary",
};

/** Text capped at 720px; default is 1200px here. */
export const Width1500Text = {
  args: { width: 1500, variant: "text" },
  name: "1500px / text — Phase 1: fixed",
};

/** Middle of the interpolation range. */
export const Width1000 = {
  args: { width: 1000 },
  name: "1000px — Phase 2: interpolation",
};

/** Text capped at 720px; default interpolates to ~818px here. */
export const Width1000Text = {
  args: { width: 1000, variant: "text" },
  name: "1000px / text — Phase 1: fixed",
};

/** Upper boundary of the text interpolation range. */
export const Width872Text = {
  args: { width: 872, variant: "text" },
  name: "872px / text — Phase 1/2 boundary",
};

/** Lower boundary of the interpolation range (90% of parent). */
export const Width400 = {
  args: { width: 400 },
  name: "400px — Phase 2/3 boundary",
};

/** Below the narrow boundary; 20px margins on each side. */
export const Width300 = {
  args: { width: 300 },
  name: "300px — Phase 3: fixed margins",
};
