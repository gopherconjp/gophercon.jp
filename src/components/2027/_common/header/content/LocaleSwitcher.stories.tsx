import { Locales } from "intlayer";

import LocaleSwitcher from "./LocaleSwitcher.astro";

export default {
  title: "2027/Common/Header/LocaleSwitcher",
  component: LocaleSwitcher,
  argTypes: {
    locale: {
      control: "inline-radio",
      options: [Locales.ENGLISH, Locales.JAPANESE],
    },
  },
  args: { locale: Locales.ENGLISH },
};

export const English = {
  args: { locale: Locales.ENGLISH },
};

export const Japanese = {
  args: { locale: Locales.JAPANESE },
};
