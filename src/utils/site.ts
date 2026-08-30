const PROD_HOST = "gophercon.jp";

export const isProd = (site: URL | undefined): boolean => {
  return site?.host === PROD_HOST;
};
