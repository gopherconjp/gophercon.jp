import Hero from "./Hero.astro";

export default {
  title: "Components/Hero",
  component: Hero,
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en", "ja"],
    },
  },
};

export const English = {
  args: { locale: "en" },
};

export const Japanese = {
  args: { locale: "ja" },
};
