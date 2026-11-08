import { useCallback, useEffect, useRef, useState } from "react";

export function useSectionNavigation(trackRef, sections) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const destinationRef = useRef(null);

  const navigateTo = useCallback((id) => {
    const track = trackRef.current;
    const target = document.getElementById(id);
    if (!track || !target || !track.contains(target) || !sections.includes(id)) return;

    // A navigation click owns the highlight until its smooth scroll finishes.
    destinationRef.current = id;
    setActiveSection(id);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "nearest",
      inline: "start",
    });
    if (Math.abs(target.getBoundingClientRect().left - track.getBoundingClientRect().left) < 2) {
      destinationRef.current = null;
    }
  }, [trackRef, sections]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    let settleTimer;

    const syncActiveSection = () => {
      frame = 0;
      const left = track.getBoundingClientRect().left;
      const panels = Array.from(track.children).filter((panel) => sections.includes(panel.id));
      if (destinationRef.current) {
        const destination = panels.find((panel) => panel.id === destinationRef.current);
        if (destination && Math.abs(destination.getBoundingClientRect().left - left) >= 2) return;
        destinationRef.current = null;
      }
      const nearest = panels.reduce((best, panel) => {
        return !best || Math.abs(panel.getBoundingClientRect().left - left)
          < Math.abs(best.getBoundingClientRect().left - left) ? panel : best;
      }, null);
      if (nearest) setActiveSection(nearest.id);
    };

    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncActiveSection);
    };
    const finishScroll = () => {
      window.clearTimeout(settleTimer);
      destinationRef.current = null;
      scheduleSync();
    };
    const onScroll = () => {
      scheduleSync();
      // Fallback for browsers without a scrollend event.
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(finishScroll, 180);
    };
    const onManualInput = () => {
      destinationRef.current = null;
      scheduleSync();
    };
    const onResize = () => {
      destinationRef.current = null;
      scheduleSync();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", finishScroll);
    track.addEventListener("wheel", onManualInput, { passive: true });
    track.addEventListener("pointerdown", onManualInput, { passive: true });
    track.addEventListener("touchstart", onManualInput, { passive: true });
    window.addEventListener("resize", onResize);
    syncActiveSection();

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", finishScroll);
      track.removeEventListener("wheel", onManualInput);
      track.removeEventListener("pointerdown", onManualInput);
      track.removeEventListener("touchstart", onManualInput);
      window.removeEventListener("resize", onResize);
    };
  }, [trackRef, sections]);

  return { activeSection, navigateTo };
}