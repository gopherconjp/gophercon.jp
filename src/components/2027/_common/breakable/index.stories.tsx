import { Locales } from "intlayer";

import Breakable from "./index.astro";

export default {
  title: "2027/Common/Breakable",
  component: Breakable,
  argTypes: {
    locale: {
      control: "inline-radio",
      options: [Locales.ENGLISH, Locales.JAPANESE],
    },
  },
  args: { locale: Locales.ENGLISH },
};

export const Shallow = {
  args: {
    locale: Locales.ENGLISH,
    value: ["Let the world's passion", "reach Japan."],
  },
};

export const Nested = {
  args: {
    locale: Locales.ENGLISH,
    value: [
      ["Let the world's", "passion"],
      ["reach", "Japan."],
    ],
  },
};

export const Japanese = {
  args: {
    locale: Locales.JAPANESE,
    value: ["世界の情熱を", "日本へ。"],
  },
};
