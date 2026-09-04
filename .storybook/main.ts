import type { StorybookConfig } from "@storybook-astro/framework";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
};

export default config;
