import { Download } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import GlowCard from "../components/common/GlowCard";
import { useLanguage } from "../context/LanguageContext";
import "./Resume.css";

/**
 * Expects a real file at public/resume.pdf — both the preview iframe
 * and the download button point there. Until that file exists, the
 * preview will just show empty/broken.
 */
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
          <iframe src="/Resume-Mahad-Ahmad.pdf" title={t("resume.frameTitle")} className="resume__frame" />
        </div>

        <Button
          href="/Resume-Mahad-Ahmad.pdf"
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
