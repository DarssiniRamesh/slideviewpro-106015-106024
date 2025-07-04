import React from "react";
import VlinderLogo from "../VlinderLogo";

/**
 * PUBLIC_INTERFACE
 * Renders the branded Vlinder logo. Optionally custom style.
 * Props:
 *   - style: object (optional)
 */
function LogoBlock({ style }) {
  return <VlinderLogo style={style} />;
}

export default LogoBlock;
