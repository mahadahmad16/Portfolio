import ProjectCard from "./ProjectCard";
import "./ProjectGrid.css";

/**
 * Responsive collection of project cards. The data stays outside this
 * component so the same grid can be used for featured or complete projects.
 */
export default function ProjectGrid({
  projects = [],
  emptyMessage = "Projects are being prepared. Check back soon.",
}) {
  if (projects.length === 0) {
    return <p className="project-grid__empty">{emptyMessage}</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id || project.title} {...project} />
      ))}
    </div>
  );
}
