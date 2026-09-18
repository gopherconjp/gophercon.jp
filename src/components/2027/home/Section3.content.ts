import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-home-section3" as const;

const content = {
  key,
  content: {
    title: t<Breakable>({
      en: "We want your proposals!",
      ja: "プロポーザル大募集！",
    }),
    body: t<Breakable>({
      en: [
        "We're calling for proposals!",
        [
          "Want to be part GopherCon Japan? Check out our",
          { link: "CFP Page →", href: "/2027/cfp" },
        ],
      ],
      ja: [
        "GopherCon Japanでは、カンファレンスを盛り上げてくれるプロポーザルを募集しています。",
        [["詳しくは", { link: "CFPページ", href: "/ja/2027/cfp" }, "を"], "ご覧ください。"],
      ],
    }),
  },
} satisfies Dictionary;

export default content;
