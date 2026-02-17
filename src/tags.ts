/**
 * Centralized tag definitions
 * Use these constants to ensure consistency across content
 */

// Languages
export const PYTHON = "Python";
export const JAVASCRIPT = "JavaScript";
export const TYPESCRIPT = "TypeScript";
export const JAVA = "Java";
export const CPP = "C++";

// Frameworks & Libraries - Frontend
export const REACT = "React";
export const ANGULAR = "Angular";
export const NEXTJS = "NextJS";
export const ASTRO = "Astro";
export const FLUTTER = "Flutter";
export const UNITY = "Unity";

// Frameworks & Libraries - Backend
export const EXPRESS = "Express.js";
export const NESTJS = "NestJS";
export const FLASK = "Flask";

// Databases
export const MONGODB = "MongoDB";
export const POSTGRESQL = "PostgreSQL";
export const MARIADB = "MariaDB";

// IoT & Hardware
export const IOT = "IoT";
export const ESP32 = "ESP32";
export const ARDUINO = "Arduino";
export const RASPBERRY_PI = "Raspberry Pi";
export const LORA = "LoRa";
export const BLE = "BLE";
export const MQTT = "MQTT";

// AI & Machine Learning
export const AI = "AI";
export const YOLOV10 = "YOLOv10";

// Topics & Skills
export const CYBERSECURITY = "Cybersecurity";
export const FULL_STACK = "Full Stack";
export const MOBILE_DEVELOPMENT = "Mobile Development";
export const WEB_DEVELOPMENT = "Web Development";
export const TEAMWORK = "Teamwork";

// Content & Documentation
export const TUTORIAL = "Tutorial";
export const CONTENT_COLLECTIONS = "Content Collections";
export const MARKDOWN = "Markdown";
export const MDX = "MDX";
export const WRITING = "Writing";
export const DOCUMENTATION = "Documentation";
export const PORTFOLIO = "Portfolio";
export const CAREER = "Career";

// Project Management
export const PROJECT_MANAGEMENT = "project-management";
export const LESSONS_LEARNED = "lessons-learned";
export const DEVELOPMENT = "development";

// Tools
export const POWER_BI = "Power BI";

// Derive Tag type from the exported constants — stays in sync automatically
// when new constants are added.
type StringValues<T> = { [K in keyof T]: T[K] extends string ? T[K] : never }[keyof T];
export type Tag = StringValues<typeof import("./tags")>;
