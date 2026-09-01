import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";
import cssVariables from "lightningcss-plugin-css-variables";

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  output: "static",
  integrations: [intlayer()],
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        visitor: cssVariables(),
      },
    },
  },
});
