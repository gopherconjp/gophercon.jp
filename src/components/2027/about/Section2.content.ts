import { t, type Dictionary } from "intlayer";

export const key = "2027-about-section2" as const;

const content = {
  key,
  content: {
    dateLabel: t({
      en: "Date",
      ja: "日程",
    }),
    dateContent: t({
      en: "Feb 13-14",
      ja: "2月13日・14日",
    }),
    dateBody: t({
      en: "(Sat & Sun)",
      ja: "(土、日)",
    }),
    venueLabel: t({
      en: "Venue",
      ja: "会場",
    }),
    venueContent: t({
      en: "Abema Towers",
      ja: "Abema Towers",
    }),
    venueBody: t({
      en: "(Shibuya, Tokyo)",
      ja: "(東京都渋谷区)",
    }),
    mapTitle: t({
      en: "GopherCon Japan 2027 venue map",
      ja: "GopherCon Japan 2027 会場マップ",
    }),
  },
} satisfies Dictionary;

export default content;
