import { t, type Dictionary } from "intlayer";

export const key = "2027-cfp-section1" as const;

const content = {
  key,
  content: {
    bannerAlt: t({
      en: "The smart way to do Call for Papers, Schedule and Speaker Management.",
      ja: "The smart way to do Call for Papers, Schedule and Speaker Management.",
    }),
    body: t({
      en: [
        "GopherCon Japan 2027 is accepting proposals through Sessionize.",
        "The deadline is October 25, 2026 at 23:59 JST. Don't miss it!",
      ],
      ja: [
        "GopherCon Japan 2027では、Sessionizeを通してプロポーザルを募集します。",
        "締切は 2026年10月25日 23:59 (日本時間) です。お忘れなきようお申し込みください。",
      ],
    }),
    buttonLabel: t({
      en: "Submit here",
      ja: "ご応募はこちら",
    }),
  },
} satisfies Dictionary;

export default content;
