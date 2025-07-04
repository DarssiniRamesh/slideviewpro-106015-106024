import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar: Visual index of slides (thumbnails), supports selection and drag-and-drop reordering.
 *
 * Props:
 * - slides: array of slide objects
 * - currentIdx: number (selected slide)
 * - onSelect: function(idx)
 * - onSlideDrop: function(fromIdx, toIdx)
 */
function Sidebar({ slides, currentIdx, onSelect, onSlideDrop }) {
  // Local drag state (indices)
  const [dragIdx, setDragIdx] = React.useState(null);
  const [dropIdx, setDropIdx] = React.useState(null);

  // Drag handlers
  const handleDragStart = (idx) => setDragIdx(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    setDropIdx(idx);
  };
  const handleDrop = () => {
    if (dragIdx != null && dropIdx != null && dragIdx !== dropIdx) {
      onSlideDrop(dragIdx, dropIdx);
    }
    setDragIdx(null);
    setDropIdx(null);
  };

  return (
    <nav
      style={{
        width: 160,
        minWidth: 110,
        background: "var(--bg-secondary)",
        boxShadow: "2px 0 8px rgba(21,101,192,0.06)",
        borderRight: "1.8px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "13px 5px 13px 5px",
        overflowY: "auto",
        zIndex: 3,
      }}
      aria-label="Slides sidebar"
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          draggable
          onClick={() => onSelect(idx)}
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={handleDrop}
          style={{
            marginBottom: 16,
            padding: "4px 0",
            cursor: "pointer",
            borderRadius: 10,
            background: currentIdx === idx
              ? "rgba(21,101,192,0.13)"
              : dragIdx === idx
              ? "rgba(15,90,180,0.13)"
              : "transparent",
            border: currentIdx === idx
              ? "2.5px solid #1565c0"
              : dropIdx === idx
              ? "2.5px dashed #02acd9"
              : "1px solid transparent",
            width: "96%",
            minHeight: 55,
            boxSizing: "border-box",
            transition: "background 0.11s, border 0.11s"
          }}
          tabIndex={0}
          aria-label={`Go to slide ${idx + 1}: ${slide.title || "Untitled"}`}
        >
          <span style={{
            fontWeight: 600,
            color: currentIdx === idx ? "#1565c0" : "#343a40",
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>{slide.title}</span>
          {/* Simple thumbnail emulation (rectangle, could extend with actual snapshot) */}
          <div style={{
            height: 20,
            margin: "3px 0 0 0",
            background: "#e7f3fd",
            borderRadius: 3,
            border: "1.2px solid #b6d6ef"
          }} />
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
