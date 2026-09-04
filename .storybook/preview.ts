import { definePreview } from "@storybook-astro/framework";

import "../src/components/2027/_styles/token.css";
import "../src/components/2027/_styles/font.css";

const preview = definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
});

export default preview;
