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
export async function exportSlidesAsPDF({ slides, SlideComponent, logoPath }) {
  // PDF settings: approx size as A4 landscape, matching slide aspect ratio
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [850, 530], // width x height (matches slide/card size)
    compress: true,
    putOnlyUsedFonts: true
  });

  // Helper: render slide into off-DOM, capture as image, then remove
  async function renderSlideToImage(slideNum) {
    return new Promise((resolve) => {
      const container = document.createElement("div");
      // Optional: ID to help debug
      container.id = `pdf-slide-preview-${slideNum + 1}`;
      // Style: mimic viewer, invisible, fixed position, right size
      Object.assign(container.style, {
        position: "fixed",
        left: "-99999px",
        top: "0px",
        width: "850px",
        height: "530px",
        boxSizing: "border-box",
        zIndex: -1,
        background: "white",
        pointerEvents: "none",
      });

      // React: render slide into container
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
            document.body.appendChild(container);
            // Wait a short moment for fonts/images
            setTimeout(async () => {
              try {
                const canvas = await html2canvas(container, {
                  backgroundColor: "#fff",
                  scale: 2,
                  useCORS: true,
                  allowTaint: true,
                  // Image/branding loaded from public if needed
                });
                const imgData = canvas.toDataURL("image/jpeg", 0.98);
                resolve({ imgData, width: canvas.width, height: canvas.height });
              } catch (err) {
                resolve({ error: err });
              } finally {
                ReactDOM.unmountComponentAtNode(container);
                container.remove();
              }
            }, 280); // ~delay for imagery to appear
          }
        );
      });
    });
  }

  // Sequentially render all slides to PDF
  for (let i = 0; i < slides.length; ++i) {
    // eslint-disable-next-line no-await-in-loop
    const { imgData, error } = await renderSlideToImage(i);
    if (error) continue;

    if (i !== 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, 850, 530);
  }

  pdf.save("Vlinder_Slides_Deck.pdf");
}
