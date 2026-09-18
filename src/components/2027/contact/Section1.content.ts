import { t, type Dictionary } from "intlayer";

export const key = "2027-contact-section1" as const;

const content = {
  key,
  content: {
    title: t({
      en: "Socials",
      ja: "SNS",
    }),
  },
} satisfies Dictionary;

export default content;
