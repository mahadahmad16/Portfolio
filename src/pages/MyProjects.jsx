import { ExternalLink, FolderGit2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionHeading from "../components/common/SectionHeading";
import GlowCard from "../components/common/GlowCard";
import Button from "../components/common/Button";
import { PROJECTS } from "../data/projects";
import "./MyProjects.css";

/**
 * Renders projects directly with GlowCard rather than assuming a
 * components/projects/ProjectCard API, since that folder was built
 * separately. Swap this page's markup for your own ProjectCard if
 * you'd rather use that instead — data/projects.js stays the same
 * either way.
 */
export default function MyProjects() {
  return (
    <div className="my-projects">
      <SectionHeading
        eyebrow="Work"
        title="My Projects"
        description="A few things I've built recently."
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
                <img src={project.image} alt={project.imageAlt || `${project.name} preview`} />
              ) : (
                <FolderGit2 size={28} strokeWidth={1.5} aria-hidden="true" />
              )}
            </div>

            <h3 className="my-projects__name">{project.name}</h3>
            <p className="my-projects__description">{project.description}</p>

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
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="secondary" icon={SiGithub}>
                  GitHub
                </Button>
              )}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
