import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "six-moths-of-lesson",
  config: {
    title: "Six Months of Lessons",
    description: "What a 'Three-Week' Redesign Actually Taught Us",
    date: new Date("2026-01-18"),
    draft: false,
    tags: [TAGS.PROJECT_MANAGEMENT, TAGS.LESSONS_LEARNED, TAGS.DEVELOPMENT],
  },
} as const satisfies BlogPostReference;
