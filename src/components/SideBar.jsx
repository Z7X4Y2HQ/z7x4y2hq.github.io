import { useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiBookOpen, FiCamera, FiCode, FiGrid, FiGithub, FiHome, FiFacebook, FiInstagram, FiLinkedin, FiUser } from "react-icons/fi";
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

function MyAnimeListIcon() {
  return (
    <svg
      className="mal-icon"
      viewBox="-1 6 26 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z" />
    </svg>
  );
}
function RailButton({ label, active = false, pressed, onClick, href, children }) {
  const [pointer, setPointer] = useState(null);
  const tooltipRef = useRef(null);
  const tooltipId = useId();

  useLayoutEffect(() => {
    if (!pointer || !tooltipRef.current) return;
    const tooltip = tooltipRef.current;
    const { width, height } = tooltip.getBoundingClientRect();
    const x = pointer.x + 14 + width > window.innerWidth - 8
      ? pointer.x - width - 14
      : pointer.x + 14;
    const y = pointer.y + 18 + height > window.innerHeight - 8
      ? pointer.y - height - 12
      : pointer.y + 18;
    tooltip.style.left = Math.max(8, Math.min(x, window.innerWidth - width - 8)) + "px";
    tooltip.style.top = Math.max(8, Math.min(y, window.innerHeight - height - 8)) + "px";
  }, [pointer, label]);

  const followPointer = (event) => {
    if (event.pointerType !== "touch") setPointer({ x: event.clientX, y: event.clientY });
  };
  const props = {
    className: "rail-button" + (active ? " is-active" : ""),
    "aria-label": label,
    "aria-describedby": pointer ? tooltipId : undefined,
    onPointerEnter: followPointer,
    onPointerMove: followPointer,
    onPointerLeave: () => setPointer(null),
    onFocus: (event) => {
      if (!event.currentTarget.matches(":focus-visible")) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      setPointer({ x: bounds.right, y: bounds.top });
    },
    onBlur: () => setPointer(null),
    onKeyDown: (event) => {
      if (event.key === "Escape") setPointer(null);
    },
  };

  return (
    <>
      {href ? (
        <a {...props} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
      ) : (
        <button {...props} type="button" aria-pressed={pressed} onClick={onClick}>{children}</button>
      )}
      {pointer && createPortal(
        <span ref={tooltipRef} id={tooltipId} className="rail-tooltip" role="tooltip"
          style={{ left: pointer.x + 14, top: pointer.y + 18 }}>
          {label}
        </span>,
        document.body
      )}
    </>
  );
}

export default function SideBar({ activeSection, onNavigate }) {
  const navigationRef = useRef(null);

  useLayoutEffect(() => {
    const navigation = navigationRef.current;
    if (!navigation) return undefined;
    let frame = 0;

    const revealActiveIcon = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!window.matchMedia("(max-width: 760px)").matches) return;
        const active = navigation.querySelector(".rail-button.is-active");
        if (!active || navigation.scrollWidth <= navigation.clientWidth) return;

        const viewport = navigation.getBoundingClientRect();
        const icon = active.getBoundingClientRect();
        const centered = navigation.scrollLeft
          + (icon.left + icon.width / 2)
          - (viewport.left + navigation.clientWidth / 2);
        const left = Math.max(0, Math.min(centered, navigation.scrollWidth - navigation.clientWidth));
        navigation.scrollTo({
          left,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      });
    };

    revealActiveIcon();
    const observer = new ResizeObserver(revealActiveIcon);
    observer.observe(navigation);
    window.addEventListener("resize", revealActiveIcon);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", revealActiveIcon);
    };
  }, [activeSection]);
  return (
    <aside className="side-rail" aria-label="Page controls">
      <RailButton label="GitHub profile" href="https://github.com/Z7X4Y2HQ"><FiGithub aria-hidden="true" /></RailButton>
      <div className="rail-rule" />
      <nav ref={navigationRef} className="rail-nav" aria-label="Sections">
        {sections.map(({ id, label, icon: Icon }) => (
          <RailButton key={id} label={label} active={activeSection === id} onClick={() => onNavigate(id)}>
            <Icon aria-hidden="true" />
          </RailButton>
        ))}
      </nav>
      <div className="rail-spacer" />
      <div className="rail-rule" />
      <RailButton label="Facebook profile" href="https://www.facebook.com/Z7X4Y2HQ/"><FiFacebook aria-hidden="true" /></RailButton>
      <RailButton label="Instagram profile" href="https://www.instagram.com/z7x4y2hq/"><FiInstagram aria-hidden="true" /></RailButton>
      <RailButton label="LinkedIn profile" href="https://www.linkedin.com/in/areeb-ahmed-3622a82b0/"><FiLinkedin aria-hidden="true" /></RailButton>
      <RailButton label="MyAnimeList profile" href="https://myanimelist.net/profile/Z7X4Y2HQ"><MyAnimeListIcon /></RailButton>
    </aside>
  );
}
