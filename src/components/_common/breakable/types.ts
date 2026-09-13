interface Accent {
  accent: Breakable;
}

interface Link {
  href: string;
  link: Breakable;
}

export type Breakable = Breakable[] | Accent | Link | string;

const isObject = (value: Breakable): value is Accent | Link =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isAccent = (value: Breakable): value is Accent =>
  isObject(value) && Object.hasOwn(value, "accent");

export const isLink = (value: Breakable): value is Link =>
  isObject(value) && Object.hasOwn(value, "link");
