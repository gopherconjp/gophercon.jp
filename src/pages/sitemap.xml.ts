import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

import { isProd } from "../utils/site";

const pageModules = import.meta.glob("/src/pages/**/*.astro");

const toCanonicalPath = (filePath: string): string => {
  const relative = filePath.replace("/src/pages/[...locale]/", "").replace(/\.astro$/, "");
  return relative === "index" ? "/" : `/${relative.replace(/\/index$/, "")}`;
};

const pathList: SitemapUrlEntry[] = Object.keys(pageModules)
  .filter((filePath) => filePath.includes("/[...locale]/"))
  .map(toCanonicalPath)
  .sort()
  .map((path) => ({ path }));

export const GET: APIRoute = async ({ site }) => {
  if (!site || !isProd(site)) {
    return new Response(null, { status: 204 });
  }

  // The `siteUrl` needs to be without trailing slash
  const sitemap = generateSitemap(pathList, { siteUrl: site.href.replace(/\/+$/, "") });

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
