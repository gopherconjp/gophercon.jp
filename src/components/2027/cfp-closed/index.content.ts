import { t, type Dictionary } from "intlayer";

export const key = "2027-cfp-closed" as const;

const content = {
  key,
  content: {
    description: t({
      en: "The Call for Proposals for GopherCon Japan 2027 has closed. Thank you for your submissions.",
      ja: "GopherCon Japan 2027のプロポーザル募集は終了しました。たくさんのご応募、誠にありがとうございました。",
    }),
    title: t({
      en: "Call for Proposals",
      ja: "プロポーザル募集",
    }),
  },
} satisfies Dictionary;

export default content;
