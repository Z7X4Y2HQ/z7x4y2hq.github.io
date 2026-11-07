import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "./data/projects.js";
import ProjectCard from "./components/ProjectCard.jsx";
import SideBar from "./components/SideBar.jsx";
import { Polaroid } from "./components/polaroid.jsx";
import { FadeText } from "./components/TextFade.jsx";
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
  "HTML", "CSS", "PHP", "Bootstrap", "Tailwind CSS", "MySQL", "XAMPP", "MS SQL",
  "React", "JavaScript", "React Native", "Express", "MongoDB",
];

function PanelNav({ activeSection, onNavigate }) {
  const activeIndex = sections.indexOf(activeSection);
  const previous = sections[activeIndex - 1];
  const next = sections[activeIndex + 1];

  return (
    <>
      {previous && <button className="panel-nav panel-nav-previous" type="button" aria-label={`Previous: ${previous}`} onClick={() => onNavigate(previous)}><FiArrowUpRight aria-hidden="true" /></button>}
      {next && <button className="panel-nav panel-nav-next" type="button" aria-label={`Next: ${next}`} onClick={() => onNavigate(next)}><FiArrowUpRight aria-hidden="true" /></button>}
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
  const [highlighted, setHighlighted] = useState(true);
  const [underlined, setUnderlined] = useState(false);
  const [callAnswered, setCallAnswered] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useHorizontalScroll(trackRef);

  const navigateTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveSection(id);
  };

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
      if (!(typeof event.key === "string" && ["ArrowLeft", "ArrowRight"].includes(event.key))) return;
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

  const highlightClass = highlighted ? "highlightedText" : "";
  const underlineClass = underlined ? "underlinedText" : "";

  return (
    <div className={`app-shell${highlighted ? " has-highlight" : ""}${underlined ? " has-underline" : ""}`}>
      <a className="skip-link" href="#projects" onClick={(event) => { event.preventDefault(); navigateTo("projects"); }}>Skip to projects</a>
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
          <FadeText className="greeting-text" array={greetings} />
          <div className="home-layout">
            <div className="home-copy">
              <p className="story-copy intro-story">
                <a className="highlightedText" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">Z7X4Y2HQ</a>{" "}
                <span className={underlineClass}><span title="don't do it, its bad for you :)">cracking knuckles</span> while staring at an empty canvas of <span title="pages app for MacOS">pages</span></span>{" "}
                <span className={highlightClass}>"How to start talking about myself?"</span>{" "}
                <span className={underlineClass}>A question he often asked himself when being interviewed by HRs.</span>{" "}
                <span className={highlightClass}>"How does one introduce himself?"</span>{" "}
                <span className={underlineClass}>thinking back to what his Psychology teacher once said in the introductory class</span>{" "}
                <span className={highlightClass}>"Your name and age don't </span>
                <span className={highlightClass}>define who you are, your interests, hobbies, passion and skills do"</span>{" "}
                <span className={underlineClass}>Realising that it has been 12 seconds and he has not spoken a single word he replies</span>
              </p>
              <a className="story-wordmark" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">
                <h1 className="display-title" id="home-title">Z7X4Y2HQ</h1>
              </a>
              <p className="story-copy continue-story">
                <span className="highlightedText">"My name is Areeb and I'm {new Date().getFullYear() - 2001} years old and i've recently completed my bachelor's in CS from COMSATS and..."</span>{" "}
                <span className={underlineClass}>and he speaks! because he didn't want to give a bad impression by staying quiet.</span>{" "}
                <span className={highlightClass}>"Don't just introduce yourself, talk about yourself"</span>{" "}
                <span className={underlineClass}>interrupts the interviewer, breaking Z7X4Y2HQ's confidence.</span>{" "}
                <span className={highlightClass}>"How does one introduce himself?"</span>{" "}
                <span className={underlineClass}>he thought to himself...</span>{" "}
                <span className={highlightClass}>"You mean like my interests or past experience?"</span>{" "}
                <span className={underlineClass}>his voice cracks, to which the interviewer tries to relax him by saying</span>{" "}
                <span className={highlightClass}>&quot;Don't worry, this isn't a</span>
              </p>
            </div>
            <Polaroid image={Me} alt="Areeb standing outdoors in a suit" Title="Z7X4Y2HQ" className="home-portrait" float="right" delay="3.8s" />
            <Polaroid image={Laptop} alt="A laptop playing music" Title="T460" className="home-laptop" float="left" delay="4.1s" />
          </div>
        </Panel>

        <Panel id="story" image={Sky} className="story-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner story-inner">
            <h2 className="visually-hidden" id="story-title">2019</h2>
            <div className="timeline-copy">
              <p className="story-copy">
                <span className={underlineClass}>hard interview&quot; So much for Keeping composure...</span>{" "}
                <span className={highlightClass}>&quot;Take a few minutes to </span>
                <span className={highlightClass}>relax and we'll continue the interview then&quot;</span>{" "}
                <span className={underlineClass}>So much for first impression... overthinking different ways he could have started talking about himself, thinking if he should talk first or they will, 3 minutes pass by and the interview begins again and it was just them questioning some things from his CV and stuff.</span>
              </p>
              <p className="story-copy timeline-words">
                <span className="highlightedText">2019</span>, <span className={underlineClass}>college ended, with nothing better to do, he decided to learn</span>{" "}
                <span className="highlightedText">Wordpress Elementor</span>{" "}
                <span className="highlightedText">Adobe PhotoShop</span>{" "}
                <span className={underlineClass}>and</span>{" "}
                <span className="highlightedText">illustrator</span>{" "}
                <span className={underlineClass}>for logos and brochures. Also started learning</span>{" "}
                <span className="highlightedText">Javascript</span>{" "}
                <span className={underlineClass}>till his University started in</span>{" "}
                <span className="highlightedText">2020</span>{" "}
                <span className={underlineClass}>But a month later</span>{" "}
                <span className={highlightClass}>Corona</span>{" "}
                <span className={underlineClass}>arrived... Stuck at home, taking</span>{" "}
                <span className={highlightClass}>online classes</span>{" "}
                <span className={underlineClass}>, he spent the next</span>{" "}
                <span className={highlightClass}>1 and a half year</span>{" "}
                <span className={underlineClass}>like this. But he didn't waste all that time, worked on improving his</span>{" "}
                <span className="highlightedText">progamming fundamentals</span>{" "}
                <span className={underlineClass}>and</span>{" "}
                <span className="highlightedText">logic Building</span>{" "}
                <span className={underlineClass}>, decided to copy MyAnimeList, made a</span>{" "}
                <span className="highlightedText">CRUD website</span>{" "}
                <span className={underlineClass}>using</span>{" "}
                <span className="highlightedText">HTML</span>{" "}
                <span className="highlightedText">CSS</span>{" "}
                <span className="highlightedText">PHP</span>{" "}
                <span className="highlightedText">MySQL</span>{" "}
                <span className={underlineClass}>By the end of</span>{" "}
                <span className="highlightedText">2021</span>{" "}
                <span className={underlineClass}>, he took part in an online</span>{" "}
                <span className="highlightedText">writing contest</span>{" "}
                <span className={underlineClass}>where he wrote his first</span>{" "}
                <span className="highlightedText">novel</span>{" "}
                <span className={underlineClass}>which was approximately</span>{" "}
                <span className="highlightedText">75,000 words</span>{" "}
                <span className={underlineClass}>long.</span>{" "}
                <span className="highlightedText">2022</span>{" "}
                <span className={underlineClass}>came</span>
              </p>
              <p className="story-copy call-story">
                <span className="highlightedText">and... hm, Z7X4Y2HQ is calling me on the phone...</span>{" "}
                {!callAnswered && !callEnded && <button className="paper-button" type="button" onClick={() => setCallAnswered(true)}>Pick Up?</button>}
                {callAnswered && !callEnded && (
                  <span className="call-reply" aria-live="polite">
                    <span>Hey! How are you?</span>
                    <button className="call-decline" type="button" aria-label="Decline call" onClick={() => setCallEnded(true)}>×</button>
                  </span>
                )}
                {callEnded && <span className="call-ended" aria-live="polite">Seriously... ? <span aria-label="unimpressed">ಠ_ಠ</span></span>}
              </p>
            </div>
            <div className="story-photos">
              <Polaroid image={Moon} alt="A crescent moon in a violet evening sky framed by trees" Title="Purple Sky" className="story-photo moon-photo" float="left" delay="5s" />
              <Polaroid image={Stadia} alt="A Stadia controller on a desk" Title="Stadia Controller" className="story-photo stadia-photo" float="left" delay="5.3s" />
            </div>
          </div>
        </Panel>

        <Panel id="web" image={Kiznaiver} className="skills-panel web-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner skills-inner">
            <h2 className="section-title" id="web-title">Web Development</h2>
            <div className="skill-sheet">
              <div className="skill-list">{webSkills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        </Panel>

        <Panel id="games" image={Rwby} className="skills-panel game-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner game-inner">
            <div className="game-copy">
              <h2 className="section-title" id="games-title">Game Development</h2>
              <div className="game-tools"><span>Unity</span><span>C#</span></div>
            </div>
            <Polaroid image={Stadia} alt="A Stadia controller on a desk" Title="Stadia Controller" className="game-photo" float="right" delay="0.4s" />
          </div>
        </Panel>

        <Panel id="photos" image={Sky} className="photo-gallery-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner gallery-inner">
            <h2 className="section-title" id="photos-title">Photography</h2>
            <div className="photo-grid">
              <Polaroid image={Moon} alt="A crescent moon in a violet evening sky framed by trees" Title="Purple Sky" className="photo-card moon-photo" float="left" delay="0.35s" />
              <Polaroid image={Stadia} alt="A Stadia controller on a desk" Title="Stadia Controller" className="photo-card stadia-photo" float="left" delay="0.5s" />
              <Polaroid image={Laptop} alt="A laptop showing a music player" Title="T460" className="photo-card laptop-photo" float="right" delay="0.65s" />
            </div>
          </div>
        </Panel>

        <Panel id="writing" image={Bakery} className="writing-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner writing-inner">
            <div className="writing-sheet">
              <h2 className="section-title" id="writing-title">Writing</h2>
              <p className="section-lede">By the end of 2021, he took part in an online writing contest where he wrote his first novel which was approximately 75,000 words long.</p>
            </div>
            <Polaroid image={Moon} alt="A crescent moon in a violet evening sky" Title="Purple Sky" className="writing-photo" float="left" delay="0.4s" />
          </div>
        </Panel>

        <Panel id="projects" image={Bakery} className="projects-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner projects-inner">
            <h2 className="section-title" id="projects-title">Projects</h2>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <a className="projects-github" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer" aria-label="Z7X4Y2HQ on GitHub"><FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </Panel>
      </main>
    </div>
  );
}
