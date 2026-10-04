import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  { id: "blue", label: "Blue", swatch: "#3e6ff2" },
  { id: "green", label: "Green", swatch: "#22b56e" },
  { id: "red", label: "Red", swatch: "#e0384f" },
  { id: "purple", label: "Purple", swatch: "#8b5cf6" },
  { id: "grey", label: "Grey", swatch: "#9ca3af" },
];

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "blue";

function getStoredTheme() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
}

const ThemeContext = createContext(null);

/**
 * Wraps the app shell (see MainLayout) so any component can read the
 * active theme — not just the ThemeSwitcher that sets it. This matters
 * for anything that draws colors in canvas/JS instead of plain CSS
 * (ParticlesBackground, SnakeGame), since canvas can't read
 * `var(--accent-cyan)` the way normal DOM+CSS does — those components
 * need to know *when* the theme changed so they can re-read the color
 * and redraw.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = { theme, setTheme, themes: THEMES };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Internal — components should import useTheme from hooks/ instead. */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
