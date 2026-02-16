#!/usr/bin/env tsx
/**
 * Watch Frontmatter Script
 * Watches config.ts files and auto-syncs frontmatter on changes
 *
 * Usage: pnpm watch-frontmatter (runs automatically with pnpm dev)
 */

import chokidar from "chokidar";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let syncInProgress = false;
let syncQueued = false;

/**
 * Run the sync script
 */
async function runSync() {
  if (syncInProgress) {
    syncQueued = true;
    return;
  }

  syncInProgress = true;

  try {
    console.log("\n🔄 Config changed, syncing frontmatter...");
    const { stdout } = await execAsync("pnpm sync-frontmatter");
    console.log(stdout);
  } catch (error) {
    console.error("❌ Error syncing frontmatter:", error);
  } finally {
    syncInProgress = false;

    // If another sync was queued while we were running, execute it
    if (syncQueued) {
      syncQueued = false;
      setTimeout(() => runSync(), 100);
    }
  }
}

/**
 * Debounce function to avoid multiple rapid syncs
 */
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const debouncedSync = debounce(runSync, 500);

/**
 * Main watcher
 */
async function main() {
  console.log("👀 Watching config.ts files for changes...\n");

  const projectRoot = path.join(__dirname, "..");

  // Find all config files using glob
  const patterns = [
    "src/content/blog/**/config.ts",
    "src/content/projects/**/config.ts",
    "src/content/work/**/*.ts",
  ];

  console.log("📁 Project root:", projectRoot);
  console.log("🔍 Finding files matching patterns...");

  const allFiles: string[] = [];
  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd: projectRoot });
    allFiles.push(...files);
    console.log(`   ${pattern} → ${files.length} files`);
  }

  console.log(`📄 Total files found: ${allFiles.length}\n`);

  if (allFiles.length === 0) {
    console.error("❌ No config files found! Check your patterns.");
    process.exit(1);
  }

  // Watch the actual files found
  const watcher = chokidar.watch(allFiles, {
    persistent: true,
    ignoreInitial: true,
    cwd: projectRoot,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  });

  watcher
    .on("ready", () => {
      const watched = watcher.getWatched();
      console.log("✅ Watcher is ready and monitoring files");
      console.log("📊 Watched directories:", Object.keys(watched).length);

      // Show some sample watched files
      let fileCount = 0;
      for (const [dir, files] of Object.entries(watched)) {
        fileCount += files.length;
        if (files.length > 0) {
          console.log(`   ${dir}:`);
          files.forEach((file) => console.log(`      - ${file}`));
        }
      }
      console.log(`📄 Total files being watched: ${fileCount}\n`);
    })
    .on("change", (filePath) => {
      console.log(`\n📝 ${filePath} changed`);
      debouncedSync();
    })
    .on("add", (filePath) => {
      console.log(`\n➕ ${filePath} added`);
      debouncedSync();
    })
    .on("error", (error) => {
      console.error("❌ Watcher error:", error);
    });

  // Keep the process running
  process.on("SIGINT", () => {
    console.log("\n\n👋 Stopping watcher...");
    watcher.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
