import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  trailingSlash: "always",
  output: "static",
  integrations: [intlayer()],
});
