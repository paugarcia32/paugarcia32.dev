import * as TAGS from "@/tags";

export interface ProjectReference {
  slug: string;
  tags: string[];
}

export const PROJECTS = {
  realTimeSensoringIot: {
    slug: "real-time-sensoring-iot",
    tags: [TAGS.PYTHON, TAGS.FLUTTER, TAGS.ESP32, TAGS.IOT],
  },
  eetacGo: {
    slug: "eetac-go",
    tags: [TAGS.EXPRESS, TAGS.FLUTTER, TAGS.MONGODB, TAGS.TEAMWORK],
  },
  mqttServer: {
    slug: "mqtt-server",
    tags: [TAGS.MQTT, TAGS.CPP, TAGS.ESP32, TAGS.IOT, TAGS.RASPBERRY_PI],
  },
  rsaServer: {
    slug: "rsa-server",
    tags: [TAGS.EXPRESS, TAGS.ANGULAR, TAGS.CYBERSECURITY, TAGS.TEAMWORK],
  },
  planetSurvivor: {
    slug: "planet-survivor",
    tags: [TAGS.JAVA, TAGS.UNITY, TAGS.MARIADB, TAGS.TEAMWORK],
  },
  trafficFlowAi: {
    slug: "traffic-flow-ai",
    tags: [TAGS.PYTHON, TAGS.NEXTJS, TAGS.AI, TAGS.YOLOV10],
  },
  iotOpenPlatform: {
    slug: "iot-open-platform-connectivity-solutions",
    tags: [TAGS.LORA, TAGS.IOT, TAGS.BLE, TAGS.ESP32],
  },
  temperatureSensoring: {
    slug: "temperature-sensoring",
    tags: [TAGS.ARDUINO, TAGS.CPP, TAGS.ESP32, TAGS.IOT],
  },
} as const;

// Export type for type safety
export type ProjectKey = keyof typeof PROJECTS;
