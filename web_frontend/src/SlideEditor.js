import React, { useState, useCallback } from "react";
import Slide from "./Slide";
import Sidebar from "./Sidebar";
import ComponentPalette from "./ComponentPalette";
import { SLIDE_DECK_20 } from "./SlideDeck20";

/**
 * PUBLIC_INTERFACE
 * SlideEditor is a WYSIWYG editor for slides. It manages slide state, current selection, drag-and-drop,
 * and provides UI for editing content, adding/removing slides, and component palette integration.
 *
 * Props: none (for now - operates on local state; future: external deck, callbacks)
 */
function SlideEditor() {
  // Start with a copy of the provided slide deck, so edits are possible
  const [slides, setSlides] = useState(JSON.parse(JSON.stringify(SLIDE_DECK_20)));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [editMode, setEditMode] = useState(false); // switch to edit a block inline

  // --- Slide Operations ---
  // PUBLIC_INTERFACE
  const addSlide = useCallback(() => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: "New Slide",
      components: [],
    };
    setSlides((old) => {
      const next = [...old];
      next.splice(currentIdx + 1, 0, newSlide);
      return next;
    });
    setCurrentIdx((idx) => idx + 1);
  }, [currentIdx]);

  // PUBLIC_INTERFACE
  const removeSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setSlides((old) => {
      const next = [...old];
      next.splice(currentIdx, 1);
      return next;
    });
    setCurrentIdx((idx) => Math.max(0, idx - 1));
  }, [currentIdx, slides.length]);

  // PUBLIC_INTERFACE
  const moveSlide = useCallback((fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= slides.length) return;
    setSlides((old) => {
      const next = [...old];
      const [slide] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, slide);
      return next;
    });
    setCurrentIdx(toIdx);
  }, [slides.length]);

  // --- Block Operations (insert block/component) ---
  // PUBLIC_INTERFACE
  const addComponentToCurrentSlide = useCallback((block) => {
    setSlides((old) => {
      const next = [...old];
      next[currentIdx].components = [...(next[currentIdx].components || []), block];
      return next;
    });
  }, [currentIdx]);

  // Edit or remove block by index in components[]
  const editBlock = useCallback((blockIdx, newBlock) => {
    setSlides((old) => {
      const next = [...old];
      next[currentIdx].components[blockIdx] = newBlock;
      return next;
    });
  }, [currentIdx]);

  const removeBlock = useCallback((blockIdx) => {
    setSlides((old) => {
      const next = [...old];
      next[currentIdx].components = next[currentIdx].components.filter((_, i) => i !== blockIdx);
      return next;
    });
  }, [currentIdx]);

  // Drag-and-drop reordering
  const moveBlock = useCallback((from, to) => {
    if (from === to) return;
    setSlides((old) => {
      const next = [...old];
      const comps = [...(next[currentIdx].components || [])];
      const [blk] = comps.splice(from, 1);
      comps.splice(to, 0, blk);
      next[currentIdx].components = comps;
      return next;
    });
  }, [currentIdx]);

  // --- UI Helpers
  const onSlideSelect = (idx) => setCurrentIdx(idx);
  const onSlideDrop = (fromIdx, toIdx) => moveSlide(fromIdx, toIdx);

  // -- Editor workspace: shows controls and slide preview
  return (
    <div style={{
      display: "flex",
      height: "calc(100vh - 74px)",
      width: "100vw",
      background: "var(--bg-primary)",
      position: "relative"
    }}>
      <Sidebar
        slides={slides}
        currentIdx={currentIdx}
        onSelect={onSlideSelect}
        onSlideDrop={onSlideDrop}
      />
      <div style={{
        flex: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 600,
        background: "#fff",
        boxShadow: "0 8px 22px rgba(21, 101, 192, 0.06)",
        borderRadius: 18,
        margin: "22px 0"
      }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
          <button onClick={addSlide} style={{ marginRight: 10 }}>+ Slide</button>
          <button onClick={removeSlide} disabled={slides.length <= 1}>Remove Slide</button>
          <span style={{ marginLeft: 16, color: "#555" }}>
            {currentIdx + 1} / {slides.length}
          </span>
        </div>
        <Slide
          slideNumber={currentIdx + 1}
          totalSlides={slides.length}
          render={slides[currentIdx]}
          editMode={true}
          onBlockUpdate={(i, newBlk) => editBlock(i, newBlk)}
        />
        {/* Buttons to re-order slides */}
        <div style={{ marginTop: 12 }}>
          <button onClick={() => moveSlide(currentIdx, currentIdx - 1)} disabled={currentIdx === 0}>&uarr; Up</button>
          <button onClick={() => moveSlide(currentIdx, currentIdx + 1)} disabled={currentIdx === slides.length - 1} style={{ marginLeft: 5 }}>&darr; Down</button>
        </div>
      </div>
      <ComponentPalette
        onAddComponent={addComponentToCurrentSlide}
        currentComponents={slides[currentIdx]?.components || []}
        onBlockEdit={editBlock}
        onBlockRemove={removeBlock}
        onBlockMove={moveBlock}
      />
    </div>
  );
}

export default SlideEditor;
