import { t, type Dictionary } from "intlayer";

export const key = "2027-home" as const;

const content = {
  key,
  content: {
    description: t({
      en: "GopherCon Japan Official Website",
      ja: "GopherCon Japan 公式ウェブサイト",
    }),
    missionTitle: t({
      en: "Our Mission",
      ja: "私たちのミッション",
    }),
    mission: t({
      en: "Let the world's passion reach Japan. Let Japan's untapped wisdom travel to the world.",
      ja: "世界の情熱を日本へ。日本の未発見の叡智を世界へ。",
    }),
  },
} satisfies Dictionary;

export default content;
