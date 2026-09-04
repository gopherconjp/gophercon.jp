import Heading from "./Heading.astro";

export default {
  title: "2027/Styles/Headings",
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
  },
};

export const H1 = {
  args: { level: 1 },
};

export const H2 = {
  args: {
    level: 2,
    text: "新しいGoのカンファレンス「GopherCon Japan」を開催いたします。",
  },
};

export const H2Short = {
  args: { level: 2, text: "短い見出し" },
};

export const H3 = {
  args: {
    level: 3,
    text: "日本のGopherに「これが世界だ」という刺激を。世界のGopherに「これが日本だ」という誇りを。",
  },
};

export const H3Short = {
  args: { level: 3, text: "短い見出し" },
};
