---
name: content-writer
description: Writing guide for blog posts and project entries in this portfolio. Use this skill when creating or editing content in src/content/blog/ or src/content/projects/. Triggers on blog post, project entry, write article, content writing, new post, new project page.
license: MIT
metadata:
  author: paugarcia32
  version: "1.0.0"
  category: content
  tags: writing, blog, projects, mdx, markdown, content-collections
---

# Content Writer

Writing guide for blog posts and project entries in this Astro portfolio.

## When to Use This Skill

Activate this skill when:
- Writing a new blog post in `src/content/blog/`
- Creating a new project page in `src/content/projects/`
- Editing existing content entries
- Ensuring consistent writing style across content

---

## File Structure

Content entries follow this directory pattern:

```
src/content/blog/<slug>/index.md       # or .mdx
src/content/projects/<slug>/index.mdx  # prefer .mdx for components
```

Each entry lives in its own folder. The folder name becomes the URL slug.

---

## Frontmatter Reference

### Blog post (`src/content/blog/<slug>/index.md`)

```yaml
---
title: "Post Title"
description: "One or two sentences that summarize the post (~80 characters)."
date: "Jan 18, 2026"          # human-readable date
draft: true                    # optional — omit to publish
tags: ["lessons-learned", "development"]  # optional
---
```

**Required fields:** `title`, `description`, `date`
**Optional fields:** `draft`, `tags`

Tags must be defined in `src/tags.ts`. Using an undefined tag will fail `astro check`.

### Project entry (`src/content/projects/<slug>/index.mdx`)

```yaml
---
title: "Project Name"
description: "One sentence description of what the project does (~80 characters)."
date: "Jul 1, 2024"
draft: true                          # optional
demoURL: "https://..."               # optional
repoURL: "https://github.com/..."    # optional
tags: ["Python", "NextJS", "AI"]     # optional
---
```

**Required fields:** `title`, `description`, `date`
**Optional fields:** `draft`, `demoURL`, `repoURL`, `tags`

---

## MDX Components

Project pages use `.mdx` to include interactive components. Always import at the top of the file, after the frontmatter.

### FeatureGrid

Displays features in a responsive grid.

```mdx
import FeatureGrid from "../../../components/FeatureGrid.astro";

<FeatureGrid
  columns={3}
  items={[
    { icon: "bolt", title: "Feature Name", description: "What it does, concretely." },
    { icon: "cpu-chip", title: "Another Feature", description: "What it does." },
  ]}
/>
```

**Props:**
- `items` (required): array of `{ title, description?, icon?, number? }`
- `columns` (optional, default `3`): items per row
- `bordered` (optional, default `false`): adds border around each card
- `icon`: a Heroicon name (string), e.g. `"bolt"`, `"cpu-chip"`, `"signal"`

### Timeline

Displays a numbered vertical timeline. Use it for design process or build steps.

```mdx
import Timeline from "../../../components/Timeline.astro";

<Timeline
  items={[
    {
      title: "Step 1 — Problem Definition",
      description: "Define the scope and constraints.",
    },
    {
      title: "Step 2 — Implementation",
      description: "Build the core functionality.",
    },
  ]}
/>
```

**Props:**
- `items` (required): array of `{ title, description? }`

---

## Heading Levels

All headings in content files must start at `##` (h2). Never use `#` (h1) in body content — the page title from frontmatter serves as the h1.

```markdown
## Project Overview   ✓
# Project Overview    ✗
```

---

## Recommended Project Page Structure

For consistency, project pages follow this section order:

1. **Project Overview** — What it is, what it does, and context (team size, event, timeframe)
2. **My Role** — Specific responsibilities within the project
3. **Design Process** — Use `<Timeline>` for step-by-step breakdown
4. **Features** — Use `<FeatureGrid>` for feature listing
5. **Tech Stack** — Markdown table: Layer | Technology
6. **Conclusions** — What the project taught, what the outcome was

Not all sections are required. Skip sections that add no real information.

**Tech stack table format:**

```markdown
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js |
| Backend | Express.js |
```

---

## Writing Standard

### Grammar and style

Documentation must be:
- Grammatically correct
- Clear and unambiguous, with complete sentences
- Properly punctuated

Brevity is valued, but never at the cost of clarity or correctness.

### Strunk & White rules to follow

- Use active voice. Write "the team built the backend" not "the backend was built by the team."
- Put statements in positive form. Write "the feature was missing" not "the feature was not present."
- Use definite, specific, concrete language. Say what the project actually does, not what it "aims to" or "helps to."
- Omit needless words. Cut phrases that add length without adding meaning.
- Keep related words together.
- Place emphatic words at the end of the sentence.

### Punctuation: no em dashes

Do not use the em dash character (`—`) as a parenthetical separator inside sentences.

Wrong:
> The project was built during **HackUPC** — a 36-hour hackathon — by a team of 4 members.

Correct:
> The project was built during **HackUPC**, a 36-hour hackathon, by a team of 4 members.

Or restructure:
> Four people built the project during HackUPC, a 36-hour hackathon.

Em dashes in Timeline titles (e.g. `"Step 1 — Problem Definition"`) are a visual formatting convention and are allowed there.

### AI writing patterns to avoid

LLMs regress to statistical averages, producing generic and inflated prose. Avoid these patterns:

**Puffery words:** pivotal, crucial, vital, testament, enduring legacy, groundbreaking, seamless, robust, cutting-edge

**Empty -ing phrases:** ensuring reliability, showcasing features, highlighting capabilities, leveraging the power of

**Overused AI vocabulary:** delve, leverage, multifaceted, foster, realm, tapestry, unleash, empower

**Formatting overuse:** excessive bullet lists, bold on every other word, emoji in body text

Be specific, not grandiose. Instead of "a robust, cutting-edge AI system," write "a YOLOv10 pipeline that detects vehicles in real time."

---

## Checklist Before Finishing

- [ ] Frontmatter has all required fields (`title`, `description`, `date`)
- [ ] `description` is ~80 characters: concrete, one sentence, no generic phrases
- [ ] Tags exist in `src/tags.ts`
- [ ] `draft: true` is set if the entry is not ready to publish
- [ ] MDX components are imported after the frontmatter block
- [ ] All headings use `##` or deeper — never `#` in body content
- [ ] No em dashes used as parenthetical separators in body text
- [ ] Active voice used throughout
- [ ] No puffery or AI-pattern vocabulary
- [ ] Concrete and specific language (says what it actually does)
