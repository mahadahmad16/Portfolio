import { Download } from "lucide-react";
import resumePdf from "../assets/Resume-Mahad-Ahmad.pdf";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import GlowCard from "../components/common/GlowCard";
import { useLanguage } from "../context/LanguageContext";
import "./Resume.css";

export default function Resume() {
  const { t } = useLanguage();
  return (
    <div className="resume">
      <SectionHeading
        eyebrow={t("resume.eyebrow")}
        title={t("resume.title")}
        description={t("resume.description")}
      />

      <GlowCard className="resume__card">
        <div className="resume__preview">
          <iframe src={resumePdf} title={t("resume.frameTitle")} className="resume__frame" />
        </div>

        <Button
          href={resumePdf}
          download="Resume-Mahad Ahmad.pdf"
          variant="primary"
          icon={Download}
        >
          {t("common.downloadResume")}
        </Button>
      </GlowCard>
    </div>
  );
}
