import { Locales } from "intlayer";

import Header from "./index.astro";

export default {
  title: "2027/Common/Header",
  component: Header,
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
