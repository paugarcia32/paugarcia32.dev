import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "05-markdown-syntax",
  config: {
    title: "Markdown syntax guide",
    description: "Get started writing content in markdown.",
    date: new Date("2024-03-17"),
    draft: false,
    tags: [TAGS.MARKDOWN, TAGS.WRITING, TAGS.DOCUMENTATION],
  },
} as const satisfies BlogPostReference;
