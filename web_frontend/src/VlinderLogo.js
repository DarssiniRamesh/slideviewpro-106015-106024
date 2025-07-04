import React from "react";

// PUBLIC_INTERFACE
function VlinderLogo({ style }) {
  /** Placeholder SVG logo for Vlinder branding; replace with official asset as needed. */
  return (
    <svg
      style={style}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vlinder Logo"
    >
      <circle cx="28" cy="28" r="28" fill="#1565c0" />
      <path
        d="M28 14C21 18 18 26 22 32C24 36 32 36 34 32C38 26 35 18 28 14Z"
        fill="#f9a825"
      />
      <circle cx="28" cy="28" r="7" fill="#e53935" />
    </svg>
  );
}

export default VlinderLogo;
