import { t, type Dictionary } from "intlayer";

export const key = "not-found" as const;

const content = {
  key,
  content: {
    title: t({
      en: "404",
      ja: "404",
    }),
    description: t({
      en: "404 - Page not found",
      ja: "404 - ページが見つかりません",
    }),
    heading: t({
      en: "404",
      ja: "404",
    }),
    body: t({
      en: "The page you are looking for does not exist.",
      ja: "お探しのページは見つかりませんでした。",
    }),
    linkLabel: t({
      en: "Go back to the previous page",
      ja: "前のページに戻る",
    }),
    imageAlt: t({
      en: "Surprised Gopher illustration",
      ja: "驚いたGopherのイラスト",
    }),
  },
} satisfies Dictionary;

export default content;
