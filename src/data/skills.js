
import {
  SiBootstrap,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Palette } from "lucide-react";

export const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    items: [
      { name: "React", icons: [SiReact] },
      { name: "JavaScript", icons: [SiJavascript] },
      { name: "TypeScript", icons: [SiTypescript] },
      { name: "Bootstrap", icons: [SiBootstrap]},
      { name: "Tailwind", icons: [SiTailwindcss] },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Python", icons: [SiPython] },
      { name: "FastAPI", icons: [SiFastapi] },
      { name: "Node.js", icons: [SiNodedotjs] },
      { name: "Express.js", icons: [SiExpress] },
      { name: "PHP", icons: [SiPhp] },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icons: [SiPostgresql] },
      { name: "MongoDB", icons: [SiMongodb] },
      { name: "MySQL", icons: [SiMysql] },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Figma", icons: [SiFigma] },
      { name: "Postman", icons: [SiPostman] },
      { name: "Git", icons: [SiGit, ]},
      { name: "Github", icons: [SiGithub]},
      { name: "Canva", icons: [Palette] },
    ],
  },
];
