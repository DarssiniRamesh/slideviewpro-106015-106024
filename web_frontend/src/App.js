import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Slide from "./Slide";
import VlinderLogo from "./VlinderLogo";
import { SLIDE_DECK_20 } from "./SlideDeck20";
import "./slideDeckTheme.css";
import { exportSlidesAsPDF } from "./PDFExporter";
import SlideEditor from "./SlideEditor";
import { useLogo } from "./LogoProvider";
import BrandingControl from "./BrandingControl";

const SLIDE_COUNT = 20;

/**
 * Persist/load decks to/from JSON.
 * All data for slide deck is { slides: Array, logoDataUrl?: string }
 */
function downloadDeckAsJSON({ slides, logoDataUrl }) {
  const json = JSON.stringify({ slides, logoDataUrl }, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "slide_deck.json";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 300);
}

function triggerLoadDeckFromJSON(onLoad) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.style.display = "none";
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const obj = JSON.parse(event.target.result);
        if (!obj.slides || !Array.isArray(obj.slides)) {
          alert("Invalid deck JSON: missing slides array.");
          return;
        }
        onLoad(obj);
      } catch (err) {
        alert("Error loading deck: Invalid JSON.");
      }
    };
    reader.readAsText(file);
  });
  document.body.appendChild(input);
  input.click();
  setTimeout(() => input.remove(), 2500);
}

