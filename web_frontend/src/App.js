import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Slide from "./Slide";
import VlinderLogo from "./VlinderLogo";

// Placeholder: use these to import PDF-extracted diagrams/assets when available
// import diagram1 from "./assets/diagram1.png";
// import diagram2 from "./assets/diagram2.png";

const SLIDE_COUNT = 20;

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Keyboard navigation (left/right arrows/space)
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === " ") {
        setSlideIdx((idx) => Math.min(idx + 1, SLIDE_COUNT - 1));
      } else if (e.key === "ArrowLeft") {
        setSlideIdx((idx) => Math.max(idx - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
  const downloadSlidesAsPDF = () => {
    // For MVP: use browser print (user can Save as PDF)
    window.print();
  };

  // --- Slides content: Placeholder demo slides (replace content w/real text/diagrams/branding) ---
  const slides = [
    {
      title: "Vlinder & Klefki Proposal",
      body: (
        <>
          <p>
            Company profile, technical architecture, and privacy-preserving credentialing solutions utilizing diagrams & branding from provided documentation.
          </p>
          <p>
            (Modern, minimal, and responsive web viewer)
          </p>
        </>
      ),
      diagram: null,
      branding: true,
    },
    {
      title: "About Vlinder",
      body: (
        <p>
          Vlinder is a pioneer in decentralized identity, sustainability platforms, and digital trust solutions.<br />
          <br />
          <span style={{ color: "#e53935" }}>Empowering next-gen privacy and trust infrastructures.</span>
        </p>
      ),
      branding: true,
      diagram: null,
    },
    {
      title: "Our Vision",
      body: (
        <p>
          A trustworthy, privacy-preserving digital ecosystem—enabling secure credential verification, streamlined processes, and enhanced user experience.
        </p>
      ),
      branding: true,
      diagram: null,
    },
    // Example diagram slide (placeholder asset, replace with PDF-derived):
    {
      title: "System Architecture Overview",
      body: (
        <p>
          End-to-end solution architecture, showing integration points and data flows.<br />
          (Flow diagram to be extracted from PDF)
        </p>
      ),
      branding: true,
      diagram: null, // diagram1
    },
    {
      title: "Key Features",
      body: (
        <ul>
          <li>Decentralized Identifiers (DIDs)</li>
          <li>Privacy-centric credential management</li>
          <li>Brand-anchored verification flows</li>
          <li>Seamless user journey</li>
        </ul>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Verifiable Credentials Explained",
      body: (
        <p>
          <strong>What?</strong> Digitally signed, portable credentials for trustless verification.<br />
          <strong>Why?</strong> Ensures privacy and authenticity for end users and organizations.
        </p>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "How the Platform Works",
      body: (
        <p>
          User onboarding & trust flow—backed by cryptographic proofs.<br />
          (Sample interaction diagram from PDF here.)
        </p>
      ),
      branding: false,
      diagram: null, // diagram2
    },
    {
      title: "Use Cases: Credentialing",
      body: (
        <ul>
          <li>Employee ID Verification</li>
          <li>Digital Certificates</li>
          <li>KYC/Compliance workflows</li>
        </ul>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Klefki Solution",
      body: (
        <p>
          Klefki: Modular privacy-preserving credential system<br />
          — leveraging ZKP technologies and pluggable trust frameworks.
        </p>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Key Architecture Diagram",
      body: (
        <p>
          (Insert detailed system architecture from PDF here — touchpoints, data flow, and integration.)
        </p>
      ),
      branding: true,
      diagram: null,
    },
    {
      title: "Branding and UX",
      body: (
        <p>
          Unified colors, consistent iconography, and intuitive navigation for frictionless experience.<br />
          Includes Vlinder logo and PDF’s visual theme.
        </p>
      ),
      branding: true,
      diagram: null,
    },
    {
      title: "Responsive Design",
      body: (
        <ul>
          <li>Full mobile and desktop support</li>
          <li>Touch-optimized navigation</li>
        </ul>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Security & Privacy",
      body: (
        <p>
          Strong cryptography, consent-based access, and full user control. Designed for compliance and international standards.
        </p>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Technology Stack",
      body: (
        <ul>
          <li>React Frontend</li>
          <li>NodeJS APIs / Serverless Backend</li>
          <li>Blockchain Integration (optional)</li>
          <li>PDF Export and Branding from source</li>
        </ul>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Customer Journey Map",
      body: (
        <p>
          Onboard → Verify → Credential Issued → Reuse/Share<br />
          (Visual journey map from PDF here.)
        </p>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Implementation Roadmap",
      body: (
        <ul>
          <li>Pilot Phase (MVP Launch)</li>
          <li>Full Integration</li>
          <li>Scaling & Ecosystem Expansion</li>
        </ul>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Partnership Highlights",
      body: (
        <p>
          Strategic tech/process partners supporting scalable, privacy-first infrastructure deployment.
        </p>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Compliance and Governance",
      body: (
        <p>
          Meets GDPR, CCPA, and industry standards by design.
        </p>
      ),
      branding: false,
      diagram: null,
    },
    {
      title: "Contact & Next Steps",
      body: (
        <p>
          <strong>Contact:</strong><br />
          info@vlinder.com<br />
          <br />
          <strong>Let’s innovate trust together.</strong>
        </p>
      ),
      branding: true,
      diagram: null,
    },
    {
      title: "Thank You",
      body: (
        <h3 style={{ color: "#1565c0" }}>Questions?</h3>
      ),
      branding: true,
      diagram: null,
    }
  ];
  // Ensure exactly SLIDE_COUNT slides
  while (slides.length < SLIDE_COUNT) {
    slides.push({
      title: `Extra Slide ${slides.length + 1}`,
      body: <p>Reserved for additional diagrams or technical content.</p>,
      branding: false,
      diagram: null,
    });
  }

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
          height: 68,
        }}
      >
        <VlinderLogo style={{ width: 40, height: 40, marginRight: 16 }} />
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
      </header>
      <div
        style={{
          marginTop: 84,
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Slide
          slideNumber={slideIdx + 1}
          totalSlides={SLIDE_COUNT}
          {...slides[slideIdx]}
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
      </div>
    </div>
  );
}

export default App;
