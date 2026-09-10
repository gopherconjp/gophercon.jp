import Hero from "./Hero.astro";

export default {
  title: "2027/Home/Hero",
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
