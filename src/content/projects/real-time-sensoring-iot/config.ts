import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "real-time-sensoring-iot",
  config: {
    title: "IoT Real-Time Sensoring",
    description: "Full stack IoT real-time sensoring system",
    date: new Date("2024-05-04"),
    draft: false,
    tags: [TAGS.PYTHON, TAGS.FLUTTER, TAGS.ESP32, TAGS.IOT],
    repoURL: "https://github.com/CisHighLevel",
  },
} as const satisfies ProjectReference;
