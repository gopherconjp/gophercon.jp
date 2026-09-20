import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const markdown2027 = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/contents/2027" }),
});

export const collections = { markdown2027 };
