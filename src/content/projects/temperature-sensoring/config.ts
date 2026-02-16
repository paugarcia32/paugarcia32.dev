import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "temperature-sensoring",
  config: {
    title: "BME280 Sensor with 0.96 OLED Display and ESP32",
    description: "A custom temperature and humidity indicator using the BME280 sensor, displayed on a 0.96-inch OLED screen with an ESP32 microcontroller",
    date: new Date("2024-04-16"),
    draft: false,
    tags: [TAGS.ARDUINO, TAGS.CPP, TAGS.ESP32, TAGS.IOT],
    repoURL: "https://github.com/paugarcia32/ESP-32-with-BME280-and-0.96OLED",
  },
} as const satisfies ProjectReference;
