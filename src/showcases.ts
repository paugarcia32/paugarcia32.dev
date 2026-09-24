import type { Showcase } from "@types";

// Entries are referenced by their content folder, and checked against the
// collections when the pages are built. Order determines display order.
export const HOMEPAGE = {
  blog: ["vector-databases", "rest-api-design"],
  projects: ["pulse-notch", "iot-open-platform-connectivity-solutions"],
  work: [{ slug: "brickken", limit: 2 }],
} satisfies Showcase;

export const CV = {
  projects: ["real-time-sensoring-iot"],
  work: [{ slug: "maat" }],
} satisfies Showcase;
