import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { projects } from "./data/projects.js";
import ProjectCard from "./components/ProjectCard.jsx";
import SideBar from "./components/SideBar.jsx";
import { Polaroid } from "./components/polaroid.jsx";
import { useHorizontalScroll } from "./components/useHorizontalScroll.js";
import Bakery from "./assets/portfolio/Bakery.jpg";
import Sky from "./assets/portfolio/sky.jpg";
import Kiznaiver from "./assets/portfolio/Kiznaiver.jpg";
import Rwby from "./assets/portfolio/rwby.jpg";
import Laptop from "./assets/portfolio/laptop.jpg";
import Stadia from "./assets/portfolio/stadia.jpg";
import Moon from "./assets/portfolio/Moon.jpg";
import Me from "./assets/portfolio/me.png";
import "./App.css";

const sections = ["home", "story", "web", "games", "photos", "writing", "projects"];
const greetings = ["Hello", "Hola", "Bonjour", "Ciao", "안녕하세요", "こんにちは", "مرحبا", "Salam"];

const webSkills = [
  "HTML", "CSS", "JavaScript", "React", "React Native", "PHP", "Express",
  "Bootstrap", "Tailwind CSS", "MySQL", "MS SQL", "MongoDB", "XAMPP",
];

function Eyebrow({ number, children }) {
  return <p className="eyebrow"><span className="eyebrow-mark" />{number} <span className="eyebrow-slash">/</span> {children}</p>;
}

function PanelNav({ activeSection, onNavigate }) {
  const activeIndex = sections.indexOf(activeSection);
  const previous = sections[activeIndex - 1];
  const next = sections[activeIndex + 1];

  return (
    <>
      {previous && (
        <button className="panel-nav panel-nav-previous" type="button" aria-label={`Previous: ${previous}`} onClick={() => onNavigate(previous)}>
          <FiArrowUpRight aria-hidden="true" />
        </button>
      )}
      {next && (
        <button className="panel-nav panel-nav-next" type="button" aria-label={`Next: ${next}`} onClick={() => onNavigate(next)}>
          <FiArrowUpRight aria-hidden="true" />
        </button>
      )}
      <span className="panel-count" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</span>
    </>
  );
}

function Panel({ id, image, className = "", children, activeSection, onNavigate }) {
  return (
    <section
      className={`panel photo-panel ${className}`}
      id={id}
      aria-labelledby={`${id}-title`}
      style={{ "--panel-image": `url("${image}")` }}
    >
      <div className="panel-photo" aria-hidden="true" />
      <div className="panel-shade" aria-hidden="true" />
      {children}
      <PanelNav activeSection={activeSection} onNavigate={onNavigate} />
    </section>
  );
}

