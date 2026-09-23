import { ExternalLink, FolderGit2, Play } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionHeading from "../components/common/SectionHeading";
import GlowCard from "../components/common/GlowCard";
import Button from "../components/common/Button";
import { PROJECTS } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import "./MyProjects.css";

/**
 * Renders projects directly with GlowCard rather than assuming a
 * components/projects/ProjectCard API, since that folder was built
 * separately. Swap this page's markup for your own ProjectCard if
 * you'd rather use that instead — data/projects.js stays the same
 * either way.
 */
export default function MyProjects() {
  const { t } = useLanguage();
  const projectKeys = { QuickBite: "quickbite", FitMember: "fitmember", "Al-Dhaw-Al-Wahaj": "alDhawAlWahaj", CodeSync: "codesync" };
  return (
    <div className="my-projects">
      <SectionHeading
        eyebrow={t("projects.eyebrow")}
        title={t("projects.title")}
        description={t("projects.description")}
      />

      <div className="my-projects__grid">
        {PROJECTS.map((project) => (
          <GlowCard
            as="article"
            interactive
            key={project.name}
            className="my-projects__card"
          >
            <div className="my-projects__preview">
              {project.image ? (
                <img
                  src={project.image}
                  alt={t(`projects.${projectKeys[project.name]}.imageAlt`) || t("projects.preview", { name: project.name })}
                />
              ) : (
                <span className="my-projects__preview-icon" aria-hidden="true">
                  <FolderGit2 size={28} strokeWidth={1.5} />
                </span>
              )}
            </div>

            <h3 className="my-projects__name">{project.name}</h3>
            <p className="my-projects__description">{t(`projects.${projectKeys[project.name]}.description`)}</p>

            {project.technologies?.length > 0 && (
              <ul className="my-projects__tech">
                {project.technologies.map((tech) => (
                  <li key={tech} className="my-projects__tech-pill">
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            <div className="my-projects__actions">
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="primary" icon={ExternalLink}>
                  {t("common.liveDemo")}
                </Button>
              )}
              {project.video && (
                <Button
                  href={project.video}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  icon={Play}
                >
                  {t("common.videoDemo")}
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="secondary" icon={SiGithub}>
                  {t("common.github")}
                </Button>
              )}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
