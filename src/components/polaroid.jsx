import { useState } from "react";

// Reused from Cool-Ass-Website's original image Polaroid component.
export function Polaroid(props) {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    polaroidContainer: {
      fontSize: 0,
      backgroundColor: "blanchedalmond",
      margin: props.float === "left" ? "0.6vw 1.3vw 1.3vw 0" : "0.6vw 0 1.3vw 1.3vw",
      flexShrink: 0,
      opacity: 0,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      float: props.float,
      borderRadius: "var(--polaroid-outer-radius, 1vw)",
      border: "0.4vw solid #ccbca4",
      borderBottom: isHovered ? "0.4vw solid #ccbca4" : "none",
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
      height: isHovered
        ? "var(--polaroid-hover-height, 21.6vw)"
        : "var(--polaroid-height, 19vw)",
      borderRadius: "var(--polaroid-image-radius, 0.65vw)",
      transition: "0.2s",
    },
    polaroidTitle: {
      color: "black",
      fontSize: isHovered
        ? "var(--polaroid-title-hover-size, 0vw)"
        : "var(--polaroid-title-size, 1.34vw)",
    },
    polaroidTitleContainer: {
      display: "flex",
      width: "86%",
      alignItems: "center",
      margin: isHovered
        ? "var(--polaroid-caption-hover-margin, 0)"
        : "var(--polaroid-caption-margin, 0.5vw 0)",
    },
    polaroidOverTitle: {
      fontSize: isHovered ? "var(--polaroid-overlay-size, 1.34vw)" : "0vw",
      backgroundColor: "blanchedalmond",
      display: "inline-block",
      borderRadius: "var(--polaroid-image-radius, 0.65vw)",
      margin: isHovered ? "0.6vw" : 0,
      padding: "var(--polaroid-overlay-padding, 0.4vw 0.6vw)",
      opacity: isHovered ? 1 : 0,
      color: "black",
      transition: "0.2s",
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
        aria-hidden="true"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={styles.polaroidImage}
      >
        <div className="polaroid-overlay-title" style={styles.polaroidOverTitle}>{props.Title}</div>
      </div>
      <div className="polaroid-title-container" style={styles.polaroidTitleContainer}>
        <div className="polaroid-title" style={styles.polaroidTitle}>{props.Title}</div>
      </div>
    </div>
  );
}
