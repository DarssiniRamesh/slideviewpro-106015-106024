import React from "react";

/**
 * PUBLIC_INTERFACE
 * Reusable Slide wrapper for deck slides; expects a `render` prop (function or JSX).
 * Props: { slideNumber, totalSlides, render }
 */
function Slide({ slideNumber, totalSlides, render }) {
  return (
    <main
      style={{
        margin: "0 auto",
        maxWidth: 850,
        minHeight: 420,
        position: "relative",
        background: "var(--primary-bg, #fff)",
        borderRadius: 18,
        boxShadow: "0 8px 24px rgba(40,44,52,0.09)",
        padding: "3.3rem 3.6rem 3.0rem 3.6rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center"
      }}
      aria-label={`Slide ${slideNumber} of ${totalSlides}`}
      tabIndex={0}
    >
      {typeof render === "function" ? render() : render}
      <div style={{
        position: "absolute",
        right: 24,
        bottom: 18,
        color: "#bababa",
        fontSize: 15
      }}>
        Slide {slideNumber} / {totalSlides}
      </div>
    </main>
  );
}

export default Slide;
