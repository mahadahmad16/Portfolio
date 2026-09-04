import CV from "../assets/certificates/resume.pdf"
import { Download } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import GlowCard from "../components/common/GlowCard";
import "./Resume.css";

/**
 * Expects a real file at public/resume.pdf — both the preview iframe
 * and the download button point there. Until that file exists, the
 * preview will just show empty/broken.
 */
export default function Resume() {
  return (
    <div className="resume">
      <SectionHeading
        eyebrow="Resume"
        title="Resume"
        description="View it below, or download a copy to keep."
      />

      <GlowCard className="resume__card">
        <div className="resume__preview">
          <iframe src={CV} title="Mahad Ahmad's resume" className="resume__frame" />
        </div>

        <Button
          href={CV}
          download="Resume-Mahad-Ahmad.pdf"
          variant="primary"
          icon={Download}
        >
          Download Resume
        </Button>
      </GlowCard>
    </div>
  );
}