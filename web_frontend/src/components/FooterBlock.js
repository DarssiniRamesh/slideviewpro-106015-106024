import React from "react";

/**
 * PUBLIC_INTERFACE
 * FooterBlock: Renders a standard slide footer for copyright or info.
 * Props:
 *   - text: string or ReactNode (required)
 *   - style: (object) Optional CSS overrides
 */
function FooterBlock({ text, style = {} }) {
  const mergedStyle = {
    color: "var(--footer-text, #878787)",
    fontSize: ".91rem",
    marginTop: 40,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    ...style,
  };
  return (
    <div className="slide-footer" style={mergedStyle}>
      {text}
    </div>
  );
}

export default FooterBlock;
