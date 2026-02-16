/**
 * Centralized projects exports
 * Import configs and create type-safe references
 */

// Import all project configs (default exports)
import realTimeSensoringIot from "./real-time-sensoring-iot/config";
import eetacGo from "./eetac-go/config";
import mqttServer from "./mqtt-server/config";
import iotOpenPlatform from "./iot-open-platform-connectivity-solutions/config";
import planetSurvivor from "./planet-survivor/config";
import rsaServer from "./rsa-server/config";
import temperatureSensoring from "./temperature-sensoring/config";
import trafficFlowAi from "./traffic-flow-ai/config";

/**
 * Type-safe project references
 * Use these in showcases for autocomplete and type checking
 */
export const projects = {
  realTimeSensoringIot,
  eetacGo,
  mqttServer,
  iotOpenPlatform,
  planetSurvivor,
  rsaServer,
  temperatureSensoring,
  trafficFlowAi,
} as const;

export type ProjectKey = keyof typeof projects;
