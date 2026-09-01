// Prepare the static Storybook build (dist/storybook) for serving under /storybook.
// - Copy images under src/ alongside the build and rewrite the pre-rendered
//   image URLs to point at the copies
// - Anchor the manager's relative refs via a <base> tag, so /storybook works
//   even without a trailing slash

import "bun";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dir, "../..");
const srcDir = path.join(root, "src");
const dest = path.join(root, "dist", "storybook");

const basePath = "storybook"; // URL base path

// 1) Copy every webp under src/ to dist/storybook/<rel>.
const webpImgs = [...new Bun.Glob("**/*.webp").scanSync({ cwd: srcDir })];
for (const rel of webpImgs) {
  console.log(`Copying src/${rel}...`);

  const to = path.join(dest, rel);
  await mkdir(path.dirname(to), { recursive: true });
  await Bun.write(to, Bun.file(path.join(srcDir, rel)));
}

// 2) Rewrite pre-rendered image URLs to the copies.
//    Example:
//      @fs/Users/.../src/components/path/to/sample.webp?hash=...
//      => /storybook/components/path/to/sample.webp
const jsonPath = path.join(dest, "astro-prerendered-stories.json");
const json = await Bun.file(jsonPath).text();
await Bun.write(
  jsonPath,
  json.replace(
    /\/?(?:@fs\/[^"']*?\/src\/)?([^"']+?\.webp)(?:\?[^"'\\]*)?/g,
    (_full, rel) => `/${basePath}/${rel}`,
  ),
);

// 3) Anchor the manager to /storybook.
const indexPath = path.join(dest, "index.html");
let indexHtml = await Bun.file(indexPath).text();
await Bun.write(
  indexPath,
  indexHtml.replace("<head>", `<head>\n\t\t<base href="/${basePath}/" />`),
);

console.log(
  `\nPrepared ${path.relative(root, dest)}:`,
  `${webpImgs.length} images copied, base anchored to /${basePath}/`,
);
