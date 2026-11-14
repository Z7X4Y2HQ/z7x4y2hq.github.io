import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { projects } from "./data/projects.js";
import ProjectCard from "./components/ProjectCard.jsx";
import SideBar from "./components/SideBar.jsx";
import YearTabs from "./components/YearTabs.jsx";
import WebToolkit from "./components/WebToolkit.jsx";
import { webToolkit } from "./data/webToolkit.js";
import { gameToolkit } from "./data/gameToolkit.js";
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
const galleryPhotos = [
  {
    id: "stadia",
    image: Stadia,
    title: "Stadia controller",
    alt: "A Stadia controller on a desk",
    description: "A close-up of the controller beside its wireless adapter.",
  },
  {
    id: "moon",
    image: Moon,
    title: "Purple sky",
    alt: "A crescent moon in a violet evening sky framed by trees",
    description: "A small crescent hangs in a violet dusk sky, framed by treetops.",
  },
  {
    id: "laptop",
    image: Laptop,
    title: "T460",
    alt: "A laptop showing a music player",
    description: "A music playlist plays on a T460 laptop in a softly lit room.",
  },
  {
    id: "sky",
    image: Sky,
    title: "Evening sky",
    alt: "Orange sunset clouds above rooftops and power lines",
    description: "Peach evening clouds stretch over rooftops, streetlights, and power lines.",
  },
  {
    id: "bakery",
    image: Bakery,
    title: "Bakery",
    alt: "A mint-green bicycle outside a pink bakery with a round window",
    description: "A mint-green bicycle rests outside a pink bakery among potted plants.",
  },
];
const interviewQuotes = [
  "Currently I'm applying for both, Web and Game as I have experience in both...",
  "The scope of Web Development is much larger than Game Development...",
  "Web Development Pays better than Game Development So...",
  "I did Game Development just for my FYP, I had no intention of pursuing it as a career...",
];
const greetings = ["Hi", "Hola", "Bonjour", "Ciao", "안녕하세요", "こんにちは", "مرحبا", "Salam"];

function Eyebrow({ number, children }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-mark" />
      {number} <span className="eyebrow-slash">/</span> {children}
    </p>
  );
}

const detailTopics = {
  web: {
    number: "03",
    label: "WEB DEVELOPMENT",
    title: "Building useful things for the web.",
    intro: "From early PHP and MySQL projects to professional Next.js and PERN work, I’ve grown from building pages to building full-stack applications.",
  },
  games: {
    number: "04",
    label: "GAME DEVELOPMENT",
    title: "Stories, prototypes, and play.",
    intro: "Game development became interesting when I could use it to bring a story to life. Here are a few steps along that path.",
  },
  photos: {
    number: "05",
    label: "PHOTOGRAPHY",
    title: "A closer look at the little things.",
    intro: "A few everyday scenes I wanted to hold onto: a changing sky, a quiet evening, and familiar things at home.",
  },
  writing: {
    number: "06",
    label: "WRITING",
    title: "One story, told in two forms.",
    intro: "Skipped a Beat began as a novel for an online contest and later became the story behind my final-year game project.",
  },
};

