import { GraduationCap } from "lucide-react";
import GlowCard from "../common/GlowCard";
import "./EducationCard.css";

export default function EducationCard({
  institution = "GIFT University",
  degree = "BS Computer Science",
  duration = "2023–2027",
  cgpa,
  marks,
  Marks: legacyMarks,
}) {
  const result = cgpa
    ? `Current CGPA: ${cgpa}`
    : marks || legacyMarks
      ? `Marks: ${marks || legacyMarks}`
      : null;

  return (
    <GlowCard as="article" className="education-card">
      <span className="education-card__icon" aria-hidden="true">
        <GraduationCap size={20} strokeWidth={1.75} />
      </span>

      <div>
        <h3 className="education-card__institution">{institution}</h3>
        <p className="education-card__degree">{degree}</p>
        <p className="education-card__duration">{duration}</p>
        {result && <p className="education-card__result">{result}</p>}
      </div>
    </GlowCard>
  );
}
