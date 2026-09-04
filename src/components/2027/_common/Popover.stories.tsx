import Popover from "./Popover.astro";

export default {
  title: "2027/Common/Popover",
  component: Popover,
  args: {
    id: "demo",
    label: "Open popover",
    role: "menu",
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
