import React from "react";
import VlinderLogo from "../VlinderLogo";

/**
 * PUBLIC_INTERFACE
 * Renders the branded Vlinder logo. Optionally custom style.
 * Props:
 *   - style: object (optional)
 *   - logoDataUrl: optional, DataURL or url string for dynamic logo
 */
function LogoBlock({ style, logoDataUrl }) {
  return <VlinderLogo style={style} logoDataUrl={logoDataUrl} />;
}

export default LogoBlock;
