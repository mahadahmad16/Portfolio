import SectionHeading from "../components/common/SectionHeading";
import SkillsGrid from "../components/sections/SkillsGrid";
import "./MySkills.css";

export default function MySkills() {
  return (
    <div className="my-skills">
      <SectionHeading
        eyebrow="Skills"
        title="My Skills"
        description="Technologies and tools I work with, grouped by area."
      />
      <SkillsGrid />
    </div>
  );
}
