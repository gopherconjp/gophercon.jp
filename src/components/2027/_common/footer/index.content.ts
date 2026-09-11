import { t, type Dictionary } from "intlayer";

export const key = "2027-footer" as const;

const content = {
  key,
  content: {
    backToTop: t({
      en: "↑Back to Top",
      ja: "↑上へ戻る",
    }),
    copyright: t({
      en: "© 2026-2027 GopherCon Japan Organizing Committee",
      ja: "© 2026-2027 GopherCon Japan 運営委員会",
    }),
    credit: t({
      en: "The Go gopher was designed by Renée French.",
      ja: "The Go gopher was designed by Renée French.",
    }),
    logoAlt: t({
      en: "GopherCon Japan 2027 logo",
      ja: "GopherCon Japan 2027 logo",
    }),
  },
} satisfies Dictionary;

export default content;
