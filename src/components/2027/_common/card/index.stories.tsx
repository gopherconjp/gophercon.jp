import Card from "./index.astro";

export default {
  title: "2027/Common/Card",
  component: Card,
  args: {},
};

export const Default = {
  args: {
    label: "Date",
    content: "Feb 13-14",
  },
};

export const WithBody = {
  args: {
    label: "Date",
    content: "Feb 13-14",
    body: "Saturday & Sunday",
  },
};

export const Dark = {
  args: {
    label: "Date",
    content: "Feb 13-14",
    dark: true,
  },
};

export const DarkWithBody = {
  args: {
    label: "Date",
    content: "Feb 13-14",
    body: "Saturday & Sunday",
    dark: true,
  },
};
