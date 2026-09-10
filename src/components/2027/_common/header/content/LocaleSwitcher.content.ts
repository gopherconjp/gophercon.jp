import { t, type Dictionary } from "intlayer";

export const key = "2027-header-locale-switcher" as const;

const content = {
  key,
  content: {
    ariaLabel: t({
      en: "Change language",
      ja: "言語を切り替える",
    }),
    switchTo: t({
      en: "日本語に切り替える",
      ja: "Switch to English",
    }),
  },
} satisfies Dictionary;

export default content;
