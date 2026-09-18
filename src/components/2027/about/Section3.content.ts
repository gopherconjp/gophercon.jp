import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-about-section3" as const;

const content = {
  key,
  content: {
    title: t<Breakable>({
      en: "Mission Statement",
      ja: "GopherCon Japan スローガン",
    }),
    heading: t<Breakable>({
      en: [
        ["Let the world's passion", "reach Japan."],
        [["Let Japan's", "untapped wisdom"], "travel to the world."],
      ],
      ja: [
        ["世界に宿る", "熱量を日本へ。"],
        ["日本に眠る", "叡智を世界へ。"],
      ],
    }),
    body: t<Breakable>({
      en: [
        ["We bring", "the world's inspiration", "to Japan."],
        { break: true },
        ["We share", "Japan's pride", "with the world."],
        { break: true },
        [
          ["GopherCon Japan", "offers a space"],
          ["where Gophers from", "around the world"],
          ["connect and enjoy", "without barriers."],
        ],
      ],
      ja: [
        ["日本のGopherに", "「これが世界だ」", "という刺激を。"],
        { break: true },
        ["世界のGopherに", "「これが日本だ」", "という誇りを。"],
        { break: true },
        [
          ["GopherCon Japanは、", "世界中の", "あらゆるGopherが"],
          ["分け隔てなく", "繋がり、", "楽しめる空間を", "目指します。"],
        ],
      ],
    }),
  },
} satisfies Dictionary;

export default content;
