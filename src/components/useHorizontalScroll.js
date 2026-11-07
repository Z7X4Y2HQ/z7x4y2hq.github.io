import { useEffect } from "react";

export function useHorizontalScroll(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const onWheel = (event) => {
      if (window.matchMedia("(max-width: 760px)").matches) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (event.ctrlKey) return;

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [ref]);
}
