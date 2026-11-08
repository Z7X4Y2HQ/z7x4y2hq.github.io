import { getTimelineSegments } from "../data/timeline.js";

export default function YearPanel({ entry, activeYear, idPrefix }) {
  const { year, description } = entry;
  return (
    <div
      className="year-panel"
      role="tabpanel"
      id={idPrefix + "-panel-" + year}
      aria-labelledby={idPrefix + "-tab-" + year}
      hidden={activeYear !== year}
      tabIndex={0}
    >
      {description && (
        <p>
          {getTimelineSegments(description, year).map(({ text, highlighted, href }, index) => {
            if (href) {
              return (
                <a key={index} className="timeline-term timeline-term-link"
                  href={href} target="_blank" rel="noopener noreferrer">
                  <strong>{text}</strong>
                </a>
              );
            }
            return highlighted ? <strong key={index} className="timeline-term">{text}</strong> : text;
          })}
        </p>
      )}
    </div>
  );
}