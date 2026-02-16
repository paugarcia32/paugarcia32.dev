export type Site = {
  NAME: string;
  EMAIL: string;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

// Content reference types - can be either an object with slug or just the object itself
export type ContentReference = {
  readonly slug: string;
  readonly tags?: readonly string[];
};

export type ShowcaseItem = ContentReference;

export type CompanyReference = {
  company: string;
  limit?: number;
};

export type Showcase = {
  blog?: ShowcaseItem[];
  projects?: ShowcaseItem[];
  work?: CompanyReference[];
};
