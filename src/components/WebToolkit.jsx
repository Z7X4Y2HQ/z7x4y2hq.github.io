import { useEffect, useState } from "react";

export default function WebToolkit({ groups, children }) {
  const skills = groups.flatMap(({ skills }) => skills);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;
  const activeIndex = selectedIndex < skills.length ? selectedIndex : 0;

  useEffect(() => {
    if (paused || skills.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }
    const fadeTimer = window.setTimeout(() => setVisible(false), 2600);
    const changeTimer = window.setTimeout(() => {
      setSelectedIndex((index) => (index + 1) % skills.length);
      setVisible(true);
    }, 3000);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(changeTimer);
    };
  }, [selectedIndex, paused, skills.length]);

  return (
    <div className="skill-sheet"
      onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="toolkit-header">
        <p className="skill-caption">WEB · DEVELOPMENT TOOLKIT</p>

      </div>
      <ul className="toolkit-names" aria-label="Web development skills">
        {skills.map((skill, index) => (
          <li key={skill}>
            <button type="button" aria-pressed={activeIndex === index}
              onClick={() => { setSelectedIndex(index); setVisible(true); }}>
              {skill}
            </button>
          </li>
        ))}
      </ul>
        <p className={"toolkit-feature" + (visible ? " is-visible" : "")} aria-hidden="true">
          {skills[activeIndex]}
        </p>
      {children && <p className="skill-footnote">{children}</p>}
    </div>
  );
}