import React, { createContext, useContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
// LogoContext provides { logoDataUrl, setLogoDataUrl } for use across app.
const LogoContext = createContext({
  logoDataUrl: null,
  setLogoDataUrl: () => {},
});

/**
 * PUBLIC_INTERFACE
 * LogoProvider wraps the app and manages the logo state, persisting to localStorage under "vlinder-logo-custom".
 * Call setLogoDataUrl(newDataUrl) to persist a new logo.
 */
export function LogoProvider({ children }) {
  const [logoDataUrl, setLogoDataUrl_] = useState(
    () => window.localStorage.getItem("vlinder-logo-custom") || null
  );

  // Save to localStorage on change
  useEffect(() => {
    if (logoDataUrl) {
      window.localStorage.setItem("vlinder-logo-custom", logoDataUrl);
    } else {
      window.localStorage.removeItem("vlinder-logo-custom");
    }
  }, [logoDataUrl]);

  const setLogoDataUrl = (value) => {
    setLogoDataUrl_(value);
  };

  return (
    <LogoContext.Provider value={{ logoDataUrl, setLogoDataUrl }}>
      {children}
    </LogoContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useLogo: React hook to access { logoDataUrl, setLogoDataUrl }.
 */
export function useLogo() {
  return useContext(LogoContext);
}
