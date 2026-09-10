import NavLink from "./NavLink.astro";

export default {
  title: "2027/Common/Header/NavLink",
  component: NavLink,
  args: {
    label: "About",
    href: "#about",
    current: false,
  },
};

export const Default = {};

export const Current = {
  args: { current: true },
};
