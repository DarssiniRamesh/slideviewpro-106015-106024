import React from "react";

/**
 * PUBLIC_INTERFACE
 * Renders a text block, supporting optional inline styles and custom alignment.
 * Props:
 *   - text: string | ReactNode (required)
 *   - style: object (optional)
 *   - align: string ('left', 'center', 'right') (optional)
 */
function TextBlock({ text, style = {}, align }) {
  let computedStyle = { ...style };
  if (align) {
    computedStyle.textAlign = align;
  }
  return (
    <div style={computedStyle} className="slide-body">
      {text}
    </div>
  );
}

export default TextBlock;
