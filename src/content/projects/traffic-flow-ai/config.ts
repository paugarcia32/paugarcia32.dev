import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "traffic-flow-ai",
  config: {
    title: "Traffic Flow AI",
    description: "Real-time AI traffic radar system using YOLOv10 model",
    date: new Date("2024-07-01"),
    draft: false,
    tags: [TAGS.PYTHON, TAGS.NEXTJS, TAGS.AI, TAGS.YOLOV10],
    repoURL: "https://github.com/TrafficFlow-AI",
    demoURL: "https://www.hackbarna.com/en/projects/TrafficFlow_AI",
  },
} as const satisfies ProjectReference;
