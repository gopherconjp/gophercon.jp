import { t, type Dictionary } from "intlayer";

export const key = "2027-contact-social-card" as const;

const content = {
  key,
  content: {
    follow: t({
      en: "Follow",
      ja: "フォロー",
    }),
    tagSearch: t({
      en: "# Search",
      ja: "タグ検索",
    }),
    share: t({
      en: "Share",
      ja: "シェア",
    }),
    join: t({
      en: "Join",
      ja: "参加",
    }),
  },
} satisfies Dictionary;

export default content;