export default function App() {
  const trackRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [highlighted, setHighlighted] = useState(false);
  const [underlined, setUnderlined] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [callAnswered, setCallAnswered] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useHorizontalScroll(trackRef);

  const navigateTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveSection(id);
  };

  useEffect(() => {
    const timer = window.setInterval(() => setGreetingIndex((index) => (index + 1) % greetings.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, {
      root: window.matchMedia("(max-width: 760px)").matches ? null : track,
      threshold: [0.4, 0.65, 0.85],
    });
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!(["ArrowLeft", "ArrowRight"].includes(event.key))) return;
      if (event.target instanceof HTMLElement && event.target.closest("a, button, input, textarea, select")) return;
      if (window.matchMedia("(max-width: 760px)").matches) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sections.length - 1, sections.indexOf(activeSection) + direction));
      navigateTo(sections[nextIndex]);
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

      <main className="scroll-container" ref={trackRef} aria-label="Areeb's portfolio">
        <Panel id="home" image={Bakery} className="home-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="home-layout">
            <div className="home-copy">
              <Eyebrow number="01">A LITTLE INTRODUCTION</Eyebrow>
              <p className="greeting" aria-live="off">{greetings[greetingIndex]}.</p>
              <h1 className="display-title" id="home-title">How do I<br /><span className="accentable">introduce myself?</span></h1>
              <div className="story-copy">
                <p><span className="underlined-note">Z7X4Y2HQ, cracking his knuckles while staring at an empty canvas of pages.</span> “How to start talking about myself?” A question he often asked when interviewed.</p>
                <p>Then he remembered what his Psychology teacher said in the introductory class:</p>
                <blockquote className="teacher-quote accentable">“Your name and age don't define who you are, your interests, hobbies, passion and skills do.”</blockquote>
                <p>I'm Areeb, a Computer Science graduate from COMSATS. I make things for the web, explore game development, and write stories.</p>
              </div>
              <a className="text-link" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">
                A little more about me <FiArrowRight aria-hidden="true" />
              </a>
            </div>
            <Polaroid image={Me} alt="Areeb standing outdoors in a suit" Title="Areeb · Z7X4Y2HQ" className="home-portrait" float="right" delay="0.5s" />
            <Polaroid image={Laptop} alt="A laptop playing music" Title="A place to get started" className="home-laptop" float="left" delay="0.7s" />
          </div>
          <p className="scroll-hint">SCROLL SIDEWAYS <span aria-hidden="true">→</span></p>
        </Panel>

        <Panel id="story" image={Sky} className="story-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner story-inner">
            <Eyebrow number="02">THE ROAD SO FAR</Eyebrow>
            <h2 className="section-title" id="story-title">A few years that <span className="accentable">changed the page.</span></h2>
            <p className="section-lede">College ended, a university began, the world stayed home for a while, and several new interests took root.</p>
            <p className="interview-note">The interview began with a 12-second silence. I introduced myself, then heard: “Don't just introduce yourself, talk about yourself.” I wondered whether to mention my interests or experience; my voice cracked. The interviewer told me it wasn't a hard interview, and we started again with questions from my CV.</p>
            <div className="timeline-grid">
              <article className="timeline-card">
                <span className="timeline-year">2019</span>
                <p>College ended. I started learning WordPress Elementor, Photoshop, Illustrator, and JavaScript.</p>
              </article>
              <article className="timeline-card">
                <span className="timeline-year">2020</span>
                <p>University started, then the pandemic moved classes online. I worked on programming fundamentals and logic, and built a MyAnimeList-inspired CRUD site with HTML, CSS, PHP, and MySQL.</p>
              </article>
              <article className="timeline-card">
                <span className="timeline-year">2021</span>
                <p>I entered an online writing contest and wrote my first novel: roughly 75,000 words.</p>
              </article>
              <article className="timeline-card call-card">
                <span className="timeline-year">2022</span>
                <p>And then... hm, Z7X4Y2HQ is calling me on the phone.</p>
                {!callAnswered && !callEnded && <button className="paper-button" type="button" onClick={() => setCallAnswered(true)}>Pick up?</button>}
                {callAnswered && !callEnded && (
                  <div className="call-reply" aria-live="polite">
                    <span>“Hey! How are you?”</span>
                    <button className="quiet-button" type="button" onClick={() => setCallEnded(true)}>Hang up</button>
                  </div>
                )}
                {callEnded && <p className="call-ended" aria-live="polite">Seriously...? <span aria-label="unimpressed">ಠ_ಠ</span></p>}
              </article>
            </div>
          </div>
        </Panel>

        <Panel id="web" image={Kiznaiver} className="skills-panel web-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner skills-inner">
            <Eyebrow number="03">WEB DEVELOPMENT</Eyebrow>
            <h2 className="section-title" id="web-title">Curiosity turned into <span className="accentable">code.</span></h2>
            <p className="section-lede">These are the languages, libraries, and tools I have explored along the way.</p>
            <div className="skill-sheet">
              <p className="skill-caption">WEB · DEVELOPMENT TOOLKIT</p>
              <div className="skill-list">{webSkills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
              <p className="skill-footnote">From my first HTML pages and MySQL-backed project to React apps.</p>
            </div>
          </div>
        </Panel>

        <Panel id="games" image={Rwby} className="skills-panel game-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner game-inner">
            <div className="game-copy">
              <Eyebrow number="04">GAME DEVELOPMENT</Eyebrow>
              <h2 className="section-title" id="games-title">A little more <span className="accentable">play.</span></h2>
              <p className="section-lede">I got curious about making games too. Unity and C# are the tools at the start of that path.</p>
              <div className="game-tools"><span>Unity</span><span>C#</span></div>
            </div>
            <Polaroid image={Stadia} alt="A Stadia controller on a desk" Title="Stadia controller" className="game-photo" float="right" delay="0.4s" />
          </div>
        </Panel>

        <Panel id="photos" image={Sky} className="photo-gallery-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner gallery-inner">
            <Eyebrow number="05">PHOTOGRAPHY</Eyebrow>
            <h2 className="section-title" id="photos-title">Little things I <span className="accentable">noticed.</span></h2>
            <p className="section-lede">A small collection of photos from the original page.</p>
            <div className="photo-grid">
              <Polaroid image={Moon} alt="A crescent moon in a violet evening sky framed by trees" Title="Purple sky" className="photo-card moon-photo" float="left" delay="0.35s" />
              <Polaroid image={Stadia} alt="A Stadia controller on a desk" Title="Stadia controller" className="photo-card stadia-photo" float="left" delay="0.5s" />
              <Polaroid image={Laptop} alt="A laptop showing a music player" Title="T460" className="photo-card laptop-photo" float="right" delay="0.65s" />
            </div>
          </div>
        </Panel>

        <Panel id="writing" image={Bakery} className="writing-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner writing-inner">
            <div className="writing-sheet">
              <Eyebrow number="06">WRITING</Eyebrow>
              <h2 className="section-title" id="writing-title">One story became <span className="accentable">75,000 words.</span></h2>
              <p className="section-lede">In 2021, I took part in an online writing contest. I wrote my first novel, about 75,000 words long.</p>
              <div className="writing-rule" aria-hidden="true" />
              <p className="writing-note">No title on this page yet. Just the milestone that made it here.</p>
              <a className="text-link" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">Find me on GitHub <FiArrowUpRight aria-hidden="true" /></a>
            </div>
            <Polaroid image={Moon} alt="A crescent moon in a violet evening sky" Title="A quiet evening" className="writing-photo" float="left" delay="0.4s" />
          </div>
        </Panel>

        <Panel id="projects" image={Bakery} className="projects-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner projects-inner">
            <header className="projects-header">
              <div>
                <Eyebrow number="07">THINGS I HAVE MADE</Eyebrow>
                <h2 className="section-title" id="projects-title">Open a <span className="accentable">project.</span></h2>
              </div>
              <p className="section-lede">A few apps and projects, gathered in one place.</p>
            </header>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <footer className="projects-footer">
              <span>MORE WILL TURN UP HERE.</span>
              <a href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">Browse GitHub <FiArrowUpRight aria-hidden="true" /></a>
            </footer>
          </div>
        </Panel>
      </main>
    </div>
  );
}
