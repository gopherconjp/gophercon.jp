import { t, type Dictionary } from "intlayer";

export const key = "2027-cfp" as const;

const content = {
  key,
  content: {
    description: t({
      en: "Call for Proposals for GopherCon Japan 2027",
      ja: "GopherCon Japan 2027のプロポーザル募集",
    }),
    title: t({
      en: "Call for Proposals",
      ja: "プロポーザル募集",
    }),
  },
} satisfies Dictionary;

export default content;
