import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-about-section1" as const;

const content = {
  key,
  content: {
    title: t<Breakable>({
      en: ["What is", ["GopherCon", "Japan?"]],
      ja: ["GopherCon Japan", "とは？"],
    }),
    body: t<Breakable>({
      en: [
        [
          "GopherCon Japan is",
          [["a bilingual Go conference", "in Japan"], "(English & Japanese)."],
        ],
        { break: true },
        { break: true },
        [
          [
            ['By "bilingual,"', "we mean that,", "except during Keynotes,"],
            ["there will always be", "at least two tracks:"],
          ],
          ["one fully in Japanese", "and one fully in English."],
        ],
        { break: true },
        [
          [
            ["This allows both Japanese", "and international attendees"],
            "to enjoy the conference equally,",
          ],
          ["at the same time,", "in the same venue."],
        ],
      ],
      ja: [
        [
          ["GopherCon Japanは、", "日本で行われる、"],
          ['Goの"半"国際', "カンファレンスです。"],
        ],
        { break: true },
        { break: true },
        [
          ["GopherCon Japanは、", "(Keynoteを除き)"],
          ["常に日本語のみのトラックと", "英語のみのトラックを用意し、"],
          "並行してトークを行います。",
        ],
        { break: true },
        [
          ["これにより、", "日本から参加する方も", "海外から参加する方も、"],
          "同じ時間・同じ会場で、",
          ["カンファレンスを", "楽しめる環境を", "目指しています。"],
        ],
      ],
    }),
  },
} satisfies Dictionary;

export default content;
