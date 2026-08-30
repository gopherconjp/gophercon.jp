import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://gophercon.jp",
  trailingSlash: "always",
  output: "static",
  integrations: [intlayer()],
});
