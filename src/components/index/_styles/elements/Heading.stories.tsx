import Heading from "./Heading.astro";

export default {
  title: "Index/Styles/Elements/Heading",
  component: Heading,
  argTypes: {
    level: {
      control: "inline-radio",
      options: [1, 2, 3],
    },
    text: {
      control: "text",
    },
  },
  args: {},
};

export const H1 = {
  args: {
    level: 1,
    text: "404",
  },
};

export const H2 = {
  args: { level: 2, text: "新しいGo体験をあなたに届けます。" },
};

export const H3 = {
  args: {
    level: 3,
    text: 'GopherCon Japanは、日本で行われる"半"国際カンファレンスです。',
  },
};
