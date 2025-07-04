import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * PUBLIC_INTERFACE
 * Generates a PDF with all slides rendered as in the slide viewer, including branding, images, and layout matching.
 * Each slide is rendered to an off-screen div and sequentially captured and added as a page in the PDF.
 *
 * @param {Object[]} slides - Array of slide objects, each with a .render property (function or JSX).
 * @param {function} SlideComponent - The React component used for rendering an individual slide.
 * @param {string} logoPath - Public URL path to logo image for branding.
 * @returns {Promise<void>}
 */
/**
 * PUBLIC_INTERFACE
 * Generates a multi-slide PDF with all slides as they appear in the viewer, including branding and logos.
 * Handles async image load and DOM rendering issues for consistent output.
 * @param {Object[]} slides - Array of slide objects with a .render property (function or JSX).
 * @param {function} SlideComponent - React component for rendering a slide.
 * @param {string} logoPath - Public URL path to logo image for branding.
 * @returns {Promise<void>}
 */
export async function exportSlidesAsPDF({ slides, SlideComponent, logoPath }) {
  // PDF page matches slide/card size; A4 landscape(like PowerPoint export).
  const PDF_WIDTH = 850;
  const PDF_HEIGHT = 530;
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [PDF_WIDTH, PDF_HEIGHT],
    compress: true,
    putOnlyUsedFonts: true
  });

  // Ensure DOM is ready and any loading overlay is hidden before starting
  // Helper: Render a slide to off-screen DOM, wait for all images and fonts, then capture
  async function renderSlideToImage(slideNum) {
    return new Promise((resolve) => {
      // Create container for off-screen rendering
      const container = document.createElement("div");
      container.id = `pdf-slide-preview-${slideNum + 1}`;
      Object.assign(container.style, {
        position: "fixed",
        left: "-99999px",
        top: "0px",
        width: PDF_WIDTH + "px",
        height: PDF_HEIGHT + "px",
        background: "#fff",
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
        boxSizing: "border-box",
      });
      document.body.appendChild(container);

      // Function to wait for all <img> elements to load
      function waitForImagesLoaded(node, timeout = 2200) {
        const imgs = node.querySelectorAll("img");
        if (imgs.length === 0) return Promise.resolve();
        let loadedCount = 0;
        let erroredCount = 0;
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
          setTimeout(resolveImgs, timeout); // fallback after a max wait
        });
      }

      // Render slide content
      import("react-dom").then((ReactDOM) => {
        ReactDOM.render(
          <SlideComponent
            slideNumber={slideNum + 1}
            totalSlides={slides.length}
            render={slides[slideNum].render}
            pdfMode={true}
            logoPath={logoPath}
          />,
          container,
          async () => {
            // Wait for images (logo, etc) to load
            await waitForImagesLoaded(container, 2200);
            // Wait a tick for Google Fonts (if used)
            if (document.fonts && document.fonts.ready) {
              await document.fonts.ready;
            }
            // Short extra wait to maximize render stability
            setTimeout(async () => {
              try {
                const canvas = await html2canvas(container, {
                  backgroundColor: "#fff",
                  scale: 2, // sharper print, but keep RAM OK
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
            }, 120); // Slight delay after DOM ready (may tune ~100-200ms)
          }
        );
      });
    });
  }

  // Sequentially render every slide to an image and add to PDF
  for (let i = 0; i < slides.length; ++i) {
    // eslint-disable-next-line no-await-in-loop
    const { imgData, error } = await renderSlideToImage(i);
    if (error || !imgData) {
      // Could optionally alert or log error for this slide
      continue;
    }
    if (i !== 0) pdf.addPage([PDF_WIDTH, PDF_HEIGHT], "landscape");
    pdf.addImage(imgData, "JPEG", 0, 0, PDF_WIDTH, PDF_HEIGHT);
  }

  // Save dialog (triggers PDF download)
  pdf.save("Vlinder_Slides_Deck.pdf");
}
