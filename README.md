# GopherCon Japan

The official website for GopherCon Japan, built with [Astro](https://astro.build/),
internationalized with [Intlayer](https://intlayer.org/), and deployed on
[Cloudflare Workers](https://developers.cloudflare.com/workers/) (static assets).

## Tech Stack

| Area              | Choice                                                                   |
| ----------------- | ------------------------------------------------------------------------ |
| Package manager   | [bun](https://bun.sh/) (v1.4.0)                                          |
| Runtime pinning   | [mise](https://mise.jdx.dev/) (`mise.toml`)                              |
| Framework         | [Astro](https://astro.build/) + TypeScript                               |
| i18n              | [Intlayer](https://intlayer.org/) (en default, `/ja`)                    |
| Component preview | [Storybook](https://storybook-astro.org/) (`@storybook-astro/framework`) |
| Deployment        | Cloudflare Workers (Static Assets, pull-based build)                     |

## Requirements

- [mise](https://mise.jdx.dev/) — installs the pinned `bun` and `node` versions
  from `mise.toml`:

  ```sh
  mise install
  ```

- All commands below use `mise exec -- bun ...` so the pinned versions are used.
  (Or activate the mise shims: `eval "$(mise activate)"` and use `bun` directly.)

## Getting Started

```sh
mise install          # install pinned runtimes (bun 1.4.0, node 26.8.1)
mise exec -- bun install
mise exec -- bun run dev      # http://localhost:4321 (en at /, ja at /ja)
```

## Commands

| Command                   | Action                                         |
| :------------------------ | :--------------------------------------------- |
| `bun run dev`             | Start the Astro dev server at `localhost:4321` |
| `bun run build`           | Build the static site to `./dist/`             |
| `bun run preview`         | Preview the production build locally           |
| `bun run preview:cf`      | Build then preview through Wrangler (Workers)  |
| `bun run deploy`          | Build then deploy to Cloudflare Workers        |
| `bun run check`           | Type-check the project (`astro check`)         |
| `bun run storybook`       | Component preview at `localhost:6006`          |
| `bun run build-storybook` | Build Storybook to `./storybook-static/`       |

## Project Structure

```text
/
├── .storybook/            # Storybook config (TypeScript)
├── mise.toml              # Pinned runtimes
├── astro.config.ts        # Astro config (TypeScript)
├── intlayer.config.ts     # Intlayer config (locales, routing)
├── wrangler.jsonc         # Cloudflare Workers config
├── public/
│   ├── favicon/           # Inherited favicon assets
│   └── site.webmanifest
└── src/
    ├── layouts/
    │   └── Layout.astro   # Base layout (SEO, hreflang, favicon)
    ├── components/
    │   ├── Hero.astro             # Component with an embedded dictionary
    │   ├── Hero.stories.ts
    │   ├── LocaleSwitcher.astro
    │   └── LocaleSwitcher.stories.ts
    └── pages/
        ├── [...locale]/index.astro   # Home: `/` (en) and `/ja`
        ├── 404.astro
        ├── robots.txt.ts
        └── sitemap.xml.ts
```

## Internationalization (Intlayer)

- English is the **default** locale and is served at `/`.
- Japanese is served under `/ja` (`routing.mode: "prefix-no-default"`).
- Dictionaries are **embedded in the component files**. Each component
  declares a locale-keyed content object and resolves it with Intlayer's
  `getTranslation` (the `StrictModeLocaleMap` type enforces all locales):

  ```astro
  ---
  import { getTranslation, type StrictModeLocaleMap } from "intlayer";

  const content = {
    en: { greeting: "Hello" },
    ja: { greeting: "こんにちは" },
  } satisfies StrictModeLocaleMap<{ greeting: string }>;

  const { greeting } = getTranslation(content, locale);
  ---
  ```

- `requiredLocales` is set to `[en, ja]`, so TypeScript errors when a
  translation is missing from a dictionary.
- Update locale / routing behavior in `intlayer.config.ts`.

## Storybook

Storybook renders Astro components server-side with `@storybook-astro/framework`.
Stories live next to the components they document (`*.stories.ts`).

```sh
bun run storybook          # http://localhost:6006
bun run build-storybook    # static build for CI/visual review
```

## Cloudflare Workers (Pull-based build)

The site is deployed as a Cloudflare Worker serving static assets:

- `wrangler.jsonc` points `assets.directory` at `./dist` (the `astro build`
  output).
- `build.command` (`bun run build`) is used by **pull-based (Git integration)
  builds**: Cloudflare clones the repository, installs dependencies, runs the
  build, and deploys the output.
- Configure the Cloudflare dashboard (Workers → Create → Import repository)
  with the install/build commands using bun:

  - Install command: `bun install`
  - Build command: `bun run build`
  - Deploy command: `bunx wrangler deploy`
  - Output directory: `dist` (from `assets.directory`)

Local preview with the exact Workers runtime:

```sh
bun run build
bunx wrangler dev          # serves ./dist as a Worker
```

Or use the combined script:

```sh
bun run preview:cf
```
