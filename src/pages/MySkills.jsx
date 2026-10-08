import SectionHeading from "../components/common/SectionHeading";
import SkillsGrid from "../components/sections/SkillsGrid";
import "./MySkills.css";

export default function MySkills() {
  return (
    <div className="my-skills">
      <SectionHeading
        eyebrow="Skills"
        title="My Skills"
        description="A snapshot of my current proficiency across the tools and technologies I use."
      />
      <SkillsGrid />
    </div>
  );
}
