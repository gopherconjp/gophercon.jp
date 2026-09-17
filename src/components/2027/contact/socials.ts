import { getLocalizedUrl, type LocalesValues } from "intlayer";

export interface SocialItem {
  service: string;
  name: string;
  handle: string;
  href: string;
  logo: string;
  logoHover: string;
  logoAlt: string;
  followHref?: string;
  searchHref?: string;
  shareHref?: (locale: LocalesValues) => string;
  joinHref?: string;
}

const getLocalizedSiteUrl = (locale: LocalesValues): string =>
  new URL(
    getLocalizedUrl("/2027", locale),
    import.meta.env.SITE ?? "https://gophercon.jp",
  ).toString();

export const socials: SocialItem[] = [
  {
    service: "X",
    name: "X",
    handle: "@GopherConJP",
    href: "https://x.com/GopherConJP",
    logo: "/social/x.svg",
    logoHover: "/social/x.svg",
    logoAlt: "X logo",
    followHref: "https://x.com/intent/follow?screen_name=GopherConJP",
    searchHref: "https://x.com/search?q=%23GopherConJP",
    shareHref: (locale) => {
      const siteUrl = getLocalizedSiteUrl(locale);
      return `https://x.com/intent/post?text=${encodeURIComponent("#GopherConJP\n")}&url=${encodeURIComponent(siteUrl)}`;
    },
  },
  {
    service: "Bluesky",
    name: "Bluesky",
    handle: "gophercon.jp",
    href: "https://bsky.app/profile/gophercon.jp",
    logo: "/social/bluesky-black.svg",
    logoHover: "/social/bluesky.svg",
    logoAlt: "Bluesky logo",
    followHref: "https://bsky.app/profile/gophercon.jp",
    searchHref: "https://bsky.app/search?q=%23GopherConJP",
    shareHref: (locale) => {
      const siteUrl = getLocalizedSiteUrl(locale);
      return `https://bsky.app/intent/compose?text=${encodeURIComponent(`#GopherConJP\n${siteUrl}`)}`;
    },
  },
  {
    service: "Mastodon",
    name: "Mastodon",
    handle: "@gopherconjp",
    href: "https://mastodon.social/@gopherconjp",
    logo: "/social/mastodon-black.svg",
    logoHover: "/social/mastodon.svg",
    logoAlt: "Mastodon logo",
    followHref:
      "https://mastodon.social/authorize_interaction?uri=https%3A%2F%2Fmastodon.social%2F%40gopherconjp",
    searchHref: "https://mastodon.social/tags/GopherConJP",
    shareHref: (locale) => {
      const siteUrl = getLocalizedSiteUrl(locale);
      return `https://mastodonshare.com/?text=${encodeURIComponent(`#GopherConJP\n${siteUrl}`)}`;
    },
  },
  {
    service: "Facebook",
    name: "Facebook",
    handle: "GopherConJP",
    href: "https://www.facebook.com/GopherConJP",
    logo: "/social/facebook.webp",
    logoHover: "/social/facebook.webp",
    logoAlt: "Facebook logo",
    followHref: "https://www.facebook.com/GopherConJP",
    searchHref: "https://www.facebook.com/hashtag/GopherConJP",
  },
  {
    service: "Instagram",
    name: "Instagram",
    handle: "gopherconjp",
    href: "https://www.instagram.com/gopherconjp",
    logo: "/social/instagram-black.svg",
    logoHover: "/social/instagram.webp",
    logoAlt: "Instagram logo",
    followHref: "https://www.instagram.com/gopherconjp",
    searchHref: "https://www.instagram.com/explore/tags/gopherconjp/",
  },
  {
    service: "LinkedIn",
    name: "LinkedIn",
    handle: "gopherconjp",
    href: "https://www.linkedin.com/company/gopherconjp",
    logo: "/social/linkedin-black.webp",
    logoHover: "/social/linkedin.webp",
    logoAlt: "LinkedIn logo",
    followHref: "https://www.linkedin.com/company/gopherconjp",
    searchHref: "https://www.linkedin.com/search/results/content/?keywords=%23GopherConJP",
  },
  {
    service: "YouTube",
    name: "YouTube",
    handle: "@GopherConJP",
    href: "https://www.youtube.com/@GopherConJP",
    logo: "/social/youtube-black.webp",
    logoHover: "/social/youtube.webp",
    logoAlt: "YouTube logo",
    followHref: "https://www.youtube.com/@GopherConJP?sub_confirmation=1",
    searchHref: "https://www.youtube.com/results?search_query=%23GopherConJP",
  },
  {
    service: "Slack",
    name: "Gophers Slack",
    handle: "#gophercon-japan",
    href: "https://invite.slack.golangbridge.org/",
    logo: "/social/slack-black.svg",
    logoHover: "/social/slack.svg",
    logoAlt: "Slack logo",
    joinHref: "https://invite.slack.golangbridge.org/",
  },
];
