import {
  defaultLocale,
  getLocalizedUrl,
  getPathWithoutLocale,
  localeMap,
  type LocalesValues,
} from "intlayer";

export const OG_LOCALES: Record<LocalesValues, string> = {
  en: "en_US",
  ja: "ja_JP",
};

interface SeoOptions {
  locale: LocalesValues;
  pathname: string;
  site: string | URL | undefined;
  siteName: string;
  title: string;
  ogImage: string;
  redirectTo?: string;
}

export const getSeo = ({
  locale,
  pathname,
  site,
  siteName,
  title,
  ogImage,
  redirectTo,
}: SeoOptions) => {
  if (site === undefined) {
    throw new Error("Astro.site is not configured");
  }

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  const ogImageUrl = new URL(ogImage, site);
  const ogLocale = OG_LOCALES[locale];

  const canonical = new URL(redirectTo ?? getLocalizedUrl(pathWithoutLocale, locale), site);

  const alternates = localeMap(({ locale: alternateLocale }) => ({
    locale: alternateLocale,
    href: new URL(getLocalizedUrl(pathWithoutLocale, alternateLocale), site),
  }));

  const xDefaultHref = new URL(getLocalizedUrl(pathWithoutLocale, defaultLocale), site);

  return {
    fullTitle,
    ogImageUrl,
    ogLocale,
    canonical,
    alternates,
    xDefaultHref,
  };
};
