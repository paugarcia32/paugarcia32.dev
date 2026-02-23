#!/usr/bin/env tsx

/**
 * Create Content Script
 * Interactive script to create new blog posts, projects, or work experience
 *
 * Usage: pnpm create-content
 */

import { checkbox, confirm, input, select } from "@inquirer/prompts";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import * as TAGS from "../src/tags.js";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "../src/content");

// Extract all tag values
const allTags = Object.entries(TAGS)
  .filter(([key]) => key !== "Tag") // Exclude the type export
  .map(([key, value]) => ({
    name: `${value} (${key})`,
    value: key, // Store the constant name (e.g., "PYTHON")
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// type ContentType = "blog" | "projects" | "work";

/**
 * Format date to "Mon DD YYYY" format
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format date to dd/mm/yyyy format
 */
function formatDateDDMMYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Convert string to slug format
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Create blog post
 */
async function createBlogPost() {
  console.log("\n📝 Creating new blog post\n");

  const title = await input({
    message: "Title:",
    validate: (value) => value.length > 0 || "Title is required",
  });

  const slug = await input({
    message: "Slug:",
    default: slugify(title),
    validate: (value) => {
      if (value.length === 0) return "Slug is required";
      const postDir = path.join(contentDir, "blog", value);
      if (fs.existsSync(postDir))
        return "A blog post with this slug already exists";
      return true;
    },
  });

  const description = await input({
    message: "Description:",
    default: "",
  });

  const dateInput = await input({
    message: "Date (YYYY-MM-DD or leave empty for today):",
    default: "",
  });
  const date = dateInput ? new Date(dateInput) : new Date();

  const draft = await confirm({
    message: "Is this a draft?",
    default: false,
  });

  const selectedTags = await checkbox({
    message: "Select tags (use space to select, enter to confirm):",
    choices: allTags,
    pageSize: 15,
  });

  const fileFormat = await select({
    message: "File format:",
    choices: [
      { name: "Markdown (.md)", value: "md" },
      { name: "MDX (.mdx)", value: "mdx" },
    ],
    default: "md",
  });

  // Create directory
  const postDir = path.join(contentDir, "blog", slug);
  fs.mkdirSync(postDir, { recursive: true });

  // Create config.ts
  const tagsImport = selectedTags.map((tag) => `TAGS.${tag}`).join(", ");
  const configContent = `import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "${slug}",
  config: {
    title: "${title}",
    description: "${description}",
    date: new Date("${date.toISOString().split("T")[0]}"),
    draft: ${draft},
    tags: [${tagsImport}],
  },
} as const satisfies BlogPostReference;
`;

  fs.writeFileSync(path.join(postDir, "config.ts"), configContent);

  // Create index.md/mdx with minimal frontmatter
  const indexContent = `---
title: "${title}"
description: "${description}"
date: "${formatDate(date)}"
${draft ? "draft: true" : ""}
tags: [${selectedTags.map((tag) => `"${TAGS[tag as keyof typeof TAGS]}"`).join(", ")}]
---

# ${title}

Your content here...
`;

  fs.writeFileSync(path.join(postDir, `index.${fileFormat}`), indexContent);

  console.log(`\n✅ Blog post created at: src/content/blog/${slug}`);
  console.log(`   - config.ts`);
  console.log(`   - index.${fileFormat}`);

  // Run sync script
  console.log("\n🔄 Syncing frontmatter...");
  await execAsync("pnpm sync-frontmatter");

  console.log(
    "\n✨ Done! Don't forget to add the post to src/content/blog/index.ts",
  );
}

/**
 * Create project
 */
async function createProject() {
  console.log("\n🚀 Creating new project\n");

  const title = await input({
    message: "Title:",
    validate: (value) => value.length > 0 || "Title is required",
  });

  const slug = await input({
    message: "Slug:",
    default: slugify(title),
    validate: (value) => {
      if (value.length === 0) return "Slug is required";
      const projectDir = path.join(contentDir, "projects", value);
      if (fs.existsSync(projectDir))
        return "A project with this slug already exists";
      return true;
    },
  });

  const description = await input({
    message: "Description:",
    default: "",
  });

  const dateInput = await input({
    message: "Date (YYYY-MM-DD or leave empty for today):",
    default: "",
  });
  const date = dateInput ? new Date(dateInput) : new Date();

  const demoURL = await input({
    message: "Demo URL (optional):",
    default: "",
  });

  const repoURL = await input({
    message: "Repository URL (optional):",
    default: "",
  });

  const draft = await confirm({
    message: "Is this a draft?",
    default: false,
  });

  // Build work position choices from filesystem
  const workDir = path.join(contentDir, "work");
  const workPositionChoices: { name: string; value: string }[] = [];
  if (fs.existsSync(workDir)) {
    const companies = fs
      .readdirSync(workDir)
      .filter((d) => fs.statSync(path.join(workDir, d)).isDirectory());
    for (const company of companies) {
      const files = fs.readdirSync(path.join(workDir, company));
      for (const file of files) {
        if (file === "company.ts" || file === "company.md" || !file.endsWith(".md")) continue;
        const positionSlug = file.replace(".md", "");
        workPositionChoices.push({
          name: `${company}/${positionSlug}`,
          value: `${company}/${positionSlug}`,
        });
      }
    }
  }

  let workPosition = "";
  if (workPositionChoices.length > 0) {
    const linkToWork = await confirm({
      message: "Link this project to a work position?",
      default: false,
    });
    if (linkToWork) {
      workPosition = await select({
        message: "Select work position:",
        choices: [
          { name: "(none)", value: "" },
          ...workPositionChoices,
        ],
      });
    }
  }

  const selectedTags = await checkbox({
    message: "Select tags (use space to select, enter to confirm):",
    choices: allTags,
    pageSize: 15,
  });

  const fileFormat = await select({
    message: "File format:",
    choices: [
      { name: "Markdown (.md)", value: "md" },
      { name: "MDX (.mdx)", value: "mdx" },
    ],
    default: "md",
  });

  // Create directory
  const projectDir = path.join(contentDir, "projects", slug);
  fs.mkdirSync(projectDir, { recursive: true });

  // Create config.ts
  const tagsImport = selectedTags.map((tag) => `TAGS.${tag}`).join(", ");
  const configContent = `import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "${slug}",
  config: {
    title: "${title}",
    description: "${description}",
    date: new Date("${date.toISOString().split("T")[0]}"),
    draft: ${draft},${demoURL ? `\n    demoURL: "${demoURL}",` : ""}${repoURL ? `\n    repoURL: "${repoURL}",` : ""}${workPosition ? `\n    workPosition: "${workPosition}",` : ""}
    tags: [${tagsImport}],
  },
} as const satisfies ProjectReference;
`;

  fs.writeFileSync(path.join(projectDir, "config.ts"), configContent);

  // Create index.md/mdx
  const indexContent = `---
title: "${title}"
description: "${description}"
date: "${formatDate(date)}"
${draft ? "draft: true" : ""}${demoURL ? `\ndemoURL: "${demoURL}"` : ""}${repoURL ? `\nrepoURL: "${repoURL}"` : ""}${workPosition ? `\nworkPosition: "${workPosition}"` : ""}
tags: [${selectedTags.map((tag) => `"${TAGS[tag as keyof typeof TAGS]}"`).join(", ")}]
---

# ${title}

Your content here...
`;

  fs.writeFileSync(path.join(projectDir, `index.${fileFormat}`), indexContent);

  console.log(`\n✅ Project created at: src/content/projects/${slug}`);
  console.log(`   - config.ts`);
  console.log(`   - index.${fileFormat}`);

  // Run sync script
  console.log("\n🔄 Syncing frontmatter...");
  await execAsync("pnpm sync-frontmatter");

  console.log(
    "\n✨ Done! Don't forget to add the project to src/content/projects/index.ts",
  );
}

/**
 * Create work position
 */
async function createWork() {
  console.log("\n💼 Creating new work position\n");

  const company = await input({
    message: "Company name:",
    validate: (value) => value.length > 0 || "Company name is required",
  });

  const companySlug = slugify(company);
  const companyDir = path.join(contentDir, "work", companySlug);

  // Check if company exists, if not create it
  if (!fs.existsSync(companyDir)) {
    const createCompany = await confirm({
      message: `Company "${company}" doesn't exist. Create it?`,
      default: true,
    });

    if (createCompany) {
      fs.mkdirSync(companyDir, { recursive: true });

      const companyURL = await input({
        message: "Company URL (optional):",
        default: "",
      });

      // Create company.ts
      const companyConfigContent = `export const config = {
  company: "${company}",${companyURL ? `\n  url: "${companyURL}",` : ""}
};
`;

      fs.writeFileSync(
        path.join(companyDir, "company.ts"),
        companyConfigContent,
      );

      // Create company.md
      const companyMdContent = `---
type: "company"
company: "${company}"${companyURL ? `\nurl: "${companyURL}"` : ""}
---
`;

      fs.writeFileSync(path.join(companyDir, "company.md"), companyMdContent);

      console.log(`\n✅ Company created: ${company}`);
    } else {
      console.log("\n❌ Cannot create position without company. Exiting.");
      return;
    }
  }

  const role = await input({
    message: "Role/Position:",
    validate: (value) => value.length > 0 || "Role is required",
  });

  const positionSlug = await input({
    message: "Position slug:",
    default: slugify(role),
    validate: (value) => {
      if (value.length === 0) return "Slug is required";
      const positionPath = path.join(companyDir, `${value}.ts`);
      if (fs.existsSync(positionPath))
        return "A position with this slug already exists";
      return true;
    },
  });

  const description = await input({
    message: "Description:",
    default: "",
  });

  const dateStartInput = await input({
    message: "Start date (YYYY-MM-DD):",
    validate: (value) => {
      if (!value) return "Start date is required";
      if (isNaN(Date.parse(value))) return "Invalid date format";
      return true;
    },
  });
  const dateStart = new Date(dateStartInput);

  const isCurrentPosition = await confirm({
    message: "Is this your current position?",
    default: false,
  });

  let dateEnd: Date | string;
  if (isCurrentPosition) {
    dateEnd = "Present";
  } else {
    const dateEndInput = await input({
      message: "End date (YYYY-MM-DD):",
      validate: (value) => {
        if (!value) return "End date is required";
        if (isNaN(Date.parse(value))) return "Invalid date format";
        return true;
      },
    });
    dateEnd = new Date(dateEndInput);
  }

  const selectedTags = await checkbox({
    message: "Select tags (use space to select, enter to confirm):",
    choices: allTags,
    pageSize: 15,
  });

  // Create position config
  const tagsImport = selectedTags.map((tag) => `TAGS.${tag}`).join(", ");
  const positionConfigContent = `import * as TAGS from "@/tags";

export const config = {
  role: "${role}",
  description: "${description}",
  dateStart: new Date("${dateStart.toISOString().split("T")[0]}"),
  dateEnd: ${dateEnd === "Present" ? `"Present"` : `new Date("${(dateEnd as Date).toISOString().split("T")[0]}")`},
  tags: [${tagsImport}],
};
`;

  fs.writeFileSync(
    path.join(companyDir, `${positionSlug}.ts`),
    positionConfigContent,
  );

  // Create position markdown
  const positionMdContent = `---
type: "position"
role: "${role}"
dateStart: "${formatDateDDMMYYYY(dateStart)}"
dateEnd: "${dateEnd === "Present" ? "Present" : formatDateDDMMYYYY(dateEnd as Date)}"
description: "${description}"
tags: [${selectedTags.map((tag) => `"${TAGS[tag as keyof typeof TAGS]}"`).join(", ")}]
---

Your work description here...
`;

  fs.writeFileSync(
    path.join(companyDir, `${positionSlug}.md`),
    positionMdContent,
  );

  console.log(`\n✅ Work position created at: src/content/work/${companySlug}`);
  console.log(`   - ${positionSlug}.ts`);
  console.log(`   - ${positionSlug}.md`);

  // Run sync script
  console.log("\n🔄 Syncing frontmatter...");
  await execAsync("pnpm sync-frontmatter");

  console.log("\n✨ Done!");
}

/**
 * Main function
 */
async function main() {
  console.log("\n🎨 Content Creator\n");

  const contentType = await select({
    message: "What would you like to create?",
    choices: [
      { name: "📝 Blog Post", value: "blog" },
      { name: "🚀 Project", value: "projects" },
      { name: "💼 Work Experience", value: "work" },
    ],
  });

  switch (contentType) {
    case "blog":
      await createBlogPost();
      break;
    case "projects":
      await createProject();
      break;
    case "work":
      await createWork();
      break;
  }
}

main().catch((error) => {
  console.error("\n❌ Error:", error.message);
  process.exit(1);
});
