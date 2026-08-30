import { FolderGit2, Mail, Download } from "lucide-react";
import Button from "../common/Button";
import TypingText from "../common/TypingText";
import "./Hero.css";

const ROLES = ["MERN Stack Developer", "UI/UX Designer"];

/**
 * Landing block for the About Me page: name, cycling role title,
 * tagline, and the three primary CTAs from the brief.
 */
export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__name">Mahad Ahmad</h1>

      <p className="hero__role">
        <TypingText words={ROLES} />
      </p>

      <p className="hero__tagline">
        I build modern web applications and intuitive digital experiences.
      </p>

      <div className="hero__actions">
        <Button to="/projects" variant="primary" icon={FolderGit2}>
          View My Work
        </Button>
        <Button to="/contact" variant="secondary" icon={Mail}>
          Contact Me
        </Button>
        <Button href="/resume.pdf" download variant="secondary" icon={Download}>
          Download Resume
        </Button>
      </div>
    </section>
  );
}