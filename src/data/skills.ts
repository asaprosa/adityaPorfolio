import {
  siSelenium,
  siTypescript,
  siJavascript,
  siNodedotjs,
  siPostgresql,
  siReact,
  siAngular,
  siVite,
  siPostman,
  siK6,
  siVercel,
  siClaude,
  siGooglegemini,
  siLinux,
  siGit,
  siGithubactions,
  siTrello,
  type SimpleIcon,
} from "simple-icons";
import type { LucideIcon } from "lucide-react";
import {
  TestTube,
  Layers,
  Webhook,
  Boxes,
  Cpu,
  Shuffle,
  SlidersHorizontal,
  ShieldAlert,
  Kanban,
} from "lucide-react";

export type Skill = {
  name: string;
  brandIcon?: SimpleIcon;
  fallbackIcon?: LucideIcon;
};

// Flat, curated list for the skills marquee. Real brand logos where one exists;
// a generic icon for concepts/practices that don't have a product logo.
export const skills: Skill[] = [
  { name: "Playwright", fallbackIcon: TestTube },
  { name: "Selenium WebDriver", brandIcon: siSelenium },
  { name: "Page Object Model", fallbackIcon: Layers },
  { name: "TypeScript", brandIcon: siTypescript },
  { name: "JavaScript", brandIcon: siJavascript },
  { name: "Node.js", brandIcon: siNodedotjs },
  { name: "PostgreSQL", brandIcon: siPostgresql },
  { name: "React", brandIcon: siReact },
  { name: "Angular", brandIcon: siAngular },
  { name: "Vite", brandIcon: siVite },
  { name: "Postman", brandIcon: siPostman },
  { name: "REST API Automation", fallbackIcon: Webhook },
  { name: "k6 Load Testing", brandIcon: siK6 },
  { name: "Vercel Serverless", brandIcon: siVercel },
  { name: "Model Context Protocol", fallbackIcon: Boxes },
  { name: "Groq / Llama 3.3", fallbackIcon: Cpu },
  { name: "Claude", brandIcon: siClaude },
  { name: "Gemini", brandIcon: siGooglegemini },
  { name: "Multi-Model Fallbacks", fallbackIcon: Shuffle },
  { name: "Prompt Calibration", fallbackIcon: SlidersHorizontal },
  { name: "Linux/SSH", brandIcon: siLinux },
  { name: "Git", brandIcon: siGit },
  { name: "GitHub Actions CI/CD", brandIcon: siGithubactions },
  { name: "Secrets Remediation", fallbackIcon: ShieldAlert },
  { name: "Trello", brandIcon: siTrello },
  { name: "Agile/Scrum", fallbackIcon: Kanban },
];
