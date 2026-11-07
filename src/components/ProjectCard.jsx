import { FiArrowUpRight, FiActivity, FiBookOpen, FiGlobe } from "react-icons/fi";

const artIcons = {
  setlist: FiActivity,
  noggin: FiBookOpen,
  kanji: FiGlobe,
};

function Artwork({ art, mark, name }) {
  const Icon = artIcons[art];
  return (
    <div className={`project-art art-${art}`} aria-hidden="true">
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="art-window">
        <div className="art-window-top"><span /><span /><span /></div>
        {art === "setlist" ? (
          <div className="setlist-preview">
            <span className="preview-kicker">THIS WEEK</span>
            <div className="preview-row"><i /> <b /> <small /></div>
            <div className="preview-row"><i /> <b /> <small /></div>
            <div className="preview-row"><i /> <b /> <small /></div>
          </div>
        ) : art === "noggin" ? (
          <div className="noggin-preview">
            <span className="preview-kicker">FIELD NOTES</span>
            <strong>Ideas into<br />something playable.</strong>
            <div className="note-stack"><i /><i /><i /></div>
          </div>
        ) : (
          <div className="kanji-preview">
            <span className="preview-kicker">WORD BOOK</span>
            <strong>漢</strong>
            <span className="kanji-lines"><i /><i /></span>
          </div>
        )}
      </div>
      <span className="art-stamp">{mark}</span>
      <span className="sr-only">Decorative preview for {name}</span>
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card project-${project.art}`}>
      <Artwork art={project.art} mark={project.mark} name={project.name} />
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
