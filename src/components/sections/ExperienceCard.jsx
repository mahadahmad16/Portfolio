import { Briefcase } from "lucide-react";
import GlowCard from "../common/GlowCard";
import "./ExperienceCard.css";

/**
 * Single experience entry — currently just the Web Era Solutions PK
 * internship, but takes props so more roles can be added later.
 */
export default function ExperienceCard({
  role = "Frontend Developer Intern",
  company = "Web Era Solutions PK",
  duration = "6 Weeks",
  description = "Completed two development tasks, built professional-looking websites, and prepared weekly progress reports.",
}) {
  return (
    <GlowCard as="article" className="experience-card">
      <span className="experience-card__icon" aria-hidden="true">
        <Briefcase size={20} strokeWidth={1.75} />
      </span>

      <div>
        <h3 className="experience-card__role">{role}</h3>
        <p className="experience-card__meta">
          {company} · {duration}
        </p>
        <p className="experience-card__description">{description}</p>
      </div>
    </GlowCard>
  );
}