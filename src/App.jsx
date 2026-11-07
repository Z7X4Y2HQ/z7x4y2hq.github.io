import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { projects } from "./data/projects.js";
import ProjectCard from "./components/ProjectCard.jsx";
import SideBar from "./components/SideBar.jsx";
import { useHorizontalScroll } from "./components/useHorizontalScroll.js";
import "./App.css";

const sectionIds = ["home", "projects"];

export default function App() {
  const trackRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [underlined, setUnderlined] = useState(false);

  useHorizontalScroll(trackRef);

  const navigateTo = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveSection(id);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActiveSection(visible.target.id);
        if (visible.target.id === "projects") setProjectsVisible(true);
      }
    }, {
      root: window.matchMedia("(max-width: 760px)").matches ? null : track,
      threshold: [0.4, 0.65, 0.85],
    });

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!(["ArrowLeft", "ArrowRight"].includes(event.key))) return;
      if (event.target instanceof HTMLElement && event.target.closest("a, button, input, textarea, select")) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const currentIndex = sectionIds.indexOf(activeSection);
      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, currentIndex + direction));
      navigateTo(sectionIds[nextIndex]);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSection]);

  return (
    <div className={`app-shell${highlighted ? " has-highlight" : ""}${underlined ? " has-underline" : ""}`}>
      <a className="skip-link" href="#projects" onClick={(event) => { event.preventDefault(); navigateTo("projects"); }}>
        Skip to projects
      </a>
      <SideBar
        activeSection={activeSection}
        onNavigate={navigateTo}
        highlighted={highlighted}
        onToggleHighlight={() => setHighlighted((value) => !value)}
        underlined={underlined}
        onToggleUnderline={() => setUnderlined((value) => !value)}
      />

      <main className="scroll-container" ref={trackRef} aria-label="Projects home">
        <section className="panel home-panel" id="home" aria-labelledby="home-title">
          <div className="home-wash" aria-hidden="true" />
          <div className="scene-art" aria-hidden="true">
            <div className="scene-sun" />
            <div className="scene-hill hill-back" />
            <div className="scene-hill hill-front" />
            <div className="scene-window"><span /><span /><span /><span /></div>
            <div className="scene-stem stem-one" />
            <div className="scene-stem stem-two" />
          </div>
          <div className="home-content">
            <p className="eyebrow"><span className="eyebrow-mark" />Z7X4Y2HQ <span className="eyebrow-slash">/</span> PROJECT INDEX</p>
            <h1 className="display-title" id="home-title">Apps<br /><span className="accentable">&amp; projects.</span></h1>
            <p className="home-description">
              The things I’ve been making, collected in one place.
            </p>
            <button className="browse-button" type="button" onClick={() => navigateTo("projects")}>
              See what’s here <FiArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className="home-side-note" aria-hidden="true">
            <span>PERSONAL INDEX</span><i /> <span>01 — 02</span>
          </div>
          <button className="next-panel" type="button" aria-label="Go to projects" onClick={() => navigateTo("projects")}>
            <FiArrowUpRight aria-hidden="true" />
          </button>
          <p className="scroll-hint">SCROLL SIDEWAYS <span aria-hidden="true">→</span></p>
        </section>

        <section className={`panel projects-panel${projectsVisible ? " is-visible" : ""}`} id="projects" aria-labelledby="projects-title">
          <div className="projects-wash" aria-hidden="true" />
          <div className="projects-content">
            <header className="projects-header">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" />02 <span className="eyebrow-slash">/</span> THE PROJECTS</p>
                <h2 id="projects-title">Made to <span className="accentable">be opened.</span></h2>
              </div>
              <p className="projects-intro">Pick one. The live apps open in a new tab; the Kanji Helper link goes to its source.</p>
            </header>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <footer className="projects-footer">
              <span>MORE WILL TURN UP HERE.</span>
              <a href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">Browse GitHub <FiArrowUpRight aria-hidden="true" /></a>
            </footer>
          </div>
          <button className="previous-panel" type="button" aria-label="Back to home" onClick={() => navigateTo("home")}>
            <FiArrowUpRight aria-hidden="true" />
          </button>
          <span className="panel-index" aria-hidden="true">02 / 02</span>
        </section>
      </main>
    </div>
  );
}
