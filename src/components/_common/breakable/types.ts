export type Breakable =
  | string
  | Breakable[]
  | { accent: Breakable }
  | { link: Breakable; href: string };