function DetailProjectCard({ kicker, title, description, href, action }) {
  return (
    <article className="detail-card">
      <p className="detail-card-kicker">{kicker}</p>
      <h3>{title}</h3>
      <p className="detail-card-description">{description}</p>
      {href && (
        <a className="detail-card-link" href={href} target="_blank" rel="noopener noreferrer">
          {action || "View project"} <FiArrowUpRight aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

function DetailProjectGroup({ title, children }) {
  return (
    <section className="detail-project-group">
      <h3 className="detail-project-group-title">{title}</h3>
      <div className="detail-card-grid">{children}</div>
    </section>
  );
}

function DetailProjectCategory({ title, children }) {
  return (
    <section className="detail-project-category">
      <h3 className="detail-project-category-title">{title}</h3>
      <div className="detail-project-category-groups">{children}</div>
    </section>
  );
}

function DetailSkillGroups({ groups }) {
  return (
    <aside className="detail-toolbox">
      <p className="detail-card-kicker">TOOLS & TECHNOLOGIES</p>
      {groups.map((group) => (
        <section className="detail-skill-group" key={group.label}>
          <h3>{group.label}</h3>
          <ul>
            {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>
      ))}
    </aside>
  );
}

function DetailContent({ topic }) {
  const details = detailTopics[topic];

  return (
    <>
      <header className="detail-intro">
        <Eyebrow number={details.number}>{details.label}</Eyebrow>
        <h2 className="section-title detail-title" id="detail-cover-title">
          {details.title}
        </h2>
        <p className="detail-lede">{details.intro}</p>
      </header>

      {topic === "web" && (
        <div className="detail-feature-layout">
          <div className="detail-project-categories">
            <DetailProjectCategory title="Professional">
              <DetailProjectGroup title="Experience">
                <DetailProjectCard
                  kicker="JULY 2024 – PRESENT · VISION SWIPE"
                  title="Frontend Developer"
                  description="Worked on responsive Next.js apps, API integrations, authentication flows, and server-rendered pages. Collaborated with the backend team on Node.js, Express, PostgreSQL, and Supabase."
                />
              </DetailProjectGroup>
              <DetailProjectGroup title="Work Projects">
                <DetailProjectCard
                  kicker="VISION SWIPE · CLIENT PROJECT"
                  title="Medical Online Store"
                  description="Built the interface for a medical supplies store, including real-time customer chat and basic AI suggestions that can add recommended items to the cart."
                />
                <DetailProjectCard
                  kicker="VISION SWIPE · CLIENT PROJECT"
                  title="AI Business Website Builder"
                  description="Helped build a platform for creating tailored business websites with AI, dynamic user flows, and backend data handling in Supabase."
                />
                <DetailProjectCard
                  kicker="VISION SWIPE · CLIENT PROJECT"
                  title="Goal Management System"
                  description="Worked on a goals and competencies system with approval flows, manager delegation, status tracking, and deadlines."
                />
                <DetailProjectCard
                  kicker="VISION SWIPE · CLIENT PROJECT"
                  title="Multi-Business Management Dashboard"
                  description="Developed frontend features for a multi-location dashboard covering services, bookings, and role-based access for staff."
                />
              </DetailProjectGroup>
              <DetailProjectGroup title="Freelance Work">
                <DetailProjectCard
                  kicker="EARLY FREELANCE WORK"
                  title="Websites & Design"
                  description="Built HTML and CSS frontends, WordPress pages with Elementor, and PHP/MySQL backends; also created small logos and brochures."
                />
              </DetailProjectGroup>
            </DetailProjectCategory>
            <DetailProjectCategory title="Personal">
              <DetailProjectGroup title="Hackathon Projects">
                <DetailProjectCard
                  kicker="2024 · DEVSINC DEVATHON"
                  title="Student Test Portal"
                  description="With a three-person team, built the React frontend for a teacher and student portal and integrated its APIs."
                  href="https://github.com/thomas-catt/devathon-24"
                  action="View source"
                />
                <DetailProjectCard
                  kicker="2024 · CIPHER CRAFT"
                  title="Coding Education Portal"
                  description="Built a Next.js frontend for an interactive coding education portal, with API integrations for its learning experience."
                  href="https://github.com/r3hmantom/ciphercraft-byte-learn"
                  action="View source"
                />
              </DetailProjectGroup>
              <DetailProjectGroup title="Personal Projects">
                <DetailProjectCard
                  kicker="LIVE APP · PERSONAL PROJECT"
                  title="Setlist"
                  description="A home for workout plans, sessions, and training progress."
                  href="https://z7x4y2hq.github.io/SETLIST/"
                  action="Open Setlist"
                />
                <DetailProjectCard
                  kicker="PROJECT SOURCE · LANGUAGE"
                  title="Kanji Helper"
                  description="A Japanese vocabulary helper with quick quizzes."
                  href="https://github.com/Z7X4Y2HQ/Kanji-Setsumei-9000"
                  action="View source"
                />
              </DetailProjectGroup>
              <DetailProjectGroup title="Early Projects">
                <DetailProjectCard
                  kicker="2020 · UNIVERSITY PROJECT"
                  title="MyAnimeList-inspired CRUD site"
                  description="An early full-stack exercise built with HTML, CSS, PHP, and MySQL."
                />
                <DetailProjectCard
                  kicker="EARLY PROJECTS · WEB & MOBILE"
                  title="To-do List & Amazon Clone"
                  description="Built a MERN to-do app and a frontend-only Amazon app clone in React Native, alongside Fullstack Open exercises."
                />
              </DetailProjectGroup>
            </DetailProjectCategory>
          </div>
          <DetailSkillGroups groups={webToolkit} />
        </div>
      )}

      {topic === "games" && (
        <div className="detail-feature-layout">
          <div className="detail-card-grid">
            <DetailProjectCard
              kicker="2023 · FINAL-YEAR PROJECT"
              title="Skipped a Beat"
              description="A Unity narrative adventure based on the story I first wrote for an online contest."
              href="https://github.com/Z7X4Y2HQ/Skipped_a_Beat"
              action="View project source"
            />
            <DetailProjectCard
              kicker="2022 · EARLY PROTOTYPE"
              title="Coin Collector"
              description="A small Unity game prototype from when I was learning the basics of game development."
            />
            <DetailProjectCard
              kicker="LIVE APP · GAME MAKING"
              title="Noggin Joggin"
              description="A place to collect game ideas, design notes, and roadmaps."
              href="https://z7x4y2hq.github.io/Noggin-Joggin/"
              action="Open Noggin Joggin"
            />
            <DetailProjectCard
              kicker="2024 · SOFTEC GAME JAM"
              title="Brunch"
              description="With a four-person team, built core mechanics for a retro-futuristic survival puzzle game with Wordle, Braille, and Vigenere cipher challenges."
              href="https://github.com/Z7X4Y2HQ/Brunch"
              action="View project source"
            />
            <DetailProjectCard
              kicker="2024 · MINDSTORM SUMMER PROGRAM"
              title="Mobile Cricket Game"
              description="Worked on the core mechanics and prototype for a Unity cricket game, then helped polish it for a better player experience."
            />
            <DetailProjectCard
              kicker="UNITY · SMALL EXPERIMENTS"
              title="Puzzles & Prototypes"
              description="Built small Wordle and Sudoku games, 2D platformer and top-down shooter prototypes, a character controller, and Timeline cutscenes."
            />
          </div>
          <DetailSkillGroups groups={gameToolkit} />
        </div>
      )}

      {topic === "photos" && (
        <div className="detail-photo-grid">
          {galleryPhotos.map((photo, index) => (
            <Polaroid
              key={photo.id}
              image={photo.image}
              alt={photo.alt}
              Title={photo.title}
              description={photo.description}
              className="detail-polaroid"
              float="left"
              delay={`${index * 80}ms`}
            />
          ))}
        </div>
      )}

      {topic === "writing" && (
        <div className="detail-writing-grid">
          <DetailProjectCard
            kicker="2021 · MYANIMELIST × HONEYFEED CONTEST"
            title="Skipped a Beat — the novel"
            description="The original story, written as my entry for an online writing contest."
            href="https://www.honeyfeed.fm/novels/4773"
            action="Read on Honeyfeed"
          />
          <DetailProjectCard
            kicker="2023 · FINAL-YEAR PROJECT"
            title="Skipped a Beat — the game"
            description="I returned to the story and adapted it into a Unity narrative adventure for my final-year project."
            href="https://github.com/Z7X4Y2HQ/Skipped_a_Beat"
            action="View project source"
          />
        </div>
      )}
    </>
  );
}

function DetailOverlay({ topic, isOpen, onClose, onTransitionEnd }) {
  const touchStartRef = useRef(null);
  const contentRef = useRef(null);
  const details = detailTopics[topic];

  const handleTouchStart = (event) => {
    if (event.target.closest?.(".polaroid-lightbox") || event.touches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current || event.changedTouches.length !== 1) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const beganAtBottom = touchStartRef.current.y > window.innerHeight - 140;
    const contentAtTop = !contentRef.current || contentRef.current.scrollTop <= 0;
    touchStartRef.current = null;

    if (Math.abs(deltaY) < 75 || Math.abs(deltaY) < Math.abs(deltaX) * 1.2) return;
    if ((deltaY > 0 && contentAtTop) || (deltaY < 0 && beganAtBottom)) onClose();
  };

  return (
    <section
      className={`detail-cover${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-cover-title"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStartRef.current = null; }}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="detail-cover-scroll" ref={contentRef}>
        <DetailContent topic={topic} />
      </div>
      <button className="detail-back-button" type="button" onClick={onClose} autoFocus>
        <FiChevronDown aria-hidden="true" />
        <span>Back to {details.label.toLowerCase()}</span>
      </button>
    </section>
  );
}

function RotatingQuote({ quotes, isActive }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isActive || quotes.length < 2) {
      setVisible(true);
      return undefined;
    }

    let fadeTimer;
    const rotationTimer = window.setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setQuoteIndex((index) => (index + 1) % quotes.length);
        return;
      }

      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setQuoteIndex((index) => (index + 1) % quotes.length);
        setVisible(true);
      }, 350);
    }, 5000);

    return () => {
      window.clearInterval(rotationTimer);
      window.clearTimeout(fadeTimer);
    };
  }, [isActive, quotes.length]);

  return (
    <blockquote
      className={`teacher-quote accentable rotating-quote${visible ? " is-visible" : ""}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {quotes[quoteIndex]}
    </blockquote>
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

function Panel({ id, image, className = "", children, activeSection, onNavigate, onOpenDetail }) {
  const canExplore = Boolean(detailTopics[id]);

  return (
    <section
      className={`panel photo-panel ${className}`}
      id={id}
      aria-labelledby={`${id}-title`}
      style={{ "--panel-image": `url("${image}")` }}
    >
      <div className="panel-backdrop" aria-hidden="true">
        <div className="panel-photo" />
        <div className="panel-shade" />
      </div>
      {children}
      {canExplore && activeSection === id && (
        <button
          className="explore-more-button mobile-explore-more-button"
          type="button"
          aria-label={`Explore more about ${detailTopics[id].label.toLowerCase()}`}
          onClick={() => onOpenDetail(id)}
        >
          <span>Explore more</span>
          <FiChevronUp aria-hidden="true" />
        </button>
      )}
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
  const [detailTopic, setDetailTopic] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailCloseTimerRef = useRef(null);
  const detailOpenFramesRef = useRef([]);

  const openDetail = (topic) => {
    window.clearTimeout(detailCloseTimerRef.current);
    detailOpenFramesRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
    detailOpenFramesRef.current = [];
    setDetailTopic(topic);
    setIsDetailOpen(false);
    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => setIsDetailOpen(true));
      detailOpenFramesRef.current = [secondFrame];
    });
    detailOpenFramesRef.current = [firstFrame];
  };

  const closeDetail = useCallback(() => {
    detailOpenFramesRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
    detailOpenFramesRef.current = [];
    setIsDetailOpen(false);
    window.clearTimeout(detailCloseTimerRef.current);
    detailCloseTimerRef.current = window.setTimeout(() => setDetailTopic(null), 700);
  }, []);

  const handleDetailTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || isDetailOpen) return;
    window.clearTimeout(detailCloseTimerRef.current);
    setDetailTopic(null);
  };

  useHorizontalScroll(trackRef);

  useEffect(() => () => {
    window.clearTimeout(detailCloseTimerRef.current);
    detailOpenFramesRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
  }, []);

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
      if (detailTopic && event.key === "Escape") {
        if (event.target instanceof HTMLElement && event.target.closest("dialog")) return;
        event.preventDefault();
        closeDetail();
        return;
      }
      if (detailTopic) {
        if (event.key === "ArrowDown" && !(event.target instanceof HTMLElement && event.target.closest("dialog"))) {
          event.preventDefault();
          closeDetail();
        }
        return;
      }
      if (event.key === "ArrowUp" && detailTopics[activeSection]) {
        event.preventDefault();
        openDetail(activeSection);
        return;
      }
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
  }, [activeSection, closeDetail, detailTopic]);

  return (
    <div className={`app-shell opening-sequence${introRevealed ? " intro-revealed" : ""} has-underline${detailTopic ? " has-detail" : ""}`}>
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

      <main
        className="scroll-container"
        ref={trackRef}
        aria-label="Areeb's portfolio"
        inert={detailTopic ? "" : undefined}
        aria-hidden={detailTopic ? "true" : undefined}
      >
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
                  <em>“How to start talking about myself?”</em> A question he often asked when interviewed.
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
          onOpenDetail={openDetail}
        >
          <div className="panel-inner skills-inner">
            <Eyebrow number="03">WEB DEVELOPMENT</Eyebrow>
            <h2 className="section-title" id="web-title">
              Curiosity turned into{" "}
              <span className="heading-ending">
                <span className="accentable">code.</span>
                <span className="heading-aside">(Not Really)</span>
              </span>
            </h2>
            <div className="story-copy">
              <blockquote className="teacher-quote accentable">
                "Don't just introduce yourself, talk about yourself"
              </blockquote>
              <p>
                interrupts the interviewer, breaking Z7X4Y2HQ's confidence... "
                <em>How does one introduce themselves?</em>" he thought to himself...
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
              Just throwing some Web Dev jargon out there to make it sound like I know shit. We all know who's doing all
              the hard work ;)
            </WebToolkit>
          </div>
        </Panel>

        <Panel
          id="games"
          image={Rwby}
          className="skills-panel game-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
          onOpenDetail={openDetail}
        >
          <div className="panel-inner game-inner">
            <div className="game-copy">
              <Eyebrow number="04">GAME DEVELOPMENT</Eyebrow>
              <h2 className="section-title" id="games-title">
                A little about <span className="accentable">games.</span>
              </h2>
              <div className="story-copy">
                <p>To which the interviewer tries to relax him by saying:</p>
                <blockquote className="teacher-quote accentable">"Don't worry, this isn't a hard interview"</blockquote>
                <p>
                  <em>So much for Keeping composure...</em>
                </p>
                <blockquote className="teacher-quote accentable">
                  "Take a few minutes to relax and we'll continue the interview then"
                </blockquote>
                <p>
                  <em>So much for first impressions...</em>
                </p>
              </div>
              <a
                className="text-link"
                href="#story"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo("photos");
                }}
              >
                Click me! <FiArrowRight aria-hidden="true" />
              </a>
              <WebToolkit
                groups={gameToolkit}
                title="GAME DEVELOPMENT TOOLKIT"
                ariaLabel="Game development tools"
                className="game-toolkit"
                captionClassName="game-toolkit-caption"
              >
                I was never interested in Game Development, until I started working on my FYP. Figured a Game might be
                the best way i can show off my writing. Haven't worked on anything since the FYP tho.
              </WebToolkit>
            </div>
            <Polaroid
              image={Stadia}
              alt="A Stadia controller on a desk"
              Title="Stadia controller"
              description="A close-up of the controller beside its wireless adapter."
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
          onOpenDetail={openDetail}
        >
          <div className="panel-inner gallery-inner">
            <div className="gallery-layout">
              <div className="gallery-copy">
                <Eyebrow number="05">PHOTOGRAPHY</Eyebrow>
                <h2 className="section-title" id="photos-title">
                  Little things I <span className="accentable">noticed.</span>
                </h2>
                <div className="story-copy">
                  <p>3 minutes pass by... Z7X4Y2HQ hasn't said a word since.</p>
                  <blockquote className="teacher-quote accentable">
                    "I see in your resume; your FYP was in Game Development, howcome you're applying for a Web Development role?"
                  </blockquote>
                  <p>Why indeed... Saying Web Development pays better might not be the right response here</p>
                  <RotatingQuote quotes={interviewQuotes} isActive={activeSection === "photos"} />
                  <p><em>Maybe I shouldn't have said that...</em></p>
                  <blockquote className="teacher-quote accentable">
                    "I see"
                  </blockquote>
                </div>
                <a
                  className="text-link"
                  href="#story"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo("writing");
                  }}
                >
                  You know what to do... <FiArrowRight aria-hidden="true" />
                </a>
              </div>
              <div className="photo-grid">
                {galleryPhotos.map((photo, index) => (
                  <Polaroid
                    key={photo.id}
                    image={photo.image}
                    alt={photo.alt}
                    Title={photo.title}
                    description={photo.description}
                    className="photo-card"
                    float="right"
                    delay={`${350 + index * 100}ms`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          id="writing"
          image={Bakery}
          className="writing-panel"
          activeSection={activeSection}
          onNavigate={navigateTo}
          onOpenDetail={openDetail}
        >
          <div className="panel-inner writing-inner">
            <div className="writing-copy">
              <Eyebrow number="06">WRITING</Eyebrow>
              <h2 className="section-title" id="writing-title">
                Finding the <span className="accentable">right feeling.</span>
              </h2>
              <div className="story-copy">
                <p>
                  In 2021, I took part in an online writing contest and wrote my first novel, about 75,000 words long.
                </p>
                <p>No title on this page yet. Just the milestone that made it here.</p>
              </div>
              <a className="text-link" href="https://github.com/Z7X4Y2HQ" target="_blank" rel="noopener noreferrer">
                Find me on GitHub <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <Polaroid
              image={Moon}
              alt="A crescent moon in a violet evening sky"
              Title="A quiet evening"
              description="A slim crescent moon hangs above treetops at dusk."
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
      {detailTopics[activeSection] && (
        <button
          className={`explore-more-button${detailTopic ? " is-hidden" : ""}`}
          type="button"
          aria-label={`Explore more about ${detailTopics[activeSection].label.toLowerCase()}`}
          aria-hidden={Boolean(detailTopic)}
          disabled={Boolean(detailTopic)}
          onClick={() => openDetail(activeSection)}
        >
          <span>Explore more</span>
          <FiChevronUp aria-hidden="true" />
        </button>
      )}
      {detailTopic && (
        <DetailOverlay
          topic={detailTopic}
          isOpen={isDetailOpen}
          onClose={closeDetail}
          onTransitionEnd={handleDetailTransitionEnd}
        />
      )}
    </div>
  );
}
