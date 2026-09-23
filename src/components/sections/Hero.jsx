// import resume from "../../assets/certificates/CV.pdf";
import { FolderGit2, Mail, Download } from "lucide-react";
import Button from "../common/Button";
import TypingText from "../common/TypingText";
import { useLanguage } from "../../context/LanguageContext";
import "./Hero.css";

/**
 * Landing block for the About Me page: name, cycling role title,
 * tagline, and the three primary CTAs from the brief.
 */
export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <h1 className="hero__name">Mahad Ahmad</h1>

      <p className="hero__role">
        <TypingText words={t("hero.roles")} />
      </p>

      <p className="hero__tagline">
        {t("hero.tagline")}
      </p>

      <div className="hero__actions">
        <Button to="/projects" variant="primary" icon={FolderGit2}>
          {t("hero.viewWork")}
        </Button>
        <Button to="/contact" variant="secondary" icon={Mail}>
          {t("hero.contactMe")}
        </Button>
        <Button
          href="/Resume-Mahad-Ahmad.pdf"
          download="Resume-Mahad Ahmad.pdf"
          variant="secondary"
          icon={Download}
        >
          {t("common.downloadResume")}
        </Button>
      </div>
    </section>
  );
}
