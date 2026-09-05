import Popover from "./Popover.astro";

export default {
  title: "Common/Popover",
  component: Popover,
  args: {
    id: "demo",
    label: "Open popover",
  },
};

export const Default = {
  args: {
    slots: {
      trigger: "Trigger",
      content: "Content",
    },
  },
};
