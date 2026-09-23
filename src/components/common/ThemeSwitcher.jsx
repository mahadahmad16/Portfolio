import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import { useLanguage } from "../../context/LanguageContext";
import "./ThemeSwitcher.css";

/**
 * Small swatch-picker for the Topbar. Click the trigger to open a
 * popover of color dots; picking one updates the theme immediately
 * (see hooks/useTheme.js) and closes the popover.
 */
export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeSwatch = themes.find((t) => t.id === theme)?.swatch;

  return (
    <div className="theme-switcher" ref={wrapperRef}>
      <button
        type="button"
        className="theme-switcher__trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("common.themeSwitch")}
      >
        <span
          className="theme-switcher__trigger-swatch"
          style={{ background: activeSwatch }}
          aria-hidden="true"
        />
        <Palette size={16} strokeWidth={1.75} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="theme-switcher__menu" role="menu">
          {themes.map(({ id, label, swatch }) => (
            <button
              key={id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === id}
              className={`theme-switcher__option ${
                theme === id ? "theme-switcher__option--active" : ""
              }`}
              onClick={() => {
                setTheme(id);
                setIsOpen(false);
              }}
            >
              <span
                className="theme-switcher__swatch"
                style={{ background: swatch }}
                aria-hidden="true"
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
