import Heading from "./Heading.astro";

export default {
  title: "2027/Styles/Elements/Heading",
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
  args: {
    level: 1,
    text: "世界に宿る熱量を日本へ。日本に眠る叡智を世界へ。",
    center: false,
  },
};

export const H1 = {
  args: { level: 1 },
};

export const H2Short = {
  args: { level: 2, text: "短い見出し" },
};

export const H2Medium = {
  args: { level: 2, text: "Goの未来を語る。" },
};

export const H2 = {
  args: {
    level: 2,
    text: "新しいGo体験をあなたに届けます。",
  },
};

export const H3 = {
  args: {
    level: 3,
    text: 'GopherCon Japanは、日本で行われる"半"国際カンファレンスです。',
  },
};

export const H3Center = {
  args: {
    level: 3,
    text: 'GopherCon Japanは、日本で行われる"半"国際カンファレンスです。',
    center: true,
  },
};
