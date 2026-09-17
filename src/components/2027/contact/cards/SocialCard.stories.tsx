import { Locales } from "intlayer";

import { socials } from "../socials";
import SocialCard from "./SocialCard.astro";

const byService = Object.fromEntries(socials.map((social) => [social.service, social]));

export default {
  title: "2027/Contact/SocialCard",
  component: SocialCard,
  argTypes: {
    locale: {
      control: "inline-radio",
      options: [Locales.ENGLISH, Locales.JAPANESE],
    },
  },
  args: { locale: Locales.ENGLISH },
};

export const X = {
  args: { locale: Locales.ENGLISH, social: byService["X"] },
};

export const Bluesky = {
  args: { locale: Locales.ENGLISH, social: byService["Bluesky"] },
};

export const Mastodon = {
  args: { locale: Locales.ENGLISH, social: byService["Mastodon"] },
};

export const Facebook = {
  args: { locale: Locales.ENGLISH, social: byService["Facebook"] },
};

export const Instagram = {
  args: { locale: Locales.ENGLISH, social: byService["Instagram"] },
};

export const LinkedIn = {
  args: { locale: Locales.ENGLISH, social: byService["LinkedIn"] },
};

export const YouTube = {
  args: { locale: Locales.ENGLISH, social: byService["YouTube"] },
};

export const Slack = {
  args: { locale: Locales.ENGLISH, social: byService["Slack"] },
};

export const Japanese = {
  args: { locale: Locales.JAPANESE, social: byService["X"] },
};
