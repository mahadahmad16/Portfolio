import SectionHeading from "../components/common/SectionHeading";
import EducationCard from "../components/sections/EducationCard";
import ExperienceCard from "../components/sections/ExperienceCard";
import { useLanguage } from "../context/LanguageContext";
import "./Qualifications.css";

export default function Qualifications() {
  const { t } = useLanguage();
  const education = t("qualifications.educationEntries");
  const experience = t("qualifications.experienceEntries");
  return (
    <div className="qualifications">
      <SectionHeading
        eyebrow={t("qualifications.eyebrow")}
        title={t("qualifications.title")}
        description={t("qualifications.description")}
      />

      <section className="qualifications__group">
        <h2 className="qualifications__group-title">{t("qualifications.education")}</h2>
        <div className="qualifications__cards">
          {education.map((entry) => (
            <EducationCard key={entry.institution} {...entry} />
          ))}
        </div>
      </section>

      <section className="qualifications__group">
        <h2 className="qualifications__group-title">{t("qualifications.experience")}</h2>
        <div className="qualifications__cards">
          {experience.map((entry) => (
            <ExperienceCard key={entry.company} {...entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
