import { t, type Dictionary } from "intlayer";

export const key = "2027-contact-section2" as const;

const content = {
  key,
  content: {
    title: t({
      en: "Contact the Organizing Committee",
      ja: "運営へのお問い合わせ",
    }),
    contacts: t({
      en: [
        {
          email: "info@gophercon.jp",
          label: "General",
          description: "General inquiries about GopherCon Japan",
        },
        {
          email: "program@gophercon.jp",
          label: "Program Team",
          description: "Inquiries about sessions, workshops, and other program matters",
        },
        {
          email: "sponsor@gophercon.jp",
          label: "Sponsor Team",
          description: "Inquiries about sponsorships",
        },
        {
          email: "press@gophercon.jp",
          label: "Press Team",
          description: "Inquiries about interviews, coverage, and press matters",
        },
      ],
      ja: [
        {
          email: "info@gophercon.jp",
          label: "総合窓口",
          description: "GopherCon Japan 全般に関するお問い合わせ",
        },
        {
          email: "program@gophercon.jp",
          label: "プログラム担当",
          description: "セッション・ワークショップなど、プログラムに関するお問い合わせ",
        },
        {
          email: "sponsor@gophercon.jp",
          label: "スポンサー担当",
          description: "スポンサーシップや協賛に関するお問い合わせ",
        },
        {
          email: "press@gophercon.jp",
          label: "広報担当",
          description: "取材・掲載など、広報に関するお問い合わせ",
        },
      ],
    }),
  },
} satisfies Dictionary;

export default content;
