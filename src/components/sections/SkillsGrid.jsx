import GlowCard from "../common/GlowCard";
import { SKILL_CATEGORIES } from "../../data/skills";
import "./SkillsGrid.css";

/**
 * Skills grouped into cards by category, matching the brief's
 * Frontend / Backend / Database / Tools breakdown. Data lives in
 * src/data/skills.js.
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