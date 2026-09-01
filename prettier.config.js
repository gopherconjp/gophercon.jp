export default {
  plugins: ["prettier-plugin-astro", "@ianvs/prettier-plugin-sort-imports"],
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
  importOrder: ["<BUILTIN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[.]"],
};
