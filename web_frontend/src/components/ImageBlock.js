import React from "react";

/**
 * PUBLIC_INTERFACE
 * Displays an image block, or a placeholder if no src provided.
 * Props:
 *   - src: image URL
 *   - alt: string
 *   - style: object
 */
function ImageBlock({ src, alt = "Image", style }) {
  if (!src) {
    // Placeholder block
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
        aria-label="Image Placeholder"
      >
        [Image]
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} />;
}

export default ImageBlock;
