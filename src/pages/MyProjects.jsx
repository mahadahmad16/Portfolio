import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, FolderGit2, Play, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionHeading from "../components/common/SectionHeading";
import GlowCard from "../components/common/GlowCard";
import Button from "../components/common/Button";
import { PROJECTS } from "../data/projects";
import { DESIGN_PROJECTS } from "../data/designProjects";
import "./MyProjects.css";

/**
 * Renders projects directly with GlowCard rather than assuming a
 * components/projects/ProjectCard API, since that folder was built
 * separately. Swap this page's markup for your own ProjectCard if
 * you'd rather use that instead — data/projects.js stays the same
 * either way.
 */
export default function MyProjects() {
  const [activeScreenshot, setActiveScreenshot] = useState(null);
  const [screenshotZoom, setScreenshotZoom] = useState(1);

  const openScreenshot = (screenshot) => {
    setScreenshotZoom(1);
    setActiveScreenshot(screenshot);
  };

  useEffect(() => {
    if (!activeScreenshot) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveScreenshot(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeScreenshot]);

  return (
    <div className="my-projects">
      <SectionHeading
        eyebrow="Work"
        title="My Projects"
        description=" // A few things I've built recently."
      />

      <section className="my-projects__category" aria-labelledby="development-projects">
        <h2 id="development-projects" className="my-projects__category-title">
          Development Projects
        </h2>

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
                  alt={project.imageAlt || `${project.name} preview`}
                />
              ) : (
                <span className="my-projects__preview-icon" aria-hidden="true">
                  <FolderGit2 size={28} strokeWidth={1.5} />
                </span>
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
              {project.video && (
                <Button
                  href={project.video}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  icon={Play}
                >
                  Video Demo
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
      </section>

      <section className="my-projects__category" aria-labelledby="designing-projects">
        <h2 id="designing-projects" className="my-projects__category-title">
          Designing Projects
        </h2>

        {DESIGN_PROJECTS.map((project) => (
          <GlowCard as="article" key={project.id} className="my-projects__design-card">
            <div className="my-projects__design-summary">
              <button
                type="button"
                className="my-projects__design-cover"
                onClick={() => openScreenshot({
                  ...(project.screenshots.find((screen) => screen.image === project.cover) ?? {
                    title: "Cover",
                    image: project.cover,
                  }),
                  projectName: project.name,
                })}
                aria-label={`View ${project.name} design`}
              >
                <img src={project.cover} alt={project.coverAlt} />
                <span>View {project.name} design</span>
              </button>

              <div>
                <h3 className="my-projects__name">{project.name}</h3>
                <p className="my-projects__description">{project.description}</p>
                <ul className="my-projects__tech" aria-label={`${project.name} tools`}>
                  {project.tools.map((tool) => (
                    <li key={tool} className="my-projects__tech-pill">{tool}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="my-projects__design-gallery" aria-label={`${project.name} screens`}>
              {project.screenshots.map((screen) => (
                <button
                  type="button"
                  className="my-projects__design-screen"
                  key={screen.id}
                  onClick={() => openScreenshot({ ...screen, projectName: project.name })}
                  aria-label={`View ${screen.title} screen`}
                >
                  <img src={screen.image} alt={`${project.name}: ${screen.title}`} loading="lazy" />
                </button>
              ))}
            </div>
          </GlowCard>
        ))}
      </section>

      {activeScreenshot &&
        createPortal(
          <div
            className="my-projects__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeScreenshot.projectName}: ${activeScreenshot.title}`}
            onWheel={(event) => {
              event.preventDefault();
              const zoomFactor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
              setScreenshotZoom((zoom) => Math.min(5, Math.max(1, zoom * zoomFactor)));
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveScreenshot(null);
            }}
          >
            <button
              type="button"
              className="my-projects__lightbox-close"
              onClick={() => setActiveScreenshot(null)}
              aria-label="Close"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <img
              src={activeScreenshot.image}
              alt={`${activeScreenshot.projectName}: ${activeScreenshot.title}`}
              className="my-projects__lightbox-image"
              style={{ transform: `scale(${screenshotZoom})` }}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
