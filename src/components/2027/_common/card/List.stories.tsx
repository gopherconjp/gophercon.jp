import CardList from "./List.astro";

export default {
  title: "2027/Common/Card/List",
  component: CardList,
  args: {
    cards: [],
  },
};

export const Default = {
  args: {
    cards: [
      { label: "Date", content: "Feb 13-14" },
      { label: "Venue", content: "Abema Towers", body: "Shibuya, Tokyo" },
    ],
  },
};
