import { t, type Dictionary } from "intlayer";

export const key = "not-found" as const;

const content = {
  key,
  content: {
    title: t({
      en: "404 - Page not found",
      ja: "404 - ページが見つかりません",
    }),
    description: t({
      en: "The page you are looking for does not exist.",
      ja: "お探しのページは見つかりませんでした。",
    }),
    heading: t({
      en: "Page not found",
      ja: "ページが見つかりません",
    }),
    body: t({
      en: "Sorry, the page you are looking for does not exist.",
      ja: "お探しのページは見つかりませんでした。",
    }),
  },
} satisfies Dictionary;

export default content;
