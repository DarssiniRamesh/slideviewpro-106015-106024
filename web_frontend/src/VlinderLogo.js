import React from "react";

/**
 * PUBLIC_INTERFACE
 * VlinderLogo renders the current brand logo.
 * Accepts a logoDataUrl prop to override the default; for dynamic branding/logo swap.
 *
 *  - logoDataUrl: DataURL or image URL string (optional). If not provided, fallback to default logo asset.
 *  - style: CSS style object
 *  - className: optional
 */
function VlinderLogo({ logoDataUrl, style = {}, className = "" }) {
  let src =
    typeof logoDataUrl === "string" && logoDataUrl.length > 15
      ? logoDataUrl
      : process.env.PUBLIC_URL + "/20250704_094640_vlinder-logo-with-title.png";

  return (
    <img
      src={src}
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
