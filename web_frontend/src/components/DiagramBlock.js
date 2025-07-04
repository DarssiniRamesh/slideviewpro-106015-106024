import React, { useRef, useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * DiagramBlock: Interactive, persistent diagram component using Excalidraw.
 * Renders an embedded whiteboard for architecture diagrams/flowcharts.
 * Props:
 *   - diagramData: Excalidraw scene data (JSON serializable) [required for restoring]
 *   - onChange: function({ diagramData }) called on edits (required in edit mode)
 *   - editable: boolean (controls if Excalidraw is in edit mode)
 *   - style: object, optional override for sizing
 *
 * Standard usage:
 *   <DiagramBlock diagramData={block.diagramData} onChange={handler} editable={slideEditMode} />
 */
function DiagramBlock({ diagramData, onChange, editable = false, style }) {
  const [error, setError] = useState(null);
  const [ExcalidrawComp, setExcalidrawComp] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // Lazy-load Excalidraw for faster initial app load.
  useEffect(() => {
    let cancelled = false;
    import("@excalidraw/excalidraw")
      .then((mod) => {
        if (!cancelled) setExcalidrawComp(() => mod.Excalidraw);
      })
      .catch((e) => setError("Failed to load drawing tool"));
    return () => { cancelled = true; };
  }, []);

  // Handle Excalidraw change and propagate diagram state up
  const handleChange = React.useCallback(
    (elements, appState, files) => {
      // Only persist scene if in editable mode and callback given
      if (editable && onChange) {
        // Structure matches Excalidraw scene data: { elements, appState, files }
        onChange({ diagramData: { elements, appState, files } });
      }
    },
    [editable, onChange]
  );

  if (error) {
    // Fallback: static SVG canvas
    return (
      <div style={{
        ...{
          width: 520,
          height: 250,
          background: "#e6e8fa",
          border: "2px dashed #bcc5de",
          borderRadius: 14,
          color: "#6376a0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontStyle: "italic", margin: "16px 0"
        }, ...(style || {})
      }}>
        [Diagram not available: {error}]
      </div>
    );
  }

  if (!ExcalidrawComp) {
    // Still loading
    return (
      <div style={{
        ...{
          width: 520,
          height: 210,
          background: "#f3f8ff",
          border: "2px dashed #c8d2e5",
          borderRadius: 14,
          color: "#8797b8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontStyle: "italic", margin: "12px 0"
        }, ...(style || {})
      }}>
        Loading diagramming tool...
      </div>
    );
  }

  // Normal, editable diagram
  // Excalidraw requires explicit style sizing, enforce minimum sensible default
  const containerStyle = {
    width: style?.width || 520,
    height: style?.height || 280,
    minWidth: 340, minHeight: 170,
    background: "var(--muted-bg,#f5f8ff)",
    borderRadius: 15,
    margin: "12px 0",
    ...(style || {})
  };

  // Only toolbar if editable, otherwise present as a "readonly" drawing
  // Note: Excalidraw has export/print/import, but those buttons can be hidden
  // Replay only the user's drawing, not default tools in view mode.
  return (
    <div style={containerStyle} tabIndex={0} aria-label="Diagram block (interactive)">
      <ExcalidrawComp
        ref={(api) => setExcalidrawAPI(api)}
        // scene: safe fallback in case data is missing/corrupt
        initialData={
          diagramData
            ? { ...diagramData }
            : { elements: [], appState: { viewBackgroundColor: "#fff" }, files: {} }
        }
        onChange={handleChange}
        // Show most UI in edit mode, minimal in view
        UIOptions={{
          canvasActions: {
            loadScene: editable,
            saveScene: editable,
            saveAsImage: true,
            export: true,
            clearCanvas: editable,
            changeViewBackgroundColor: editable,
          },
          toolbar: {
            visible: editable,
          }
        }}
        viewModeEnabled={!editable}
      />
      {!editable && (
        <div style={{ position: "absolute", top: 12, right: 18, color: "#b7b7b7", fontSize: 13 }}>
          (To edit, enter slide edit mode)
        </div>
      )}
    </div>
  );
}

export default DiagramBlock;

