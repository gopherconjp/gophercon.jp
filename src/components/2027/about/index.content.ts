import { t, type Dictionary } from "intlayer";

export const key = "2027-about" as const;

const content = {
  key,
  content: {
    description: t({
      en: "About GopherCon Japan",
      ja: "GopherCon Japanについて",
    }),
    title: t({
      en: "About",
      ja: "GopherCon Japanについて",
    }),
  },
} satisfies Dictionary;

export default content;
