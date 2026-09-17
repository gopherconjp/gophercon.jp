import { t, type Dictionary } from "intlayer";

export const key = "2027-contact" as const;

const content = {
  key,
  content: {
    description: t({
      en: "Contact GopherCon Japan",
      ja: "GopherCon Japanへのお問い合わせ",
    }),
    title: t({
      en: "Contact",
      ja: "GopherCon Japanについて",
    }),
  },
} satisfies Dictionary;

export default content;
