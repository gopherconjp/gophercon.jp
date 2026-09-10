import Hamburger from "./Hamburger.astro";

export default {
  title: "2027/Common/Header/Hamburger",
  component: Hamburger,
  args: {
    label: "Open menu",
    links: [
      { label: "About", href: "#about" },
      { label: "Schedule", href: "#schedule" },
      { label: "Speakers", href: "#speakers" },
      { label: "Sponsors", href: "#sponsors" },
      { label: "FAQ", href: "#faq" },
      { label: "Committee", href: "#committee" },
      { label: "Contact/Socials", href: "#contact" },
    ],
  },
};

export const Default = {};
