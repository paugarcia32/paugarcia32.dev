import { defineCollection, z } from "astro:content";

// Helper to parse dd/mm/yyyy format
const parseDDMMYYYY = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

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
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const work = defineCollection({
  type: "content",
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
      tags: z.array(z.string()).optional(),
    }),
  ]),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, work, projects };
