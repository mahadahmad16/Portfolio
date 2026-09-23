import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  GraduationCap,
  Layers,
  Mail,
  FileText,
  Award,
  FolderGit2,
  Gamepad2,
  ChevronDown,
} from "lucide-react";
import "./Sidebar.css";
import { useLanguage } from "../../context/LanguageContext";

// TODO: move these into src/data/navLinks.js once it exists
const NAV_LINKS = [
  { labelKey: "nav.about", to: "/", icon: User },
  { labelKey: "nav.qualifications", to: "/qualifications", icon: GraduationCap },
  { labelKey: "nav.skills", to: "/skills", icon: Layers },
  { labelKey: "nav.contact", to: "/contact", icon: Mail },
  { labelKey: "nav.resume", to: "/resume", icon: FileText },
  { labelKey: "nav.certificates", to: "/certificates", icon: Award },
  { labelKey: "nav.projects", to: "/projects", icon: FolderGit2 },
];

const GAMES = [
  { labelKey: "nav.snake", to: "/games/snake" },
  { labelKey: "nav.ticTacToe", to: "/games/tic-tac-toe" },
  { labelKey: "nav.rockPaperScissors", to: "/games/rock-paper-scissors" },
];

/**
 * Persistent left nav on desktop; an off-canvas drawer on small screens
 * driven by `isOpen`/`onClose` from MainLayout. `onClose` also fires on
 * every link click so navigating on mobile tucks the drawer back away.
 */
export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();
  const location = useLocation();
  const [gamesOpen, setGamesOpen] = useState(
    location.pathname.startsWith("/games")
  );

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <nav
        id="primary-sidebar"
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        aria-label="Primary"
      >
        <ul className="sidebar__list">
          {NAV_LINKS.map(({ labelKey, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                }
              >
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>{t(labelKey)}</span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              type="button"
              className="sidebar__link sidebar__link--toggle"
              onClick={() => setGamesOpen((open) => !open)}
              aria-expanded={gamesOpen}
              aria-controls="sidebar-games-list"
            >
              <Gamepad2 size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>{t("nav.games")}</span>
              <ChevronDown
                size={16}
                className={`sidebar__chevron ${
                  gamesOpen ? "sidebar__chevron--open" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <ul
              id="sidebar-games-list"
              className={`sidebar__sublist ${
                gamesOpen ? "sidebar__sublist--open" : ""
              }`}
            >
              {GAMES.map(({ labelKey, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar__sublink ${
                        isActive ? "sidebar__sublink--active" : ""
                      }`
                    }
                  >
                    {t(labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
