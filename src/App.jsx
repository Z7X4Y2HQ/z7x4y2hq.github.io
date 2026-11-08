import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { projects } from "./data/projects.js";
import ProjectCard from "./components/ProjectCard.jsx";
import SideBar from "./components/SideBar.jsx";
import YearTabs from "./components/YearTabs.jsx";
import WebToolkit from "./components/WebToolkit.jsx";
import { webToolkit } from "./data/webToolkit.js";
import { getTimelineEntries } from "./data/timeline.js";
import { Polaroid } from "./components/polaroid.jsx";
import { useHorizontalScroll } from "./components/useHorizontalScroll.js";
import { useSectionNavigation } from "./components/useSectionNavigation.js";
import Bakery from "./assets/portfolio/Bakery.jpg";
import Sky from "./assets/portfolio/sky.jpg";
import Kiznaiver from "./assets/portfolio/Kiznaiver.jpg";
import Rwby from "./assets/portfolio/rwby.jpg";
import Laptop from "./assets/portfolio/laptop.jpg";
import Stadia from "./assets/portfolio/stadia.jpg";
import Moon from "./assets/portfolio/Moon.jpg";
import "./App.css";

const sections = ["home", "story", "web", "games", "photos", "writing", "projects"];
const greetings = ["Hi", "Hola", "Bonjour", "Ciao", "안녕하세요", "こんにちは", "مرحبا", "Salam"];



function Eyebrow({ number, children }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-mark" />
      {number} <span className="eyebrow-slash">/</span> {children}
    </p>
  );
}

