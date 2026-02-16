import type * as Types from "@types";
import { BLOG_POSTS } from "@content/blog/blog_data";
import { PROJECTS } from "@content/projects/projects_data_refs";
import { COMPANIES } from "@content/work/work_data";

/**
 * Homepage showcase configuration
 * Uses type-safe content references from data files
 * Order is determined by array position
 */
export const HOMEPAGE: Types.Showcase = {
  blog: [
    BLOG_POSTS.workCollection,
    BLOG_POSTS.projectsCollection,
    BLOG_POSTS.gettingStarted,
  ],
  projects: [
    PROJECTS.realTimeSensoringIot,
    PROJECTS.eetacGo,
    PROJECTS.mqttServer,
  ],
  work: [
    { company: COMPANIES.maat.company, limit: 2 },
  ],
};

/**
 * CV showcase configuration
 * Add more content when CV page is created
 */
export const CV: Types.Showcase = {
  projects: [
    PROJECTS.realTimeSensoringIot,
    // Add more projects when CV page is created
  ],
  work: [
    { company: COMPANIES.maat.company },
    // Add more work when CV page is created
  ],
};
