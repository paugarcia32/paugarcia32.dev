import { defineCollection } from "astro:content";
import * as TAGS from "@tags";
import type { Tag } from "@tags";
import { validateTagSlugs } from "@lib/utils";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Derive Zod enum from tags.ts — adding a tag constant there automatically
// makes it valid in frontmatter. astro check will fail on unknown tags.
const tagValues = Object.values(TAGS);
validateTagSlugs(tagValues);
if (tagValues.length === 0 || new Set(tagValues).size !== tagValues.length) {
  throw new Error("Tags must have unique values and at least one entry");
}
const tagEnum = z.enum(tagValues as [Tag, ...Tag[]]);

// Custom date schema that accepts dd/mm/yyyy format
const ddmmyyyyDate = z.string().transform((val, ctx) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(val);
  if (match) {
    const [, day, month, year] = match.map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    ) {
      return date;
    }
  }
  ctx.addIssue({ code: "custom", message: "Invalid date. Use dd/mm/yyyy" });
  return z.NEVER;
});

const positionSchema = z.object({
  type: z.literal("position"),
  role: z.string(),
  dateStart: ddmmyyyyDate,
  dateEnd: z.union([ddmmyyyyDate, z.literal("Present")]),
  description: z.string(),
  tags: z.array(tagEnum).optional(),
}).refine((data) => typeof data.dateEnd === "string" || data.dateEnd >= data.dateStart, {
  message: "End date must not precede start date",
  path: ["dateEnd"],
});

const blog = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
      draft: z.boolean().default(false),
    tags: z.array(tagEnum).optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("company"),
      company: z.string(),
      url: z.url().optional(),
      description: z.string().optional(),
      logo: z.string().optional(),
    }),
      positionSchema,
  ]),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    demoURL: z.url().optional(),
    repoURL: z.url().optional(),
    tags: z.array(tagEnum).optional(),
    workPosition: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/).optional(),
  }),
});

export const collections = { blog, work, projects };
