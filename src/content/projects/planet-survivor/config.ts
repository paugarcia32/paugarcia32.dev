import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "planet-survivor",
  config: {
    title: "Planet Survivor",
    description: "Mobile game",
    date: new Date("2023-01-27"),
    draft: false,
    tags: [TAGS.JAVA, TAGS.UNITY, TAGS.MARIADB, TAGS.TEAMWORK],
    repoURL: "https://github.com/MikelArinaMarcos/dsaProjectG6",
  },
} as const satisfies ProjectReference;
