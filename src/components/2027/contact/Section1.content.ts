import { t, type Dictionary } from "intlayer";

import type { Breakable } from "../../_common/breakable/types";

export const key = "2027-contact-section1" as const;

const content = {
  key,
  content: {
    title: t<Breakable>({
      en: ["Follow us", "on Socials!"],
      ja: ["SNSで", ["最新情報を", "チェック！"]],
    }),
  },
} satisfies Dictionary;

export default content;
