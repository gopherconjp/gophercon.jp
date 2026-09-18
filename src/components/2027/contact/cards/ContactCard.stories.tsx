import ContactCard from "./ContactCard.astro";

const general = {
  email: "info@gophercon.jp",
  label: "General",
  description: "General inquiries about GopherCon Japan",
};

const program = {
  email: "program@gophercon.jp",
  label: "Program Team",
  description: "Inquiries about sessions, workshops, and other program matters",
};

export default {
  title: "2027/Contact/ContactCard",
  component: ContactCard,
  args: { contact: general },
};

export const General = {};

export const LongDescription = {
  args: { contact: program },
};
