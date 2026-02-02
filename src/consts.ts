import type * as Types from "@types";

export const SITE: Types.Site = {
  NAME: "paugarcia32",
  EMAIL: "paugarcia32@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Types.Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "paugarcia32.dev is a minimal and lightweight blog and portfolio.",
};

export const BLOG: Types.Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Types.Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Types.Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Types.Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://twitter.com/markhorn_dev",
  },
  {
    NAME: "github",
    HREF: "https://github.com/paugarcia32",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/paugarcia32",
  },
];
