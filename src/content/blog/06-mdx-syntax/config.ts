import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "06-mdx-syntax",
  config: {
    title: "MDX syntax guide",
    description: "Get started writing mdx in markdown.",
    date: new Date("2024-03-16"),
    draft: false,
    tags: [TAGS.MDX, TAGS.REACT, TAGS.ASTRO, TAGS.JAVASCRIPT],
  },
} as const satisfies BlogPostReference;
