import { t, type Dictionary } from "intlayer";

export const key = "2027-home-key-visual" as const;

const content = {
  key,
  content: {
    ariaLabel: t({
      en: "GopherCon Japan 2027 key visual",
      ja: "GopherCon Japan 2027 キービジュアル",
    }),
  },
} satisfies Dictionary;

export default content;
