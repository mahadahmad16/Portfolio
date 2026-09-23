import GlowCard from "../common/GlowCard";
import { SKILL_CATEGORIES } from "../../data/skills";
import { useLanguage } from "../../context/LanguageContext";
import "./SkillsGrid.css";

/**
 * Skills grouped into cards by category, matching the brief's
 * Frontend / Backend / Database / Tools breakdown. Data lives in
 * src/data/skills.js.
 */
export default function SkillsGrid() {
  const { t } = useLanguage();
  const categoryKeys = { Frontend: "skills.frontend", Backend: "skills.backend", Database: "skills.database", Tools: "skills.tools" };
  return (
    <div className="skills-grid">
      {SKILL_CATEGORIES.map(({ category, items }) => (
        <GlowCard as="article" key={category} className="skills-grid__card">
          <h3 className="skills-grid__category">{t(categoryKeys[category])}</h3>
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
