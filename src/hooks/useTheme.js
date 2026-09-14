import { useEffect, useState } from "react";

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

/**
 * Reads/writes the active color theme. Applies it as a data-theme
 * attribute on <html> — which is what styles/variables.css keys its
 * overrides off of — and remembers the choice in localStorage so it
 * persists across visits.
 *
 * Note: since this doesn't go through Context, only one component
 * should call this (the Topbar's ThemeSwitcher). If a second
 * component ever needs to read the current theme, this should move
 * to a Context/Provider pair instead, the same way useSidebar does —
 * otherwise two independent instances of this hook won't stay in
 * sync with each other.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme, themes: THEMES };
}
