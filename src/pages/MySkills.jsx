import SectionHeading from "../components/common/SectionHeading";
import SkillsGrid from "../components/sections/SkillsGrid";
import { useLanguage } from "../context/LanguageContext";
import "./MySkills.css";

export default function MySkills() {
  const { t } = useLanguage();
  return (
    <div className="my-skills">
      <SectionHeading
        eyebrow={t("skills.eyebrow")}
        title={t("skills.title")}
        description={t("skills.description")}
      />
      <SkillsGrid />
    </div>
  );
}
