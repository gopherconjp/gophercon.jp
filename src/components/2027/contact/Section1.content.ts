import { t, type Dictionary } from "intlayer";

export const key = "2027-contact-section1" as const;

const content = {
  key,
  content: {
    title: t({
      en: "Follow us on Socials!",
      ja: "SNSで最新情報をチェック！",
    }),
  },
} satisfies Dictionary;

export default content;
