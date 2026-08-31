import { CodeXml, ExternalLink } from "lucide-react";
import GlowCard from "../common/GlowCard";
import "./ProjectCard.css";

/**
 * Reusable project preview. Supply an image URL when a screenshot is
 * available; without one, the card displays a polished code placeholder.
 */
export default function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  technologies = [],
  liveUrl,
  repoUrl,
}) {
  const hasLinks = liveUrl || repoUrl;

  return (
    <GlowCard as="article" interactive className="project-card">
      <div className="project-card__media">
        {image ? (
          <img
            className="project-card__image"
            src={image}
            alt={imageAlt || `${title} project preview`}
            loading="lazy"
          />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true">
            <CodeXml size={32} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        {description && <p className="project-card__description">{description}</p>}

        {technologies.length > 0 && (
          <ul className="project-card__technologies" aria-label={`${title} technologies`}>
            {technologies.map((technology) => (
              <li key={technology} className="project-card__technology">
                {technology}
              </li>
            ))}
          </ul>
        )}

        {hasLinks && (
          <div className="project-card__links">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer">
                Live demo <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noreferrer">
                Source code <CodeXml size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </GlowCard>
  );
}
