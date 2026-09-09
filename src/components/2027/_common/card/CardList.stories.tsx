import CardList from "./CardList.astro";

export default {
  title: "2027/Common/Card/CardList",
  component: CardList,
  args: {
    cards: [
      { label: "Date", content: "Feb 13-14" },
      { label: "Venue", content: "Abema Towers" },
    ],
  },
};

export const Default = {};
