import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card project-${project.art}`}>
      <div className="project-art" aria-hidden="true">
        <span className="project-initials">{project.mark}</span>
        <span className="project-orbit orbit-one" />
        <span className="project-orbit orbit-two" />
      </div>
      <div className="project-copy">
        <h3 className="project-title accentable">{project.name}</h3>
        <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name}`}>
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
