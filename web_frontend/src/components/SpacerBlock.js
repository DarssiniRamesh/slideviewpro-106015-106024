import React from "react";

/**
 * PUBLIC_INTERFACE
 * SpacerBlock: Renders expandable/flexible space between blocks.
 * Props:
 *   - flex: (number) Fractional flex grow (default 1)
 *   - minHeight: (number) Minimum vertical size (optional)
 *   - style: (object) Optional style overrides.
 */
function SpacerBlock({ flex = 1, minHeight = 10, style = {} }) {
  return (
    <div
      style={{
        flex,
        minHeight,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default SpacerBlock;
