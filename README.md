# Quark Docs

Unified documentation portal for the Quark platform — a [Fuma Docs](https://fumadocs.vercel.app/) (Next.js) site that aggregates markdown from three product repositories into one searchable, navigable docs site.

## Overview

This repo contains only the Next.js docs application. The actual documentation markdown lives in each product's own repository — this portal syncs it at build time using `scripts/sync-content.sh`.

| Section | Source repo | Content location |
|---|---|---|
| Platform | [quarkloop/quark](https://github.com/quarkloop/quark) | `docs/*.mdx` |
| SDK | [quarkloop/quark-js](https://github.com/quarkloop/quark-js) | `docs/*.mdx` |
| Agent | [quarkloop/agent](https://github.com/quarkloop/agent) | `docs/*.mdx` |

## Features

- **Fuma Docs** — Next.js-based documentation framework with MDX support
- **Multi-product portal** — three product sections under one navigation
- **Pagefind search** — static search index generated at build time, no server required
- **Content sync** — `sync-content.sh` clones each product repo with `--depth 1` and copies ALL markdown files from `docs/` into `content/docs/<section>/` — no hardcoded filenames
- **Manual Vercel deployment** — `vercel.ts` configures the Vercel project; deploy with `vercel --prod` from the CLI
- **Warm design system** — sand/ember color palette, no gradients, premium typography

## Installation

```bash
git clone git@github.com:quarkloop/docs.git
cd docs
npm install
```

## Quick start

```bash
# 1. Sync content from product repos:
./scripts/sync-content.sh

# 2. Start the dev server:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the docs portal.

## Deploying to Vercel

This repo uses `vercel.ts` (not `vercel.json`) for type-safe configuration. Deployments are manual via the Vercel CLI — there is no CI/CD integration.

```bash
# Install Vercel CLI (one-time):
npm i -g vercel

# Preview deployment:
vercel

# Production deployment:
vercel --prod
```

The `vercel.ts` config automatically:
1. Runs `sync-content.sh` to pull markdown from product repos
2. Builds the Next.js app
3. Generates the Pagefind search index

**Note:** The sync script uses HTTPS URLs to clone product repos — all three repos are public, so no authentication is needed on Vercel or in CI.

## Documentation

- [Vercel TS reference](https://vercel.com/docs/project-configuration/vercel-ts) — official docs for the `vercel.ts` format
- [Fuma Docs](https://fumadocs.vercel.app/) — the documentation framework
- [Pagefind](https://pagefind.app/) — the static search engine

## How it works

```
Product repos (3)                    Docs repo (this one)
┌─────────────────┐                 ┌──────────────────────────┐
│ quarkloop/quark │──┐              │                          │
│ quarkloop/      │  │  git clone   │  scripts/sync-content.sh │
│   quark-js      │──┼─────────────►│  clones each repo with   │
│ quarkloop/agent │──┘  --depth 1   │  --depth 1, copies ALL   │
└─────────────────┘                 │  .md/.mdx from docs/     │
                                    │                          │
                                    │  content/docs/           │
                                    │  ├── platform/*.mdx      │
                                    │  ├── sdk/*.mdx           │
                                    │  └── agent/*.mdx         │
                                    │                          │
                                    │  next build              │
                                    │  pagefind (postbuild)    │
                                    │                          │
                                    │  → Vercel deployment     │
                                    └──────────────────────────┘
```

The `content/` directory is gitignored — it is regenerated on every build. The source of truth for each doc file lives in its product repo.

## Compatibility

| Component | Version |
|---|---|
| Next.js | 15.1+ |
| React | 19+ |
| Fuma Docs | 15+ (core), 11+ (mdx), 15+ (ui) |
| Pagefind | 1.1+ |
| Node.js | 20+ |

## Contributing

Documentation content changes should be made in the **product repository**, not here. This repo only contains the docs site infrastructure (Next.js app, components, styling, sync script).

If you need to change the docs site itself (layout, navigation, styling, build pipeline), open a PR here.

## License

This project is licensed under the Apache License, Version 2.0 — see the [LICENSE](LICENSE) file for details.
