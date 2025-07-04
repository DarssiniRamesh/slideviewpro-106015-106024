import React from "react";

/**
 * PUBLIC_INTERFACE
 * LayoutRowBlock: Renders a horizontal flex row container for child blocks.
 * Props:
 *   - children: array of component/block configs
 *   - gap: (optional) horizontal gap between children
 *   - style: (optional) object, custom style overrides
 *
 * Typically used for placing multiple blocks in a row.
 */
function LayoutRowBlock({ children = [], gap = 22, style = {}, ...rest }) {
  // Accept both serialized children blocks as 'children' prop,
  // or as actual React children
  // When children are block configs, Slide.js will call this with already-rendered child nodes.
  const mergedStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap,
    width: "100%",
    ...style,
  };
  return (
    <div style={mergedStyle} {...rest}>
      {Array.isArray(children)
        ? children.map((child, idx) =>
            // If JSX element, just render; otherwise assume already rendered child
            React.isValidElement(child) ? child : <React.Fragment key={idx}>{child}</React.Fragment>
          )
        : children}
    </div>
  );
}

export default LayoutRowBlock;
