import React from "react";
import { getBlockComponent } from "./components/BlockRegistry";

/**
 * PUBLIC_INTERFACE
 * Modular Slide wrapper. If 'render' is a set of modular blocks (as in new deck), dynamically render slide content
 * using a registry keyed by component 'type'. Fallback to rendering JSX/function for legacy compatibility.
 * Props: { slideNumber, totalSlides, render (blocks|JSX|function|object), logoDataUrl }
 */
function Slide({ slideNumber, totalSlides, render, editMode, onBlockUpdate, logoDataUrl }) {
  const isModular =
    Array.isArray(render?.components) &&
    render?.components.every((blk) => blk && typeof blk.type === "string");

  function renderBlocks(blocks) {
    return blocks.map((blk, idx) => {
      const Comp = getBlockComponent(blk.type);

      if (!Comp) {
        return (
          <div key={blk.key || idx} style={blk.style}>
            [Unknown block: {blk.type}]
          </div>
        );
      }

      // -- The special handling for stock blocks --
      if (blk.type === "logo") {
        // For logo block, forward logoDataUrl.
        const { type, ...rest } = blk;
        return <Comp key={blk.key || idx} {...rest} logoDataUrl={logoDataUrl} />;
      }
      if (blk.type === "diagram") {
        // Diagram: live-editable in editor, read-only otherwise.
        const { type, ...rest } = blk;
        return (
          <Comp
            key={blk.key || idx}
            {...rest}
            editable={!!editMode}
            onChange={data => {
              if (onBlockUpdate) onBlockUpdate(idx, { ...blk, ...data });
            }}
          />
        );
      }
      if (blk.type === "layout-row") {
        // Render its children as modular blocks
        // Accept both children as already-rendered or as config; handle config recursively
        const { children = [], ...rest } = blk;
        return (
          <Comp key={blk.key || idx} {...rest}>
            {Array.isArray(children)
              ? children.map((child, cidx) =>
                  // Modular render any subblocks
                  child && typeof child.type === "string"
                    ? renderBlocks([child])[0]
                    : child
                )
              : children}
          </Comp>
        );
      }
      if (blk.type === "spacer") {
        // Map legacy and prop naming
        const { flex = 1, minHeight = 10, style = {}, ...rest } = blk;
        return <Comp key={blk.key || idx} flex={flex} minHeight={minHeight} style={style} {...rest} />;
      }
      if (blk.type === "footer") {
        // FooterBlock: pass text and style
        const { text, style = {}, ...rest } = blk;
        return <Comp key={blk.key || idx} text={text} style={style} {...rest} />;
      }

      // Default handler: pass props as-is
      const { type, ...rest } = blk;
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
