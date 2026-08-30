import GlowCard from "../common/GlowCard";
import "./SkillsGrid.css";

// TODO: move to src/data/skills.js once the data/ folder is built
const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    items: ["React", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express"],
  },
  {
    category: "Database",
    items: ["MongoDB"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Figma", "VS Code", "Canva"],
  },
];

/**
 * Skills grouped into cards by category, matching the brief's
 * Frontend / Backend / Database / Tools breakdown.
 */
export default function SkillsGrid() {
  return (
    <div className="skills-grid">
      {SKILL_CATEGORIES.map(({ category, items }) => (
        <GlowCard as="article" key={category} className="skills-grid__card">
          <h3 className="skills-grid__category">{category}</h3>
          <ul className="skills-grid__list">
            {items.map((item) => (
              <li key={item} className="skills-grid__pill">
                {item}
              </li>
            ))}
          </ul>
        </GlowCard>
      ))}
    </div>
  );
}