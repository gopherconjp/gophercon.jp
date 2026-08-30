import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.JAPANESE],
    requiredLocales: [Locales.ENGLISH, Locales.JAPANESE],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
  content: {
    contentDir: ["src"],
  },
  editor: {
    enabled: false,
    applicationURL: "http://localhost:4321",
  },
};

export default config;
