import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://gophercon.jp",
  trailingSlash: "always",
  output: "static",
  integrations: [intlayer()],
});
