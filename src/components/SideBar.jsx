import { FiBookOpen, FiCamera, FiCode, FiGrid, FiGithub, FiHome, FiUnderline, FiUser } from "react-icons/fi";
import { FaHighlighter } from "react-icons/fa";
import { LuGamepad2 } from "react-icons/lu";

const sections = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "story", label: "Story", icon: FiUser },
  { id: "web", label: "Web", icon: FiCode },
  { id: "games", label: "Games", icon: LuGamepad2 },
  { id: "photos", label: "Photography", icon: FiCamera },
  { id: "writing", label: "Writing", icon: FiBookOpen },
  { id: "projects", label: "Projects", icon: FiGrid },
];

function RailButton({ label, active = false, pressed, onClick, href, children }) {
  const className = `rail-button${active ? " is-active" : ""}`;
  const content = <>{children}<span className="rail-tooltip" role="tooltip">{label}</span></>;

  if (href) return <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{content}</a>;
  return <button className={className} type="button" aria-label={label} aria-pressed={pressed} onClick={onClick}>{content}</button>;
}

export default function SideBar({ activeSection, onNavigate, highlighted, onToggleHighlight, underlined, onToggleUnderline }) {
  return (
    <aside className="side-rail" aria-label="Page controls">
      <a className="rail-brand" href="#home" aria-label="Go to homepage" onClick={(event) => { event.preventDefault(); onNavigate("home"); }}>z7</a>
      <div className="rail-rule" />
      <nav className="rail-nav" aria-label="Sections">
        {sections.map(({ id, label, icon: Icon }) => (
          <RailButton key={id} label={label} active={activeSection === id} onClick={() => onNavigate(id)}>
            <Icon aria-hidden="true" />
          </RailButton>
        ))}
      </nav>
      <div className="rail-rule rail-tool-rule" />
      <div className="rail-tools" aria-label="Text style controls">
        <RailButton label={highlighted ? "Turn highlights off" : "Highlight titles"} pressed={highlighted} onClick={onToggleHighlight}>
          <FaHighlighter aria-hidden="true" />
        </RailButton>
        <RailButton label={underlined ? "Turn underlines off" : "Underline titles"} pressed={underlined} onClick={onToggleUnderline}>
          <FiUnderline aria-hidden="true" />
        </RailButton>
      </div>
      <div className="rail-spacer" />
      <RailButton label="GitHub profile" href="https://github.com/Z7X4Y2HQ"><FiGithub aria-hidden="true" /></RailButton>
    </aside>
  );
}
