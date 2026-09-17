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
  render: (args: Record<string, unknown>) => <NavLink {...args}>About</NavLink>,
};

export const Current = {
  args: { current: true },
  render: (args: Record<string, unknown>) => <NavLink {...args}>About</NavLink>,
};
