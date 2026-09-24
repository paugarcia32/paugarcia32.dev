# Portfolio & Blog

Personal portfolio and blog built with Astro, TypeScript, Tailwind CSS and pnpm.

## Development

```bash
pnpm install
pnpm dev             # http://localhost:4321
pnpm build           # Astro type check + production build
pnpm lint            # Biome
pnpm create-content  # Interactive blog/project/work entry creator
```

Other commands: `pnpm dev:network`, `pnpm preview`, `pnpm lint:fix` and `pnpm format`.

## Content architecture

The frontmatter in `src/content/` is the **single source of truth** for metadata. Schemas in `src/content.config.ts` validate entries and provide types through `astro:content`. Content is discovered automatically; no TypeScript registration or sync step is needed.

```
src/content/
├── blog/<slug>/index.md(x)
├── projects/<slug>/index.md(x)
└── work/<company-slug>/
    ├── company.md
    └── <position-slug>.md
```

To create an entry, run `pnpm create-content`, or add a file manually:

```markdown
---
title: "My post"
description: "A short description."
date: "2026-02-16"
tags: ["JavaScript", "Web Development"]
draft: false
---

## Overview

Post content goes here.
```

Projects use the same fields and can also include `demoURL`, `repoURL`, and `workPosition: "company-slug/position-slug"`. A work company's `company.md` has `type: "company"`, `company`, and optional `url`, `description` and `logo`. Position files have `type: "position"`, `role`, `description`, `dateStart` and `dateEnd` in `dd/mm/yyyy` format (or `"Present"` for `dateEnd`), plus optional `tags`.

Tags must be defined in `src/tags.ts`. Their values are checked by the content schema, and tag URLs must be unique. Draft posts and projects are visible in development and excluded from production pages, search and RSS. Project-to-work links are checked against real positions during the build.

## Featured content

`src/showcases.ts` lists content folder slugs in display order. Companies are selected by their folder slug. Missing or unpublished homepage references fail the build rather than disappearing silently.

```ts
export const HOMEPAGE = {
  blog: ["vector-databases", "rest-api-design"],
  projects: ["pulse-notch"],
  work: [{ slug: "brickken", limit: 2 }],
};
```

## Site configuration

- `src/consts.ts`: site name, email, descriptions and social links.
- `src/tags.ts`: permitted tags.
- `src/showcases.ts`: curated homepage and CV selections.
- `astro.config.mjs`: site URL and integrations.

The site includes full-text search with Fuse.js, RSS, a sitemap, dark mode and Mermaid diagrams in Markdown/MDX. The production build is static and can be hosted on any static hosting platform; set its build command to `pnpm build` and output directory to `dist`.
