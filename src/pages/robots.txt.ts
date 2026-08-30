import type { APIRoute } from "astro";

const PROD_HOST = "gophercon.jp";

export const GET: APIRoute = ({ site }) => {
  const isProd = site?.host === PROD_HOST;

  const lines = ["User-agent: *"];
  lines.push(isProd ? "Allow: /" : "Disallow: /");
  if (isProd) {
    lines.push("", `Sitemap: ${new URL("/sitemap.xml", site).href}`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain" },
  });
};
