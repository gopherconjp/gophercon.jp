import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pageModules = import.meta.glob("/src/pages/**/*.astro");

const toCanonicalPath = (filePath: string): string => {
  const relative = filePath.replace("/src/pages/[...locale]/", "").replace(/\.astro$/, "");
  return relative === "index" ? "/" : `/${relative.replace(/\/index$/, "")}`;
};

const pathList: SitemapUrlEntry[] = Object.keys(pageModules)
  .filter((filePath) => filePath.includes("/[...locale]/"))
  .map(toCanonicalPath)
  .sort()
  .map((path) => ({
    path,
    changefreq: path === "/" ? "daily" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async () => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