function PanelNav({ activeSection }) {
  const activeIndex = sections.indexOf(activeSection);
  return (
    <span className="panel-count" aria-hidden="true">
      {String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
    </span>
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
  const today = new Date();
  const yearsSinceGraduation = today.getFullYear() - 2024;
  const graduationVerb = yearsSinceGraduation > 0 ? "I completed" : "I've recently completed";
  const graduationTiming =
    yearsSinceGraduation <= 0
      ? ""
      : yearsSinceGraduation <= 2
        ? " a while ago"
        : yearsSinceGraduation === 3
          ? " a long while ago"
          : yearsSinceGraduation === 4
            ? " almost half a decade ago"
            : yearsSinceGraduation === 5
              ? " about half a decade ago"
              : yearsSinceGraduation <= 7
                ? " over half a decade ago"
                : yearsSinceGraduation <= 9
                  ? " almost a decade ago"
                  : yearsSinceGraduation === 10
                    ? " about a decade ago"
                    : yearsSinceGraduation < 20
                      ? " over a decade ago"
                      : " decades ago";
  const birthdayThisYear = new Date(today.getFullYear(), 0, 9);
  const age = today.getFullYear() - 2001 - (today < birthdayThisYear ? 1 : 0);
  const trackRef = useRef(null);
  const greetingRef = useRef(null);
  const { activeSection, navigateTo } = useSectionNavigation(trackRef, sections);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [introRevealed, setIntroRevealed] = useState(false);
  const [alternateTitle, setAlternateTitle] = useState(false);

  useHorizontalScroll(trackRef);

  useLayoutEffect(() => {
    const greeting = greetingRef.current;
    if (!greeting) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroRevealed(true);
      return undefined;
    }

    const centerGreeting = () => {
      greeting.style.transition = "none";
      greeting.style.transform = "none";
      const bounds = greeting.getBoundingClientRect();
      const offsetX = window.innerWidth / 2 - (bounds.left + bounds.width / 2);
      const offsetY = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
      greeting.style.transform = "translate3d(" + offsetX + "px, " + offsetY + "px, 0) scale(2.5)";
    };

    centerGreeting();
    window.addEventListener("resize", centerGreeting);
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) centerGreeting();
    });
    const holdTimer = window.setTimeout(() => {
      cancelled = true;
      window.removeEventListener("resize", centerGreeting);
      greeting.style.transition = "transform 1.35s cubic-bezier(.2,.75,.25,1)";
      greeting.style.transform = "none";
      setIntroRevealed(true);
    }, 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimer);
      window.removeEventListener("resize", centerGreeting);
      greeting.style.removeProperty("transition");
      greeting.style.removeProperty("transform");
    };
  }, []);

  useEffect(() => {
    if (!introRevealed) return undefined;
    let interval;
    const startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => setAlternateTitle((value) => !value), 5000);
    }, 1350);
    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
    };
  }, [introRevealed]);


  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setGreetingVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!introRevealed) return undefined;
    let timer;
    let fadeTimer;
    const startTimer = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setGreetingVisible(false);
        fadeTimer = window.setTimeout(() => {
          setGreetingIndex((index) => (index + 1) % greetings.length);
          setGreetingVisible(true);
        }, 400);
      }, 1800);
    }, 1350);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(fadeTimer);
      window.clearInterval(timer);
    };
  }, [introRevealed]);


  useEffect(() => {
    const onKeyDown = (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
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
    <div className={`app-shell opening-sequence${introRevealed ? " intro-revealed" : ""} has-underline`}>
      <a
        className="skip-link"
        href="#projects"
        onClick={(event) => {
          event.preventDefault();
          navigateTo("projects");
        }}
      >
        Skip to projects
      </a>
      <SideBar activeSection={activeSection} onNavigate={navigateTo} />

      <main className="scroll-container" ref={trackRef} aria-label="Areeb's portfolio">
        <Panel id="home" image={Bakery} className="home-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="home-layout">
            <div className="home-copy">
              <Eyebrow number="01">A LITTLE INTRODUCTION</Eyebrow>
              <p className="greeting" aria-live="off">
                <span ref={greetingRef} className="greeting-word">
                  <span className={"greeting-label" + (greetingVisible ? " is-visible" : "")}>
                    {greetings[greetingIndex]}.
                  </span>
                </span>
              </p>
              <h1 className="display-title rotating-title" id="home-title">
                <span className={"title-phrase" + (!alternateTitle ? " is-visible" : "")} aria-hidden={alternateTitle}>
                  How do I<br />
                  <span className="accentable">introduce myself?</span>
                </span>
                <span className={"title-phrase" + (alternateTitle ? " is-visible" : "")} aria-hidden={!alternateTitle}>
                  How does one
                  <br />
                  <span className="accentable">introduce themselves?</span>
                </span>
              </h1>
              <div className="story-copy">
                <p>
                  <span className="underlined-note">
                    Z7X4Y2HQ, cracking his knuckles while staring at an empty canvas of pages.
                  </span>{" "}
                  “How to start talking about myself?” A question he often asked when interviewed.
                </p>
                <p>Then he remembered what A Psychology Professor once said in the introductory class:</p>
                <blockquote className="teacher-quote accentable">
                  “Your name and age don't define who you are, your interests, hobbies, passion and skills do.”
                </blockquote>
              </div>
              <a
                className="text-link"
                href="#story"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("story");
                }}
              >
                A little more about me <FiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <p className="scroll-hint">
            SCROLL SIDEWAYS <span aria-hidden="true">→</span>
          </p>
        </Panel>

        <Panel id="story" image={Sky} className="story-panel" activeSection={activeSection} onNavigate={navigateTo}>
          <div className="panel-inner story-inner">
            <Eyebrow number="02">THE ROAD SO FAR</Eyebrow>
            <h2 className="section-title" id="story-title">
              A few years that <span className="accentable">changed the page.</span>
            </h2>
            <div className="story-copy">
              <p>
                Realising that it has been 12 seconds and he has not spoken a single word to the interviewer, he
                replies:
              </p>
              <blockquote className="teacher-quote accentable">
                “My name is Areeb, and I'm {age} years old and {graduationVerb} my bachelor's degree in CS from COMSATS
                {graduationTiming}, and...”
              </blockquote>
              <p>What an idiot! Completely fumbled his words and even his voice was cracking...</p>
            </div>
            <a
              className="text-link"
              href="#story"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("web");
              }}
            >
              Just a little bit more <FiArrowRight aria-hidden="true" />
            </a>
            <YearTabs entries={getTimelineEntries(today.getFullYear())} />
          </div>
        </Panel>

        <Panel
          id="web"
          image={Kiznaiver}
          className="skills-panel web-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
        >
          <div className="panel-inner skills-inner">
            <Eyebrow number="03">WEB DEVELOPMENT</Eyebrow>
            <h2 className="section-title" id="web-title">
              Curiosity turned into <span className="heading-ending"><span className="accentable">code.</span><span className="heading-aside">(Not Really)</span></span>
            </h2>
            <div className="story-copy">
              <blockquote className="teacher-quote accentable">
                "Don't just introduce yourself, talk about yourself"
              </blockquote>
              <p>
                interrupts the interviewer, breaking Z7X4Y2HQ's confidence... "How does one introduce themselves?" he
                thought to himself...
              </p>
              <blockquote className="teacher-quote accentable">
                "You mean like my interests or past experience?"
              </blockquote>
              <p>his voice cracks...</p>
            </div>
            <a
              className="text-link"
              href="#story"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("games");
              }}
            >
              Almost to the end <FiArrowRight aria-hidden="true" />
            </a>
            <WebToolkit groups={webToolkit}>
              Just throwing some Web Dev jargon out there to make it sound like I know shit. We all know who's doing all the hard work ;)
            </WebToolkit>
          </div>
        </Panel>

        <Panel
          id="games"
          image={Rwby}
          className="skills-panel game-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
        >
          <div className="panel-inner game-inner">
            <div className="game-copy">
              <Eyebrow number="04">GAME DEVELOPMENT</Eyebrow>
              <h2 className="section-title" id="games-title">
                A little more <span className="accentable">play.</span>
              </h2>
              <p className="section-lede">
                I got curious about making games too. Unity and C# are the tools at the start of that path.
              </p>
              <div className="game-tools">
                <span>Unity</span>
                <span>C#</span>
              </div>
            </div>
            <Polaroid
              image={Stadia}
              alt="A Stadia controller on a desk"
              Title="Stadia controller"
              className="game-photo"
              float="right"
              delay="0.4s"
            />
          </div>
        </Panel>

        <Panel
          id="photos"
          image={Sky}
          className="photo-gallery-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
        >
          <div className="panel-inner gallery-inner">
            <Eyebrow number="05">PHOTOGRAPHY</Eyebrow>
            <h2 className="section-title" id="photos-title">
              Little things I <span className="accentable">noticed.</span>
            </h2>
            <p className="section-lede">A small collection of photos from the original page.</p>
            <div className="photo-grid">
              <Polaroid
                image={Moon}
                alt="A crescent moon in a violet evening sky framed by trees"
                Title="Purple sky"
                className="photo-card moon-photo"
                float="left"
                delay="0.35s"
              />
              <Polaroid
                image={Stadia}
                alt="A Stadia controller on a desk"
                Title="Stadia controller"
                className="photo-card stadia-photo"
                float="left"
                delay="0.5s"
              />
              <Polaroid
                image={Laptop}
                alt="A laptop showing a music player"
                Title="T460"
                className="photo-card laptop-photo"
                float="right"
                delay="0.65s"
              />
            </div>
          </div>
        </Panel>

        <Panel
          id="writing"
          image={Bakery}
          className="writing-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
        >
          <div className="panel-inner writing-inner">
            <div className="writing-sheet">
              <Eyebrow number="06">WRITING</Eyebrow>
              <h2 className="section-title" id="writing-title">
                One story became <span className="accentable">75,000 words.</span>
              </h2>
              <p className="section-lede">
                In 2021, I took part in an online writing contest. I wrote my first novel, about 75,000 words long.
              </p>
              <div className="writing-rule" aria-hidden="true" />
              <p className="writing-note">No title on this page yet. Just the milestone that made it here.</p>
              <a className="text-link" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">
                Find me on GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <Polaroid
              image={Moon}
              alt="A crescent moon in a violet evening sky"
              Title="A quiet evening"
              className="writing-photo"
              float="left"
              delay="0.4s"
            />
          </div>
        </Panel>

        <Panel
          id="projects"
          image={Bakery}
          className="projects-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
        >
          <div className="panel-inner projects-inner">
            <header className="projects-header">
              <div>
                <Eyebrow number="07">THINGS I HAVE MADE</Eyebrow>
                <h2 className="section-title" id="projects-title">
                  Open a <span className="accentable">project.</span>
                </h2>
              </div>
              <p className="section-lede">A few apps and projects, gathered in one place.</p>
            </header>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <footer className="projects-footer">
              <span>MORE WILL TURN UP HERE.</span>
              <a href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">
                Browse GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
            </footer>
          </div>
        </Panel>
      </main>
    </div>
  );
}
