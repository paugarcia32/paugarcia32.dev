import { blogPosts } from "@content/blog";
import { projects } from "@content/projects";
import { companies } from "@content/work";
import type * as Types from "@types";

/**
 * Homepage showcase configuration
 * Uses type-safe content references with config.ts files
 * Order is determined by array position
 *
 * All imports have full autocomplete and type checking!
 */
export const HOMEPAGE: Types.Showcase = {
  blog: [
    blogPosts.workCollection,
    blogPosts.projectsCollection,
    blogPosts.gettingStarted,
  ],
  projects: [projects.iotOpenPlatform, projects.eetacGo, projects.mqttServer],
  work: [{ company: companies.maat.companyConfig.company, limit: 2 }],
};

/**
 * CV showcase configuration
 * Add more content when CV page is created
 */
export const CV: Types.Showcase = {
  projects: [
    projects.realTimeSensoringIot,
    // Add more projects when CV page is created
  ],
  work: [
    { company: companies.maat.companyConfig.company },
    // Add more work when CV page is created
  ],
};
