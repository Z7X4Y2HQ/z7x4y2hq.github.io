import { useEffect, useRef, useState } from "react";

// Original rotating greeting behavior, with the delayed timers cleaned up on unmount.
export function FadeText({ array, className, class: legacyClass }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const hasStarted = useRef(false);
  const interval = 2700;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let fadeTimeout;
    let wordTimeout;
    const startTimeout = window.setTimeout(() => {
      hasStarted.current = true;
      fadeTimeout = window.setTimeout(() => setFade(false), interval / 2);
      wordTimeout = window.setTimeout(() => {
        setWordIndex((index) => (index + 1) % array.length);
        setFade(true);
      }, interval);
    }, hasStarted.current ? 0 : 3000);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(wordTimeout);
    };
  }, [wordIndex, array.length]);

  return <div className={`${className || legacyClass || ""} ${fade ? "fade-in" : "fade-out"}`} aria-live="off">{array[wordIndex]}</div>;
}
