import { t, type Dictionary } from "intlayer";

export const key = "2027-contact-slack-card" as const;

const content = {
  key,
  content: {
    join: t({
      en: "Join",
      ja: "参加",
    }),
  },
} satisfies Dictionary;

export default content;
