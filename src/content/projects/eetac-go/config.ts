import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "eetac-go",
  config: {
    title: "EETAC GO",
    description: "Full stack Mobile Application",
    date: new Date("2023-06-29"),
    draft: false,
    tags: [TAGS.EXPRESS, TAGS.FLUTTER, TAGS.MONGODB, TAGS.TEAMWORK],
    repoURL: "https://github.com/paugarcia32/EETAC-GO",
  },
} as const satisfies ProjectReference;
