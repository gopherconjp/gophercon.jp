import { t, type Dictionary } from "intlayer";

export const key = "2027-home" as const;

const content = {
  key,
  content: {
    description: t({
      en: "GopherCon Japan Official Website",
      ja: "GopherCon Japan 公式ウェブサイト",
    }),
  },
} satisfies Dictionary;

export default content;
