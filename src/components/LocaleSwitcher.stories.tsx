import LocaleSwitcher from "./LocaleSwitcher.astro";

export default {
  title: "Components/LocaleSwitcher",
  component: LocaleSwitcher,
};

export const Default = {
  args: { locale: "en" },
};
