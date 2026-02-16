import type { BlogPostReference } from "@/types";

export default {
  slug: "08-draft-example",
  config: {
    title: "Draft example",
    description: "Setting draft flag to true to hide this post.",
    date: new Date("2022-12-31"),
    draft: false,
    tags: [],
  },
} as const satisfies BlogPostReference;
