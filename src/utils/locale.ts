import { localeStorageOptions } from "@intlayer/core/utils";
import {
  getConfiguration,
  getLocalizedUrl,
  getPathWithoutLocale,
  isDeclaredLocale,
  Locales,
  setLocaleInStorageClient,
  type DeclaredLocales,
  type LocalesValues,
} from "intlayer";

const getDeclaredLocales = (): DeclaredLocales[] => {
  const configured = getConfiguration().internationalization.locales.filter((locale) =>
    isDeclaredLocale(locale),
  );

  return configured.length > 0 ? configured : [Locales.ENGLISH];
};

export const getOtherLocale = (current: LocalesValues): DeclaredLocales => {
  const alternate = getDeclaredLocales().find((locale) => locale !== current);
  if (alternate !== undefined) {
    return alternate;
  }

  return isDeclaredLocale(current) ? current : Locales.ENGLISH;
};

export const getLocalizedHref = (pathname: string, targetLocale: DeclaredLocales): string =>
  getLocalizedUrl(getPathWithoutLocale(pathname), targetLocale);

export const setupLocalePersistence = (selector = "[data-locale]"): void => {
  document.querySelectorAll<HTMLAnchorElement>(selector).forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-locale");

      if (isDeclaredLocale(target)) {
        setLocaleInStorageClient(target, localeStorageOptions);
      }
    });
  });
};
