import PageBanner from "./index.astro";

export default {
  title: "2027/Common/PageBanner",
  component: PageBanner,
};

export const About = {
  args: {
    titleJa: "GopherCon Japanとは",
    titleEn: "About",
  },
};

export const Contact = {
  args: {
    titleJa: "お問い合わせ・SNS",
    titleEn: "Contact / Socials",
  },
};

export const Overflow = {
  args: {
    titleJa: "GopherCon Japanとは",
    titleEn: "AboutAboutAboutAboutAboutAboutAboutAboutAboutAboutAboutAbout",
  },
};
