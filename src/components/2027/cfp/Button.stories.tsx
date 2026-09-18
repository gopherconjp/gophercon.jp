import Button from "./Button.astro";

export default {
  title: "2027/CFP/Button",
  component: Button,
  args: {
    label: "ご応募はこちら",
    href: "https://sessionize.com/gopherconjp-2027/",
  },
};

export const Japanese = {};

export const English = {
  args: {
    label: "Submit here",
    href: "https://sessionize.com/gopherconjp-2027/",
  },
};
