import { t, type Dictionary } from "intlayer";

export const key = "2027-home-hero" as const;

const content = {
  key,
  content: {
    badge: t({
      en: "GopherCon Japan 2027",
      ja: "GopherCon Japan 2027",
    }),
    title: t({
      en: "Let the world's passion reach Japan.",
      ja: "世界の情熱を日本へ。",
    }),
    subtitle: t({
      en: "Let Japan's untapped wisdom travel to the world.",
      ja: "日本の未発見の叡智を世界へ。",
    }),
    description: t({
      en: "GopherCon Japan offers a space where Gophers from around the world connect and enjoy without barriers.",
      ja: "GopherCon Japan は、世界中の Gopher が垣根なくつながり、楽しめる場所を提供します。",
    }),
  },
} satisfies Dictionary;

export default content;
