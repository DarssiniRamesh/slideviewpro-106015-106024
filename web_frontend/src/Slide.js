import React from "react";
import { getBlockComponent } from "./components/BlockRegistry";

/**
 * PUBLIC_INTERFACE
 * Modular Slide wrapper. If 'render' is a set of modular blocks (as in new deck), dynamically render slide content
 * using a registry keyed by component 'type'. Fallback to rendering JSX/function for legacy compatibility.
 * Props: { slideNumber, totalSlides, render (blocks|JSX|function|object) }
 */
function Slide({ slideNumber, totalSlides, render }) {
  const isModular =
    Array.isArray(render?.components) &&
    render?.components.every((blk) => blk && typeof blk.type === "string");

  function renderBlocks(blocks) {
    return blocks.map((blk, idx) => {
      // Support nested children (e.g., for layout, blocks, etc. in deck) in a future expansion.
      // For now, just render simple single-level blocks for core types.
      const Comp = getBlockComponent(blk.type);
      if (!Comp) {
        // Unrecognized type: fall back to a div
        return (
          <div key={blk.key || idx} style={blk.style}>
            [Unknown block: {blk.type}]
          </div>
        );
      }
      // Pass all block props (key, text, style, etc.) except "type"
      const { type, ...rest } = blk;
      // Use blk.key for React key if available -- fallback to idx
      return <Comp key={blk.key || idx} {...rest} />;
    });
  }

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
      {isModular
        ? renderBlocks(render.components)
        : typeof render === "function"
        ? render()
        : render}
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 18,
          color: "#bababa",
          fontSize: 15,
        }}
      >
        Slide {slideNumber} / {totalSlides}
      </div>
    </main>
  );
}

export default Slide;
