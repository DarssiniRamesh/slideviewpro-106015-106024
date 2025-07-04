import React, { useRef, useState, useCallback, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * BrandingControl: UI component to allow users to upload or swap the brand logo for the slide deck.
 *
 * - Renders a file input UI and a preview of the current or selected logo.
 * - Persists the uploaded logo (as a DataURL) to app state (via props), and optionally localStorage for future reloads.
 * - Calls onChange(logoDataURL) prop when a new logo is uploaded.
 * - Props:
 *   - logoDataUrl: Current DataURL of the logo (if set)
 *   - onChange: function(newLogoDataUrl)
 */
function BrandingControl({ logoDataUrl, onChange }) {
  const fileRef = useRef();
  const [localUrl, setLocalUrl] = useState(logoDataUrl);

  // Update when external logo changes
  useEffect(() => {
    setLocalUrl(logoDataUrl);
  }, [logoDataUrl]);

  // Handle file upload
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLocalUrl(ev.target.result);
        if (onChange) onChange(ev.target.result);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  // Handle "remove logo" if desired (not required in the request, but add for completeness)
  const handleRemove = (e) => {
    e.preventDefault();
    setLocalUrl(null);
    if (onChange) onChange(null);
  };

  return (
    <section
      style={{
        background: "#eef7fd",
        border: "1.7px solid #c5e6ff",
        borderRadius: 9,
        padding: "17px 20px",
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 24,
        minHeight: 80
      }}
    >
      <div>
        <div style={{ marginBottom: 7, color: "#1565c0", fontWeight: 600 }}>Brand Logo</div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          style={{
            background: "#1565c0",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 7,
            fontSize: 14,
            padding: "7px 12px",
            cursor: "pointer"
          }}
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          {localUrl ? "Change Logo" : "Upload Logo"}
        </button>
        {localUrl && (
          <button
            style={{
              marginLeft: 8,
              background: "#f17a63",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontSize: 13,
              padding: "6px 10px",
              cursor: "pointer"
            }}
            onClick={handleRemove}
            title="Remove custom logo and reset to default"
          >
            Remove
          </button>
        )}
        <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
          Recommended: PNG, transparent, height &le; 60px
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, color: "#4ca3e5", marginBottom: 5 }}>
          {localUrl ? "Preview:" : "No logo uploaded"}
        </div>
        <div
          style={{
            width: 84,
            height: 60,
            background: "#fff",
            border: "1.2px solid #deecf5",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {localUrl ? (
            <img
              src={localUrl}
              alt="Brand logo preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain"
              }}
            />
          ) : (
            <span style={{ color: "#b7c3cd", fontSize: 14 }}>[No Logo]</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default BrandingControl;
