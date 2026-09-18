interface Accent {
  accent: Breakable;
}

interface Link {
  href: string;
  link: Breakable;
}

interface Break {
  break: true;
}

export type Breakable = Breakable[] | Accent | Link | Break | string;

const isObject = (value: Breakable): value is Accent | Link | Break =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isAccent = (value: Breakable): value is Accent =>
  isObject(value) && Object.hasOwn(value, "accent");

export const isLink = (value: Breakable): value is Link =>
  isObject(value) && Object.hasOwn(value, "link");

export const isBreak = (value: Breakable): value is Break =>
  isObject(value) && "break" in value && value.break;
