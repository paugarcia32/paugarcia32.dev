import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "rsa-server",
  config: {
    title: "RSA Server",
    description: "Full stack web application that implements RSA keys on server and client",
    date: new Date("2024-07-28"),
    draft: false,
    tags: [TAGS.EXPRESS, TAGS.ANGULAR, TAGS.CYBERSECURITY, TAGS.TEAMWORK],
    repoURL: "https://github.com/paugarcia32/RSA-Client-Server",
  },
} as const satisfies ProjectReference;
