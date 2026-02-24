import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "dual-boot-ubuntu-windows",
  config: {
    title: "How to Dual-Boot Ubuntu and Windows 11",
    description:
      "Step-by-step guide to set up a dual-boot system with Windows 11 and Ubuntu, including a shared NTFS partition.",
    date: new Date("2024-01-04"),
    draft: false,
    tags: [TAGS.LINUX, TAGS.WINDOWS, TAGS.TUTORIAL],
  },
} as const satisfies BlogPostReference;
