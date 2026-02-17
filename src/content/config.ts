import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { parseDDMMYYYY } from "@lib/utils";
import * as TAGS from "@tags";

// Derive Zod enum from tags.ts — adding a tag constant there automatically
// makes it valid in frontmatter. astro check will fail on unknown tags.
const tagValues = Object.values(TAGS).filter(
  (v) => typeof v === "string",
) as string[];
const tagEnum = z.enum(tagValues as [string, ...string[]]);

// Custom date schema that accepts dd/mm/yyyy format
const ddmmyyyyDate = z.string().transform((val, ctx) => {
  try {
    const date = parseDDMMYYYY(val);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid date format. Use dd/mm/yyyy",
      });
      return z.NEVER;
    }
    return date;
  } catch {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid date format. Use dd/mm/yyyy",
    });
    return z.NEVER;
  }
});

const blog = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.array(tagEnum).optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("company"),
      company: z.string(),
      url: z.string().url().optional(),
    }),
    z.object({
      type: z.literal("position"),
      role: z.string(),
      dateStart: ddmmyyyyDate,
      dateEnd: z.union([ddmmyyyyDate, z.string()]),
      description: z.string(),
      tags: z.array(tagEnum).optional(),
    }),
  ]),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    tags: z.array(tagEnum).optional(),
  }),
});

export const collections = { blog, work, projects };
