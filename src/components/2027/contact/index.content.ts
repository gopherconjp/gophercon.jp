import { t, type Dictionary } from "intlayer";

export const key = "2027-contact" as const;

const content = {
  key,
  content: {
    description: t({
      en: "Get in touch with the Organizing Committee",
      ja: "運営へのお問い合わせ・公式SNSはこちら",
    }),
    title: t({
      en: "Contact & Socials",
      ja: "お問い合わせ・SNS",
    }),
  },
} satisfies Dictionary;

export default content;
