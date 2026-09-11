import { t, type Dictionary } from "intlayer";

export const key = "2027-about" as const;

const content = {
  key,
  content: {
    description: t({
      en: "About GopherCon Japan",
      ja: "GopherCon Japanについて",
    }),
    bannerTitleJa: t({
      en: "GopherCon Japanについて",
      ja: "GopherCon Japanについて",
    }),
    bannerTitleEn: t({
      en: "About",
      ja: "About",
    }),
  },
} satisfies Dictionary;

export default content;
