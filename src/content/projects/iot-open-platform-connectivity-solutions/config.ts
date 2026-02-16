import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "iot-open-platform-connectivity-solutions",
  config: {
    title: "IoT Open Platform: Connectivity Solutions",
    description: "Final bachelor's thesis",
    date: new Date("2025-02-14"),
    draft: false,
    tags: [TAGS.LORA, TAGS.IOT, TAGS.BLE, TAGS.ESP32],
    demoURL: "https://apren.upc.edu/ca/materials/2117_424891",
    repoURL: "https://github.com/paugarcia32/TFG",
  },
} as const satisfies ProjectReference;
