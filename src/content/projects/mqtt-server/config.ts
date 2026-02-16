import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "mqtt-server",
  config: {
    title: "MQTT Pub/Sub Server with ESP32 and Raspberry Pi",
    description: "A custom MQTT-based publish/subscribe mechanism for communication between an ESP32 microcontroller and a Raspberry Pi",
    date: new Date("2024-04-07"),
    draft: false,
    tags: [TAGS.MQTT, TAGS.CPP, TAGS.ESP32, TAGS.IOT, TAGS.RASPBERRY_PI],
    repoURL: "https://github.com/paugarcia32/ESP32-MQTT-pub-sub",
  },
} as const satisfies ProjectReference;
