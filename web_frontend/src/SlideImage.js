import React from "react";

// PUBLIC_INTERFACE
function SlideImage({ src, alt = "Diagram", style }) {
  /**
   * Placeholder for PDF-extracted diagram/image.
   * src: optional imported image or require statement
   */
  if (!src) {
    // Render a simple placeholder box
    return (
      <div
        style={{
          background: "#e9ecef",
          width: style?.width || 320,
          height: style?.height || 180,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#b0b0b0",
          fontSize: 20,
          ...style,
        }}
        aria-label="Diagram Placeholder"
      >
        Diagram
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} />;
}

export default SlideImage;
