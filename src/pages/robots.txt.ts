import type { APIRoute } from "astro";

import { isProd } from "../utils/site";

export const GET: APIRoute = ({ site }) => {
  const lines = ["User-agent: *"];
  if (isProd(site)) {
    lines.push("Allow: /");
    lines.push("");
    lines.push(`Sitemap: ${new URL("/sitemap.xml", site).href}`);
  } else {
    lines.push("Disallow: /");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain" },
  });
};
