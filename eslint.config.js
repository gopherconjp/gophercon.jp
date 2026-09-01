import tsLint from "@typescript-eslint/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["*.astro", "**/*.astro"],
    plugins: {
      "@typescript-eslint": tsLint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "none",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          enableAutofixRemoval: { imports: true },
        },
      ],
    },
  },
];
