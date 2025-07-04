import React from "react";
import VlinderLogo from "./VlinderLogo";
import SlideImage from "./SlideImage";

// PUBLIC_INTERFACE
function Slide({ slideNumber, title, body, diagram, branding, totalSlides }) {
  /**
   * Slide rendering logic — Slide is centered and responsive, displays logo, diagrams, etc.
   * slideNumber: int (1-based)
   * title: string
   * body: JSX/string
   * diagram: optional image src or <SlideImage />
   * branding: boolean — if true, show Vlinder logo
   */
  return (
    <main
      style={{
        margin: "0 auto",
        maxWidth: 660,
        minHeight: 340,
        background: "var(--bg-secondary)",
        borderRadius: 18,
        boxShadow: "0 8px 24px rgba(40,44,52,0.09)",
        padding: "2.5rem 2rem 2rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      aria-label={`Slide ${slideNumber} of ${totalSlides}`}
      tabIndex={0}
    >
      {branding && (
        <div style={{ alignSelf: "flex-end", marginBottom: "-18px" }}>
          <VlinderLogo style={{ width: 56, height: 56 }} />
        </div>
      )}
      <h2 style={{ marginTop: branding ? 0 : 8, color: "#1565c0" }}>{title}</h2>
      <div
        style={{
          margin: "16px 0",
          fontSize: "1.13rem",
          color: "var(--text-primary)",
        }}
      >
        {body}
      </div>
      {diagram && (
        <div style={{ margin: "14px 0 10px 0" }}>
          <SlideImage src={diagram} alt="Diagram" />
        </div>
      )}
      <footer style={{ marginTop: "auto", color: "#b0b0b0", fontSize: 13 }}>
        Slide {slideNumber} / {totalSlides}
      </footer>
    </main>
  );
}

export default Slide;
