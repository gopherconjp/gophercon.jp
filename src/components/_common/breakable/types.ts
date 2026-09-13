interface BreakableAccent {
  accent: Breakable;
}

interface BreakableLink {
  href: string;
  link: Breakable;
}

export type Breakable = Breakable[] | BreakableAccent | BreakableLink | string;

const isObject = (value: Breakable): value is BreakableAccent | BreakableLink =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isBreakableAccent = (value: Breakable): value is BreakableAccent =>
  isObject(value) && Object.hasOwn(value, "accent");

export const isBreakableLink = (value: Breakable): value is BreakableLink =>
  isObject(value) && Object.hasOwn(value, "link");
