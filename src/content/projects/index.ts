/**
 * Centralized projects exports
 * Import configs and create type-safe references
 */

import eetacGo from "./eetac-go/config";
import fullMobileRedesign from "./full-mobile-redesign/config";
import iotOpenPlatform from "./iot-open-platform-connectivity-solutions/config";
import planetSurvivor from "./planet-survivor/config";
// Import all project configs (default exports)
import realTimeSensoringIot from "./real-time-sensoring-iot/config";
import trafficFlowAi from "./traffic-flow-ai/config";

/**
 * Type-safe project references
 * Use these in showcases for autocomplete and type checking
 */
export const projects = {
  realTimeSensoringIot,
  eetacGo,
  fullMobileRedesign,
  iotOpenPlatform,
  planetSurvivor,
  trafficFlowAi,
} as const;

export type ProjectKey = keyof typeof projects;
