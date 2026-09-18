import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-home-section1" as const;

const content = {
  key,
  content: {
    dateLabel: t({
      en: "Date",
      ja: "日程",
    }),
    dateContent: t<Breakable>({
      en: ["Feb", "13-14"],
      ja: ["2月", ["13日～", "14日"]],
    }),
    dateBody: t<Breakable>({
      en: ["(Sat &", "Sun)"],
      ja: ["(土・", "日)"],
    }),
    venueLabel: t({
      en: "Venue",
      ja: "会場",
    }),
    venueContent: t<Breakable>({
      en: ["Abema", "Towers"],
      ja: "Abema Towers",
    }),
    venueBody: t<Breakable>({
      en: ["(Shibuya,", "Tokyo)"],
      ja: ["(東京都", "渋谷区)"],
    }),
  },
} satisfies Dictionary;

export default content;
