import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-home-section2" as const;

const content = {
  key,
  content: {
    title: t<Breakable>({
      en: ["What is", "GopherCon Japan?"],
      ja: "GopherCon Japanとは？",
    }),
    body: t<Breakable>({
      en: [
        "GopherCon Japan is a bilingual Go conference in Japan (English & Japanese).",
        ["Want to learn more? Check out our", { link: "About page →", href: "/2027/about" }],
      ],
      ja: [
        'GopherCon Japanは、日本で行われる、Goの"半"国際カンファレンスです。',
        [
          "より詳しく知りたい方は、",
          { link: "Aboutページ", href: "/ja/2027/about" },
          "をご覧ください。",
        ],
      ],
    }),
  },
} satisfies Dictionary;

export default content;
