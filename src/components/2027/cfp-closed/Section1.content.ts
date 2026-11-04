import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-cfp-closed-section1" as const;

const content = {
  key,
  content: {
    title: t<Breakable>({
      en: [["Call for", "Proposals"], "is closed"],
      ja: [["プロポーザル", "募集は"], "終了しました"],
    }),
    body: t<Breakable>({
      en: [
        ["Thank you", ["for your", "submissions."]],
        { break: true },
        [
          ["Selection results", ["are scheduled", "to be published"]],
          ["at the end", "of November."],
        ],
      ],
      ja: [
        [
          ["たくさんの", "ご応募、"],
          ["誠に", "ありがとう", "ございました。"],
        ],
        { break: true },
        ["採択結果は", "11月末に", "公開予定です。"],
      ],
    }),
  },
} satisfies Dictionary;

export default content;
