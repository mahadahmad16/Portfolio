import { GraduationCap } from "lucide-react";
import GlowCard from "../common/GlowCard";
import "./EducationCard.css";

/**
 * Single education entry — currently just GIFT University, but takes
 * props so more entries can be added later without touching the markup.
 */
export default function EducationCard({
  institution = "GIFT University",
  degree = "BS Computer Science",
  duration = "2023–2027",
  cgpa = "3.17",
}) {
  return (
    <GlowCard as="article" className="education-card">
      <span className="education-card__icon" aria-hidden="true">
        <GraduationCap size={20} strokeWidth={1.75} />
      </span>

      <div>
        <h3 className="education-card__institution">{institution}</h3>
        <p className="education-card__degree">{degree}</p>
        <p className="education-card__duration">{duration}</p>
        <p className="education-card__cgpa">Current CGPA: {cgpa}</p>
      </div>
    </GlowCard>
  );
}