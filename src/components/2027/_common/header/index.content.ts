import { t, type Dictionary } from "intlayer";

export const key = "2027-header" as const;

const content = {
  key,
  content: {
    navLabel: t({
      en: "Main navigation",
      ja: "メインナビゲーション",
    }),
    menuLabel: t({
      en: "Open menu",
      ja: "メニューを開く",
    }),
  },
} satisfies Dictionary;

export default content;
