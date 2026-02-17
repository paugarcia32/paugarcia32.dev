#!/usr/bin/env tsx
/**
 * Watch Frontmatter Script
 * Watches config.ts files and auto-syncs frontmatter on changes.
 * Supports new files added during dev without restarting.
 *
 * Usage: pnpm watch-frontmatter (runs automatically with pnpm dev)
 */

import chokidar from "chokidar";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

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
 * Main watcher — uses glob patterns directly so new files are picked up
 * without restarting the process.
 */
async function main() {
  console.log("👀 Watching config.ts files for changes...\n");

  const patterns = [
    "src/content/blog/**/config.ts",
    "src/content/projects/**/config.ts",
    "src/content/work/**/*.ts",
  ];

  const watcher = chokidar.watch(patterns, {
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
      console.log("✅ Watcher ready — monitoring config.ts files\n");
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