function App() {
  const [theme, setTheme] = useState("light");
  const [slideIdx, setSlideIdx] = useState(0);
  const [editorMode, setEditorMode] = useState(false); // Toggle Editor/Player view
  const [editorSlides, setEditorSlides] = useState(null); // To sync deck in editor
  const [deckEpoch, setDeckEpoch] = useState(0); // For reloading SlideEditor on import
  const { logoDataUrl, setLogoDataUrl } = useLogo();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Keyboard navigation (left/right arrows/space) in Player Mode only
  useEffect(() => {
    if (editorMode) return;
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === " ") {
        setSlideIdx((idx) => Math.min(idx + 1, SLIDE_COUNT - 1));
      } else if (e.key === "ArrowLeft") {
        setSlideIdx((idx) => Math.max(idx - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [editorMode]);

  // PUBLIC_INTERFACE
  const nextSlide = useCallback(
    () => setSlideIdx((idx) => Math.min(idx + 1, SLIDE_COUNT - 1)),
    []
  );
  // PUBLIC_INTERFACE
  const prevSlide = useCallback(
    () => setSlideIdx((idx) => Math.max(idx - 1, 0)),
    []
  );

  // PUBLIC_INTERFACE
  const downloadSlidesAsPDF = async () => {
    await exportSlidesAsPDF({
      slides,
      SlideComponent: (props) => (
        <Slide {...props} logoDataUrl={logoDataUrl} />
      ),
      logoPath:
        logoDataUrl ||
        process.env.PUBLIC_URL + "/20250704_094640_vlinder-logo-with-title.png",
    });
  };

  // Use custom editor state if available, otherwise SLIDE_DECK_20
  const slides = SLIDE_DECK_20;

  return (
    <div className="App">
      <header
        style={{
          width: "100%",
          padding: "18px 20px 8px 20px",
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          height: editorMode ? 114 : 68,
          flexDirection: "column",
        }}
      >
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}>
          <VlinderLogo logoDataUrl={logoDataUrl} style={{ width: 40, height: 40, marginRight: 16 }} />
          <div
            style={{
              fontWeight: 600,
              fontSize: 22,
              color: "#1565c0",
              letterSpacing: "1px",
            }}
          >
            Vlinder + Klefki: Privacy-Preserving Proposal
          </div>
          <div style={{ flex: 1 }} />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              position: "static",
              marginLeft: 18,
            }}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button
            onClick={downloadSlidesAsPDF}
            style={{
              marginLeft: 12,
              background: "#1565c0",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "9px 22px",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "0 2px 6px rgba(21,101,192,0.07)",
              cursor: "pointer",
              transition: "background .23s",
            }}
          >
            Download PDF
          </button>
          <button
            onClick={() => setEditorMode((m) => !m)}
            style={{
              marginLeft: 14,
              background: "#f8e248",
              color: "#222",
              fontWeight: 600,
              fontSize: 15,
              padding: "9px 18px",
              border: "none",
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(255,224,41,0.12)",
              cursor: "pointer"
            }}
          >
            {editorMode ? "Exit Editor" : "Open Editor"}
          </button>
          {editorMode && (
            <>
              <button
                onClick={() => {
                  downloadDeckAsJSON({
                    slides: editorSlides || SLIDE_DECK_20,
                    logoDataUrl
                  });
                }}
                style={{
                  marginLeft: 8,
                  background: "#15b071",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 15px",
                  fontWeight: 550,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(21,176,113,0.13)"
                }}
                title="Export current slide deck (and logo) as JSON"
              >Export JSON</button>
              <button
                onClick={() => {
                  triggerLoadDeckFromJSON((obj) => {
                    setEditorSlides(obj.slides);
                    if (obj.logoDataUrl !== undefined) setLogoDataUrl(obj.logoDataUrl);
                    setDeckEpoch(prev => prev + 1);
                  });
                }}
                style={{
                  marginLeft: 7,
                  background: "#1565c0",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 15px",
                  fontWeight: 550,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(21,101,192,0.04)"
                }}
                title="Import/load a slide deck from a JSON file"
              >Import JSON</button>
            </>
          )}
        </div>
        {editorMode && (
          <div style={{
            width: "100%",
            marginTop: 10,
            display: "flex",
            justifyContent: "flex-start"
          }}>
            <BrandingControl logoDataUrl={logoDataUrl} onChange={setLogoDataUrl} />
          </div>
        )}
      </header>
      <div
        style={{
          marginTop: editorMode ? 130 : 84,
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {editorMode ? (
          <SlideEditor
            key={deckEpoch}
            logoDataUrl={logoDataUrl}
            setLogoDataUrl={setLogoDataUrl}
            initialSlides={editorSlides || SLIDE_DECK_20}
            onSlidesChange={setEditorSlides}
          />
        ) : (
          <>
            <Slide
              slideNumber={slideIdx + 1}
              totalSlides={SLIDE_COUNT}
              render={slides[slideIdx]}
              logoDataUrl={logoDataUrl}
            />
            <nav
              aria-label="Slide navigation"
              style={{
                marginTop: 30,
                display: "flex",
                alignItems: "center",
                gap: 22,
              }}
            >
              <button
                onClick={prevSlide}
                disabled={slideIdx === 0}
                style={{
                  background: slideIdx === 0 ? "#e9ecef" : "#1565c0",
                  color: slideIdx === 0 ? "#8f8f8f" : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: slideIdx === 0 ? "not-allowed" : "pointer",
                  transition: "background .2s"
                }}
                tabIndex={0}
                aria-label="Previous slide"
              >
                ← Prev
              </button>
              <span
                style={{
                  fontWeight: 500,
                  color: "#555",
                  fontSize: 17,
                  minWidth: 72,
                  textAlign: "center"
                }}
              >
                {slideIdx + 1} / {SLIDE_COUNT}
              </span>
              <button
                onClick={nextSlide}
                disabled={slideIdx === SLIDE_COUNT - 1}
                style={{
                  background: slideIdx === SLIDE_COUNT - 1 ? "#e9ecef" : "#1565c0",
                  color: slideIdx === SLIDE_COUNT - 1 ? "#8f8f8f" : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: slideIdx === SLIDE_COUNT - 1 ? "not-allowed" : "pointer",
                  transition: "background .2s"
                }}
                tabIndex={0}
                aria-label="Next slide"
              >
                Next →
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
