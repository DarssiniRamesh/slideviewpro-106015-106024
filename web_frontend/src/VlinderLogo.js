import React from "react";

// PUBLIC_INTERFACE
function VlinderLogo({ style = {}, className = "" }) {
  /**
   * Renders the official Vlinder logo with title as a PNG image.
   * Used for branding in slides and header as per design notes.
   * @param style - Additional style overrides
   */
  return (
    <img
      src={
        process.env.PUBLIC_URL +
        "/20250704_094640_vlinder-logo-with-title.png"
      }
      alt="Vlinder Logo"
      style={{
        display: "block",
        height: 40,
        ...style,
      }}
      className={className}
      draggable={false}
      aria-label="Vlinder Logo"
      loading="eager"
    />
  );
}

export default VlinderLogo;
