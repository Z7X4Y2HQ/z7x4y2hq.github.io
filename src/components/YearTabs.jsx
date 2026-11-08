import YearPanel from "./YearPanel.jsx";
import { useId, useRef, useState } from "react";

export default function YearTabs({ entries }) {
  const [selectedYear, setSelectedYear] = useState(entries[0]?.year);
  const tabsRef = useRef(null);
  const id = useId();
  if (!entries.length) return null;
  const activeYear = entries.some(({ year }) => year === selectedYear) ? selectedYear : entries[0].year;

  const onKeyDown = (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const index = entries.findIndex(({ year }) => year === activeYear);
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? entries.length - 1
      : (index + (event.key === "ArrowRight" ? 1 : -1) + entries.length) % entries.length;
    setSelectedYear(entries[nextIndex].year);
    tabsRef.current?.children[nextIndex]?.focus();
  };

  return (
    <div className="year-browser">
      <div ref={tabsRef} className="year-tabs" role="tablist" aria-label="Choose a year" onKeyDown={onKeyDown}>
        {entries.map(({ year }) => (
          <button
            key={year}
            type="button"
            role="tab"
            id={id + "-tab-" + year}
            aria-controls={id + "-panel-" + year}
            aria-selected={activeYear === year}
            tabIndex={activeYear === year ? 0 : -1}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      {entries.map((entry) => (
        <YearPanel key={entry.year} entry={entry} activeYear={activeYear} idPrefix={id} />
      ))}
    </div>
  );
}