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
            {items.map(({ name, proficiency }) => (
              <li key={name} className="skills-grid__item">
                <div className="skills-grid__item-heading">
                  <span className="skills-grid__name">{name}</span>
                  <span className="skills-grid__proficiency">{proficiency}%</span>
                </div>
                <div
                  className="skills-grid__progress"
                  role="progressbar"
                  aria-label={`${name} proficiency`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={proficiency}
                >
                  <span
                    className="skills-grid__progress-fill"
                    style={{ width: `${proficiency}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </GlowCard>
      ))}
    </div>
  );
}
