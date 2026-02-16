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

// Content configuration types - type-safe metadata for content

export type BlogPostConfig = {
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly draft?: boolean;
  readonly tags: readonly string[];
};

export type ProjectConfig = {
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly draft?: boolean;
  readonly tags: readonly string[];
  readonly demoURL?: string;
  readonly repoURL?: string;
};

export type WorkPositionConfig = {
  readonly role: string;
  readonly description: string;
  readonly dateStart: Date;
  readonly dateEnd: Date | string;
  readonly tags: readonly string[];
};

export type WorkCompanyConfig = {
  readonly company: string;
  readonly url?: string;
};

// Content items with config + markdown content
export type BlogPost = {
  readonly slug: string;
  readonly config: BlogPostConfig;
  readonly content: string;
  readonly compiledContent: () => Promise<string>;
};

export type Project = {
  readonly slug: string;
  readonly config: ProjectConfig;
  readonly content: string;
  readonly compiledContent: () => Promise<string>;
};

export type WorkPosition = {
  readonly slug: string;
  readonly companySlug: string;
  readonly config: WorkPositionConfig;
  readonly content: string;
  readonly compiledContent: () => Promise<string>;
};

export type WorkCompany = {
  readonly slug: string;
  readonly config: WorkCompanyConfig;
  readonly positions: WorkPosition[];
};

// Content reference types for showcases
export type BlogPostReference = {
  readonly slug: string;
  readonly config: BlogPostConfig;
};

export type ProjectReference = {
  readonly slug: string;
  readonly config: ProjectConfig;
};

export type ContentReference = BlogPostReference | ProjectReference;

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
