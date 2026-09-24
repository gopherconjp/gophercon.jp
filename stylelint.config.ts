import type { Config } from "stylelint";

export default {
  extends: ["stylelint-config-standard", "stylelint-config-html/astro"],
  rules: {
    // `--_` tokens are valid (inlined at build)
    "custom-property-pattern": "^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
    // BEM is the project convention
    "selector-class-pattern":
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
  },
  overrides: [
    {
      files: ["**/*.css"],
      // CSS is formatted by stylelint, not prettier/oxfmt
      extends: ["@stylistic/stylelint-config"],
    },
    {
      files: ["**/*.astro"],
      rules: {
        // `<style set:html>` has no inline content
        "no-empty-source": null,
        // Astro `:global()` is valid
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
      },
    },
  ],
} satisfies Config;
