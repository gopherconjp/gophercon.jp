import { t, type Dictionary } from "intlayer";

export const key = "2027-contact" as const;

const content = {
  key,
  content: {
    description: t({
      en: "Get in touch with the GopherCon Japan team",
      ja: "GopherCon Japanへのお問い合わせはこちら。SNS・メール窓口の一覧を掲載しています。",
    }),
    title: t({
      en: "Contact & Socials",
      ja: "お問い合わせ・SNS",
    }),
  },
} satisfies Dictionary;

export default content;
