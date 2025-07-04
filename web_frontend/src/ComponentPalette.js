import React from "react";

/**
 * PUBLIC_INTERFACE
 * ComponentPalette: Palette/toolbox for slide editor.
 * Shows available modular component types and manages blocks in current slide:
 *   - Add new block/component to slide
 *   - Edit/remove/reorder existing blocks (basic UI)
 *
 * Props:
 *  - onAddComponent: function(blockDef)
 *  - currentComponents: array (in current slide)
 *  - onBlockEdit: function(idx, blockDef)
 *  - onBlockRemove: function(idx)
 *  - onBlockMove: function(from, to)
 */
const DEFAULT_BLOCKS = [
  { type: "text", text: "Sample text", style: { fontSize: 18 } },
  { type: "image", src: "", alt: "Image" },
  { type: "diagram", description: "Diagram placeholder" },
  { type: "logo", style: { height: 36 } }
];

function ComponentPalette({
  onAddComponent,
  currentComponents,
  onBlockEdit,
  onBlockRemove,
  onBlockMove,
}) {
  // For simplicity, edit as raw JSON in a textarea for this minimal implementation
  const [editingIdx, setEditingIdx] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");

  const startEdit = (idx) => {
    setEditingIdx(idx);
    setEditValue(JSON.stringify(currentComponents[idx], null, 2));
  };
  const saveEdit = () => {
    try {
      const parsed = JSON.parse(editValue);
      onBlockEdit(editingIdx, parsed);
      setEditingIdx(null);
      setEditValue("");
    } catch (e) {
      alert("Error: Invalid JSON. Fix syntax before saving.");
    }
  };

  return (
    <aside
      style={{
        flex: 1.1,
        minWidth: 180,
        maxWidth: 232,
        background: "#f8fafc",
        borderLeft: "1px solid var(--border-color)",
        boxShadow: "-2px 0 7px rgba(21,101,192,0.04)",
        padding: "16px 14px 10px 12px",
        zIndex: 3
      }}
      aria-label="Component Palette"
    >
      <h3 style={{ fontWeight: 600, color: "#1865b0", fontSize: 16, paddingBottom: 5, borderBottom: "1.2px solid #c5dae7" }}>
        Components
      </h3>
      {DEFAULT_BLOCKS.map((block, i) => (
        <button
          key={block.type}
          style={{
            margin: "7px 0",
            width: "98%",
            padding: "7px 0",
            background: "#fff",
            border: "1.5px solid #b7e0fc",
            color: "#1565c0",
            borderRadius: 7,
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer"
          }}
          onClick={() => onAddComponent({...block, key: `block-${Date.now()}-${i}`})}
        >
          + {block.type[0].toUpperCase() + block.type.slice(1)}
        </button>
      ))}
      <div style={{ borderBottom: "1px solid #def7fe", margin: "12px 0 7px 0" }} />
      <h4 style={{ color: "#878787", fontWeight: 500, fontSize: 15, margin: "0 0 5px" }}>
        Slide Blocks
      </h4>
      {/* List, edit, remove, reorder components/blocks */}
      <ol style={{ paddingLeft: 0 }}>
        {currentComponents.map((block, idx) => (
          <li key={block.key || idx} style={{
            background: "#eef5fb",
            borderRadius: 7,
            marginBottom: 8,
            padding: "7px 5px 5px 7px",
            border: "1.3px solid #d5e1ef",
            display: "flex",
            alignItems: "center",
            fontSize: 13
          }}>
            {editingIdx === idx ? (
              <div style={{ flex: 1 }}>
                <textarea
                  style={{ width: "100%", minHeight: 40, fontFamily: "monospace" }}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button onClick={saveEdit} style={{ marginRight: 4, fontSize: 13 }}>Save</button>
                <button onClick={() => setEditingIdx(null)} style={{ fontSize: 13 }}>Cancel</button>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                  <code>{block.type}</code>
                  {block.text && <span> — {typeof block.text === "string" ? block.text.slice(0,13) : "[JSX]"}</span>}
                </div>
                <div style={{ marginLeft: 8 }}>
                  <button onClick={() => startEdit(idx)} title="Edit" style={{ fontSize: 12, marginRight: 2 }}>✎</button>
                  <button onClick={() => onBlockRemove(idx)} title="Delete" style={{ fontSize: 12, marginRight: 2 }}>🗑️</button>
                  <button onClick={() => idx > 0 && onBlockMove(idx, idx-1)} title="Move up" disabled={idx===0} style={{ fontSize: 12, marginRight: 2 }}>⬆️</button>
                  <button onClick={() => idx < currentComponents.length-1 && onBlockMove(idx, idx+1)} title="Move down" disabled={idx === currentComponents.length-1} style={{ fontSize: 12 }}>⬇️</button>
                </div>
              </>
            )}
          </li>
        ))}
        {currentComponents.length === 0 && (
          <li style={{ color: "#bababa", fontStyle: "italic", fontSize: 13, padding: "7px 3px" }}>
            (No components yet)
          </li>
        )}
      </ol>
    </aside>
  );
}

export default ComponentPalette;
