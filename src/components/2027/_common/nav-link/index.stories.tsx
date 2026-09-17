import NavLink from "./index.astro";

export default {
  title: "2027/Common/NavLink",
  component: NavLink,
  args: {
    href: "#about",
    current: false,
  },
};

export const Default = {
  args: { children: "About" },
};

export const Current = {
  args: { current: true, children: "About" },
};
