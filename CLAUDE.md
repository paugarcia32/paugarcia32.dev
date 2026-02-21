# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and blog site built with Astro, featuring a minimal, lightweight design. The site showcases blog posts, work experience, and projects using Astro's content collections.

## Package Manager

This project uses **pnpm**. Always use `pnpm` commands, not npm or yarn.

## Development Server

**Assume the dev server is always running at `http://localhost:4321`** unless told otherwise. Do not start it again or run `pnpm dev` unless explicitly asked.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server (localhost:4321)
pnpm dev

# Start dev server on network
pnpm dev:network

# Build (runs astro check first)
pnpm build

# Preview production build
pnpm preview

# Lint code with Biome
pnpm lint

# Lint, format, and organize imports (auto-fix)
pnpm lint:fix

# Format code only
pnpm format
```

## Code Style

Biome is used for linting and formatting with these rules:
- **Semicolons**: Always required
- **Quotes**: Double quotes for strings
- **Indentation**: 2 spaces
- **Import organization**: Automatically organized on save/fix
- **Tailwind directives**: Supported in CSS files

Special configurations:
- Astro files have `noUnusedVariables` disabled (variables used in templates appear unused to the linter)
- CSS files support Tailwind `@apply` directives

## Editor Setup

### Zed

The project includes Zed configuration in `.zed/settings.json`:
- Biome is configured as the language server for formatting and linting
- Format-on-save is enabled
- Prettier is explicitly disabled
- Code actions include auto-fix and import organization

Recommended extensions (in `.zed/extensions.json`):
- `biome` - Biome language server
- `astro` - Astro language support

## Architecture

### Content Collections

Three content collections are defined in `src/content/config.ts`:

1. **blog**: Blog posts with title, description, date, and optional draft flag
2. **work**: Work experience with company, role, dateStart, and dateEnd (date or string)
3. **projects**: Projects with title, description, date, optional draft, demoURL, and repoURL

Content files live in:
- `src/content/blog/`
- `src/content/work/`
- `src/content/projects/`

### Site Configuration

`src/consts.ts` contains all site-wide configuration:
- `SITE`: Name, email, number of items to show on homepage
- `HOME`, `BLOG`, `WORK`, `PROJECTS`: Metadata (title, description) for each section
- `SOCIALS`: Social media links array

To update site information, edit this file.

### Path Aliases

TypeScript is configured with path aliases:
- `@*` maps to `./src/*`

Example: `import { SITE } from "@consts";`

### Utility Functions

`src/lib/utils.ts` provides:
- `cn()`: Merges Tailwind classes using clsx and tailwind-merge
- `formatDate()`: Formats dates for display
- `readingTime()`: Calculates reading time from HTML content
- `dateRange()`: Formats date ranges for work experience

### Pages Structure

- `src/pages/index.astro`: Homepage
- `src/pages/blog/`: Blog listing and dynamic post pages
- `src/pages/work/index.astro`: Work experience page
- `src/pages/projects/`: Projects listing and dynamic project pages
- `src/pages/rss.xml.ts`: RSS feed generation
- `src/pages/robots.txt.ts`: Robots.txt generation

Dynamic routes use Astro's `[...slug].astro` pattern for content collection entries.

### Styling

- **Framework**: Tailwind CSS with class-based dark mode
- **Fonts**: Inter (sans-serif), Lora (serif) via @fontsource
- **Typography**: @tailwindcss/typography plugin for prose content
- Tailwind config in `tailwind.config.mjs`

### Integrations

Configured in `astro.config.mjs`:
- `@astrojs/mdx`: MDX support
- `@astrojs/sitemap`: Auto-generated sitemap
- `@astrojs/tailwind`: Tailwind CSS integration

Update the `site` field in astro.config.mjs when deploying to a new domain.

## Common Tasks

### Adding a Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add frontmatter with required fields: `title`, `description`, `date`
3. Add `draft: true` to hide from production

### Adding a Project

1. Create a new `.md` or `.mdx` file in `src/content/projects/`
2. Add frontmatter with: `title`, `description`, `date`
3. Optionally add: `demoURL`, `repoURL`, `draft: true`

### Adding Work Experience

1. Create a new `.md` or `.mdx` file in `src/content/work/`
2. Add frontmatter with: `company`, `role`, `dateStart`, `dateEnd`
3. `dateEnd` can be a date or string like "Present"

### Updating Site Metadata

Edit `src/consts.ts` to change:
- Site name, email
- Number of items shown on homepage
- Page titles and descriptions
- Social links
