import SectionHeading from "../components/common/SectionHeading";
import EducationCard from "../components/sections/EducationCard";
import ExperienceCard from "../components/sections/ExperienceCard";
import { EDUCATION } from "../data/education";
import { EXPERIENCE } from "../data/experience";
import "./Qualifications.css";

export default function Qualifications() {
  return (
    <div className="qualifications">
      <SectionHeading
        eyebrow="Qualifications"
        title="Education & Experience"
        description="A quick look at where I've studied and worked so far."
      />

      <section className="qualifications__group">
        <h2 className="qualifications__group-title">Education</h2>
        <div className="qualifications__cards">
          {EDUCATION.map((entry) => (
            <EducationCard key={entry.institution} {...entry} />
          ))}
        </div>
      </section>

      <section className="qualifications__group">
        <h2 className="qualifications__group-title">Experience</h2>
        <div className="qualifications__cards">
          {EXPERIENCE.map((entry) => (
            <ExperienceCard key={entry.company} {...entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
