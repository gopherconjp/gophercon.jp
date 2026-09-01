import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.JAPANESE],
    requiredLocales: [Locales.ENGLISH, Locales.JAPANESE],
    strictMode: "strict",
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    fill: false,
    location: "local",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [{ type: "localStorage", name: "intlayer_locale" }],
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
