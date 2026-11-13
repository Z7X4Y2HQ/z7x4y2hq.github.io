import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiMaximize2, FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";

// Reused from Cool-Ass-Website's original image Polaroid component.
export function Polaroid(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef(null);
  const imageStageRef = useRef(null);
  const lightboxImageRef = useRef(null);
  const zoomScale = 1.8;

  useEffect(() => {
    if (isExpanded && lightboxRef.current && !lightboxRef.current.open) {
      lightboxRef.current.showModal();
    }
  }, [isExpanded]);

  const toggleZoom = () => {
    setIsZoomed((zoomed) => !zoomed);
    setPan({ x: 0, y: 0 });
  };

  const panImage = (event) => {
    if (!isZoomed || !imageStageRef.current || !lightboxImageRef.current) return;

    const stage = imageStageRef.current.getBoundingClientRect();
    const image = lightboxImageRef.current;
    const maxX = Math.max(0, (image.offsetWidth * zoomScale - stage.width) / 2);
    const maxY = Math.max(0, (image.offsetHeight * zoomScale - stage.height) / 2);
    const pointerX = ((event.clientX - stage.left) / stage.width) * 2 - 1;
    const pointerY = ((event.clientY - stage.top) / stage.height) * 2 - 1;

    setPan({ x: -pointerX * maxX, y: -pointerY * maxY });
  };

  const styles = {
    polaroidContainer: {
      fontSize: 0,
      backgroundColor: "var(--polaroid-frame-color, rgb(255 235 205 / 9%))",
      backdropFilter: "var(--polaroid-backdrop-filter, blur(6px))",
      WebkitBackdropFilter: "var(--polaroid-backdrop-filter, blur(6px))",
      margin: props.float === "left" ? "0.6vw 1.3vw 1.3vw 0" : "0.6vw 0 1.3vw 1.3vw",
      flexShrink: 0,
      opacity: 0,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      float: props.float,
      borderRadius: "var(--polaroid-outer-radius, 1vw)",
      border: "0.4vw solid var(--polaroid-border-color, rgb(255 235 205 / 16%))",
      animation: "fade-in 1.5s forwards",
      animationDelay: props.delay || "0s",
      transition: "0.2s",
    },
    polaroidImage: {
      backgroundColor: "white",
      backgroundImage: `url(${props.image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center bottom",
      width: "var(--polaroid-width, 17vw)",
      height: "var(--polaroid-height, 19vw)",
      borderRadius: "var(--polaroid-image-radius, 0.65vw)",
    },
    polaroidOverTitle: {
      fontSize: "var(--polaroid-overlay-size, 1.34vw)",
      backgroundColor: "var(--polaroid-frame-color, rgb(255 235 205 / 9%))",
      backdropFilter: "var(--polaroid-backdrop-filter, blur(6px))",
      WebkitBackdropFilter: "var(--polaroid-backdrop-filter, blur(6px))",
      display: "inline-block",
      borderRadius: "var(--polaroid-image-radius, 0.65vw)",
      margin: "0.6vw",
      padding: "var(--polaroid-overlay-padding, 0.4vw 0.6vw)",
      opacity: 1,
      color: "var(--polaroid-caption-color, #fff4e2)",
    },
  };

  return (
    <div
      className={`polaroid ${props.className || ""}`}
      role="figure"
      aria-label={props.alt || props.Title}
      style={styles.polaroidContainer}
    >
      <div
        className="polaroid-image"
        style={styles.polaroidImage}
        onClick={() => setIsExpanded(true)}
      >
        <div className="polaroid-overlay-title" style={styles.polaroidOverTitle}>{props.Title}</div>
        <button
          className="polaroid-expand"
          type="button"
          aria-label={`Expand ${props.Title}`}
          onClick={(event) => {
            event.stopPropagation();
            setIsExpanded(true);
          }}
        >
          <FiMaximize2 aria-hidden="true" />
        </button>
      </div>
      {isExpanded && createPortal(
        <dialog
          className="polaroid-lightbox"
          ref={lightboxRef}
          aria-labelledby="polaroid-lightbox-title"
          onClose={() => {
            setIsExpanded(false);
            setIsZoomed(false);
            setPan({ x: 0, y: 0 });
          }}
          onClick={(event) => {
            const selection = window.getSelection();
            if (
              selection &&
              !selection.isCollapsed &&
              event.target.closest?.(".polaroid-lightbox-info")
            ) return;
            if (lightboxImageRef.current?.contains(event.target)) return;
            if (isZoomed) {
              setIsZoomed(false);
              setPan({ x: 0, y: 0 });
            } else {
              lightboxRef.current?.close();
            }
          }}
        >
          <button
            className="polaroid-lightbox-close"
            type="button"
            aria-label="Close image"
            autoFocus
            onClick={(event) => {
              event.stopPropagation();
              lightboxRef.current?.close();
            }}
          >
            <FiX aria-hidden="true" />
          </button>
          <div className="polaroid-lightbox-content">
            <div
              className={`polaroid-lightbox-stage${isZoomed ? " is-zoomed" : ""}`}
              ref={imageStageRef}
              onPointerMove={panImage}
              onClick={toggleZoom}
            >
              <img
                ref={lightboxImageRef}
                src={props.image}
                alt={props.alt || props.Title}
                draggable="false"
                style={{
                  transform: isZoomed
                    ? `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`
                    : "translate(0, 0) scale(1)",
                }}
              />
            </div>
            <div className="polaroid-lightbox-info">
              <h2 id="polaroid-lightbox-title">{props.Title}</h2>
              <p>{props.description || props.alt}</p>
              <button
                className="polaroid-lightbox-zoom"
                type="button"
                aria-label={isZoomed ? "Reset image zoom" : "Magnify image"}
                aria-pressed={isZoomed}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleZoom();
                }}
              >
                {isZoomed ? <FiZoomOut aria-hidden="true" /> : <FiZoomIn aria-hidden="true" />}
                {isZoomed ? "Reset view" : "Magnify"}
              </button>
            </div>
          </div>
        </dialog>,
        document.body,
      )}
    </div>
  );
}
