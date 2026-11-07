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
        <div className="project-meta">
          <span>{project.group}</span>
          <span className="project-kind"><i />{project.kind}</span>
        </div>
        <h3 className="project-title accentable">{project.name}</h3>
        <p>{project.summary}</p>
        <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">
          {project.action}<FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
