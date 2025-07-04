import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from "react";
import { getBlockComponent } from "./components/BlockRegistry";
import ReactDOM from "react-dom";

/**
 * PUBLIC_INTERFACE
 * Exports modular slides to a PDF file, rendering all types of blocks as seen in the slide viewer,
 * including layouts/rows/grids, dynamic logo, diagrams, and images, to the greatest possible visual fidelity.
 * Preserves composition/nesting and all registered block types in correct order.
 * 
 * @param {Object[]} slides - Array of slide objects, each with `components` (modular blocks).
 * @param {Component} SlideComponent - Slide rendering component (for legacy/compat), fallback if needed.
 * @param {string} logoPath - logo image path or Data URL for branding.
 * @returns {Promise<void>}
 */
export async function exportSlidesAsPDF({ slides, SlideComponent, logoPath }) {
  // PDF page size matches slide: use A4-ish landscape but adjust to viewer's aspect (fits max 850x530).
  const PDF_WIDTH = 850;
  const PDF_HEIGHT = 530;
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [PDF_WIDTH, PDF_HEIGHT],
    compress: true,
    putOnlyUsedFonts: true,
  });

  // Helper: render modular blocks (including layout blocks) to React DOM for html2canvas
  function renderModularBlocks(blocks, logoDataUrl) {
    // Support for all slide block types: text, logo, image, diagram, etc.
    // Also supports custom layout/compositional blocks (layout-row, layout-grid, block, footer, etc.).
    // This recursively renders children for nested or layout blocks.

    function renderBlock(blk, idx) {
      if (!blk) return null;

      // Layout ROW: horizontal flex row
      if (blk.type === "layout-row" || blk.type === "row") {
        return (
          <div
            key={blk.key || idx}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap:  blk.gap ?? 22,
              ...(blk.style || {}),
            }}
          >
            {(blk.children || []).map((child, cidx) =>
              renderBlock(child, cidx)
            )}
          </div>
        );
      }
      // Layout GRID: grid layout (columns || rows)
      if (blk.type === "layout-grid") {
        const columns = blk.columns || 2;
        return (
          <div
            key={blk.key || idx}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: blk.gap ?? 14,
              width: "100%",
              ...(blk.style || {})
            }}
          >
            {(blk.children || []).map((child, cidx) => renderBlock(child, cidx))}
          </div>
        );
      }
      // Block: generic vertical block/group
      if (blk.type === "block") {
        return (
          <div
            key={blk.key || idx}
            className="slide-block"
            style={blk.style || {}}
          >
            {(blk.children || []).map((child, cidx) =>
              renderBlock(child, cidx)
            )}
          </div>
        );
      }
      // Spacer: flex grow (vertical spacing)
      if (blk.type === "spacer") {
        return (
          <div
            key={blk.key || idx}
            style={{
              flex: blk.flex || 1,
              minHeight: blk.minHeight || 10,
              ...blk.style,
            }}
          />
        );
      }
      // Footer: footer box (special branding/rights blocks)
      if (blk.type === "footer") {
        return (
          <div
            key={blk.key || idx}
            className="slide-footer"
            style={{
              ...blk.style,
              color: "var(--footer-text, #878787)",
              fontSize: ".91rem"
            }}
          >
            {blk.text}
          </div>
        );
      }
      // List: list or bullet points, maybe nested
      if (blk.type === "list") {
        function renderList(items, level = 0) {
          return (
            <ul style={{
              marginTop: level === 0 ? 0 : 4,
              marginBottom: 0,
              marginLeft: level ? 18 : 0,
              ...blk.style,
            }}>
              {items.map((item, i) => (
                Array.isArray(item)
                  ? renderList(item, level + 1)
                  : <li key={i} style={{ marginBottom: 2 }}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <div key={blk.key || idx} style={blk.style}>
            {renderList(blk.items || [])}
          </div>
        );
      }
      // Badges row: badges for highlights
      if (blk.type === "badges-row") {
        return (
          <div
            key={blk.key || idx}
            className="slide-badge-row"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 17,
              ...(blk.style || {}),
            }}
          >
            {(blk.badges || []).map((b, bidx) => (
              <div
                key={b.text || bidx}
                className={`slide-badge${b.style ? " "+b.style : ""}`}
                style={{
                  minWidth: 92,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  borderRadius: 20,
                  padding: "7px 20px",
                  fontSize: "1.08rem",
                }}
              >
                {b.text}
              </div>
            ))}
          </div>
        );
      }
      // Platform card: custom card for platforms
      if (blk.type === "platform-card") {
        return (
          <div
            key={blk.key || idx}
            className="platform-card"
            style={{
              background: "var(--muted-bg, #f7fafc)",
              borderRadius: 11,
              padding: "17px 13px 14px 13px",
              boxShadow: "0 1px 5px rgba(70,140,175,0.04)",
              textAlign: "center",
              borderTop: `6px solid ${blk.color || "#1865b0"}`,
              ...(blk.style || {}),
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 19, color: blk.color || "#222" }}>{blk.platform}</div>
            <div style={{ fontSize: 13, margin: "10px 0 0", color: "#666" }}>{blk.description}</div>
          </div>
        );
      }
      // Diagram Placeholder: Insert a visual placeholder for diagrams/screenshots if manual
      if (blk.type === "diagram-placeholder" || blk.type === "image-placeholder") {
        return (
          <div key={blk.key || idx} className="diagram-placeholder" style={{
            background: "#e5eefb",
            border: "2px dashed #b5cee6",
            height: 180,
            minWidth: "90%",
            color: "#6d7c9c",
            fontSize: "1.12rem",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            margin: "22px 0 16px 0",
            ...(blk.style || {}),
          }}>
            {blk.text || "[Diagram Placeholder]"}
          </div>
        );
      }

      // Block Registry: registered components—text, image, diagram, logo, etc.
      const Comp = getBlockComponent(blk.type);
      if (!!Comp) {
        // Special handling for logo (inject logoDataUrl as required)
        if (blk.type === "logo") {
          return <Comp key={blk.key || idx} {...blk} logoDataUrl={logoDataUrl} />;
        }
        // Diagram block: always treat diagrams "readonly" for PDF export
        if (blk.type === "diagram") {
          return <Comp key={blk.key || idx} {...blk} editable={false} />;
        }
        return <Comp key={blk.key || idx} {...blk} />;
      }

      // Unknown type fallback (for debug/future) 
      return (
        <div key={blk.key || idx} style={blk.style}>
          [Unsupported block type: {blk.type}]
        </div>
      );
    }
    return blocks.map((blk, idx) => renderBlock(blk, idx));
  }

  // Sequentially render each slide as modular blocks or via SlideComponent fallback, and save as PDF pages.
  async function renderSlideToImage(slide, slideNum, totalSlides) {
    // Try modular path first (which matches Slide.js modular rendering), fallback SlideComponent for legacy.
    return new Promise(resolve => {
      // Create off-screen container for rendering
      const container = document.createElement("div");
      container.id = `pdf-slide-render-${slideNum + 1}`;
      Object.assign(container.style, {
        position: "fixed",
        left: "-99999px",
        top: "0px",
        width: `${PDF_WIDTH}px`,
        minHeight: `${PDF_HEIGHT}px`,
        maxWidth: `${PDF_WIDTH}px`,
        maxHeight: `${PDF_HEIGHT}px`,
        background: "#fff",
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
        boxSizing: "border-box",
        display: "block",
        padding: "0px",
        margin: "0px",
      });

      document.body.appendChild(container);

      // Function to wait for all <img> elements to load in a node
      function waitForImagesLoaded(node, timeout = 2400) {
        const imgs = node.querySelectorAll("img");
        if (imgs.length === 0) return Promise.resolve();
        let loadedCount = 0, erroredCount = 0;
        return new Promise((resolveImgs) => {
          function checkDone() {
            if (loadedCount + erroredCount === imgs.length) resolveImgs();
          }
          imgs.forEach(img => {
            if (img.complete) {
              loadedCount++;
              checkDone();
            } else {
              img.onload = () => { loadedCount++; checkDone(); };
              img.onerror = () => { erroredCount++; checkDone(); };
            }
          });
          setTimeout(resolveImgs, timeout); // fallback upper bound
        });
      }

      // The block modular path:
      let mainEl = null;
      if (Array.isArray(slide.components)) {
        mainEl = (
          <div
            className="pdf-slide"
            style={{
              width: "100%",
              minHeight: PDF_HEIGHT,
              maxWidth: PDF_WIDTH,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 8px 18px rgba(40,44,52,0.09)",
              padding: "3.3rem 3.6rem 3.0rem 3.6rem",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {renderModularBlocks(slide.components, logoPath)}
            <div
              style={{
                position: "absolute",
                right: 24,
                bottom: 18,
                color: "#bababa",
                fontSize: 15,
              }}
            >
              Slide {slideNum + 1} / {totalSlides}
            </div>
          </div>
        );
      } else {
        // fallback: use SlideComponent and slide as prop (legacy JSX slide)
        mainEl = (
          <SlideComponent
            slideNumber={slideNum + 1}
            totalSlides={totalSlides}
            render={slide.render}
            pdfMode={true}
            logoPath={logoPath}
          />
        );
      }

      import("react-dom").then((ReactDOM) => {
        ReactDOM.render(mainEl, container, async () => {
          await waitForImagesLoaded(container, 2300);
          // wait for fonts if needed
          if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
          }
          setTimeout(async () => {
            try {
              const canvas = await html2canvas(container, {
                backgroundColor: "#fff",
                scale: 2, // high-res for print
                useCORS: true,
                allowTaint: true,
                logging: false,
                windowWidth: PDF_WIDTH,
                windowHeight: PDF_HEIGHT,
              });
              const imgData = canvas.toDataURL("image/jpeg", 0.98);
              resolve({ imgData, width: canvas.width, height: canvas.height });
            } catch (error) {
              resolve({ error });
            } finally {
              ReactDOM.unmountComponentAtNode(container);
              container.remove();
            }
          }, 110); // extra tick to render
        });
      });
    });
  }

  // Render each slide and add to PDF
  for (let i = 0; i < slides.length; ++i) {
    // eslint-disable-next-line no-await-in-loop
    const { imgData, error } = await renderSlideToImage(slides[i], i, slides.length);
    if (error || !imgData) continue;
    if (i !== 0) pdf.addPage([PDF_WIDTH, PDF_HEIGHT], "landscape");
    pdf.addImage(imgData, "JPEG", 0, 0, PDF_WIDTH, PDF_HEIGHT);
  }

  // Save the output PDF
  pdf.save("Vlinder_Slides_Deck.pdf");
}
