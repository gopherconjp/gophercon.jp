import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";
import cssVariablesPlugin from "lightningcss-plugin-css-variables";

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  output: "static",
  integrations: [intlayer()],
  compressHTML: true,
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        visitor: cssVariablesPlugin(),
      },
    },
  },
});
