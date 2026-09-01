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

// TODO: move these into src/data/navLinks.js once it exists
const NAV_LINKS = [
  { label: "About Me", to: "/", icon: User },
  { label: "Qualifications", to: "/qualifications", icon: GraduationCap },
  { label: "My Skills", to: "/skills", icon: Layers },
  { label: "Contact", to: "/contact", icon: Mail },
  { label: "Resume", to: "/resume", icon: FileText },
  { label: "Certificates", to: "/certificates", icon: Award },
  { label: "My Projects", to: "/projects", icon: FolderGit2 },
];

const GAMES = [
  { label: "Snake Game", to: "/games/snake" },
  { label: "Tic-Tac-Toe", to: "/games/tic-tac-toe" },
  { label: "Rock-Paper-Scissors", to: "/games/rock-paper-scissors" },
];

/**
 * Persistent left nav on desktop; an off-canvas drawer on small screens
 * driven by `isOpen`/`onClose` from MainLayout. `onClose` also fires on
 * every link click so navigating on mobile tucks the drawer back away.
 */
export default function Sidebar({ isOpen, onClose }) {
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
          {NAV_LINKS.map(({ label, to, icon: Icon }) => (
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
                <span>{label}</span>
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
              <span>Games</span>
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
              {GAMES.map(({ label, to }) => (
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
                    {label}
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
