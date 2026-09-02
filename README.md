# gophercon.jp

The official website for GopherCon Japan.

- built with [Astro](https://astro.build/)
- internationalized with [Intlayer](https://intlayer.org/) (English default at `/`, Japanese at `/ja`)
- deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/) as static assets.

## Stack

[bun](https://bun.sh/) (pinned by [mise](https://mise.jdx.dev/)) · Astro + TypeScript · Intlayer · Storybook

## Getting started

```sh
mise install              # install pinned runtimes
eval "$(mise activate)"   # enable mise shims (add to your shell rc to persist)
bun install
bun run dev               # http://localhost:4321 (en at /, ja at /ja)
```

> The commands below assume the mise shims are active. Without shims, prefix
> them with `mise exec --` (e.g. `mise exec -- bun run dev`).

## Commands

| Command              | Description                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `bun run dev`        | Astro dev server (`localhost:4321`)                                                              |
| `bun run build`      | Build the static site to `./dist/`                                                               |
| `bun run preview`    | Preview the production build locally                                                             |
| `bun run preview:cf` | Build then preview through Wrangler (Workers)                                                    |
| `bun run check`      | Type-check (`astro check`, `tsc --noEmit`) + static analysis (`knip`: unused files/exports/deps) |
| `bun run storybook`  | Component preview (`localhost:6006`)                                                             |
| `bun run deploy`     | Build then deploy to Cloudflare Workers                                                          |

## Project structure

```text
src/
├── components/
│   ├── Hero.astro        # Hero section
│   ├── 2027/             # 2027 site sections
│   └── common/i18n/      # LocaleSwitcher / LocaleRedirector
├── layouts/
│   └── Layout.astro      # Base layout (SEO, hreflang, header)
├── pages/                # [...locale]/ routes (en at /, ja at /ja)
└── utils/
```

## i18n (Intlayer)

- Routing: `intlayer.config.ts` → `routing.mode: "prefix-no-default"` (en at `/`, ja at `/ja`).
- Dictionaries are embedded in components as locale-keyed objects, resolved with
  `getDictionary`. `requiredLocales: [en, ja]` makes TypeScript complain about
  missing translations.
- `LocaleRedirector` detects the browser locale (unsupported → `defaultLocale`)
  and redirects; `LocaleSwitcher` renders the language links and persists the choice.

## Deployment

Cloudflare Workers (Static Assets) with a pull-based build — `wrangler.jsonc`
points `assets.directory` at `./dist`. To preview on the Workers runtime:

```sh
bun run preview:cf
```
