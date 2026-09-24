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

export type LinkedInProfile = {
  name: string;
  handle: string;
  headline: string;
  connections: string;
};

export type CompanyReference = {
  slug: string;
  limit?: number;
};

export type Showcase = {
  blog?: string[];
  projects?: string[];
  work?: CompanyReference[];
};
