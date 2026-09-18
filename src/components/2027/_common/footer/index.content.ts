import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../../_common/breakable/types";

export const key = "2027-footer" as const;

const content = {
  key,
  content: {
    backToTop: t({
      en: "↑Back to Top",
      ja: "↑上へ戻る",
    }),
    copyright: t<Breakable>({
      en: ["© 2026-2027", ["GopherCon Japan", "Organizing Committee"]],
      ja: "© 2026-2027 GopherCon Japan 運営委員会",
    }),
    credit: t<Breakable>({
      en: [["The Go gopher", "was designed"], "by Renée French."],
      ja: "The Go gopher was designed by Renée French.",
    }),
    logoAlt: t({
      en: "GopherCon Japan 2027 logo",
      ja: "GopherCon Japan 2027 logo",
    }),
  },
} satisfies Dictionary;

export default content;
