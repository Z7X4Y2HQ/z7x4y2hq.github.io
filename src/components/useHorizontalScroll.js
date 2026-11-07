import { useEffect } from "react";

export function useHorizontalScroll(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const onWheel = (event) => {
      if (window.matchMedia("(max-width: 760px)").matches) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (event.ctrlKey) return;

      const panel = event.target instanceof Element ? event.target.closest(".panel") : null;
      if (panel && panel.scrollHeight > panel.clientHeight + 1) {
        const atTop = panel.scrollTop <= 0;
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) return;
      }

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [ref]);
}
