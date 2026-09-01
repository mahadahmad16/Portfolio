import { Menu, X } from "lucide-react";
import "./Topbar.css";
import profilePhoto from "../../assets/images/My Photo.png";

/**
 * Fixed top bar: brand mark on the left, hamburger toggle on the right
 * (visible on small screens only — the Sidebar is always visible on
 * desktop). Swap `.topbar__avatar`'s initials for the real profile
 * photo once it's available: <img src={profilePhoto} alt="Mahad Ahmad" />
 */
export default function Topbar({ isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__avatar" aria-hidden="true">
          <img src={profilePhoto} alt="Mahad Ahmad" />
        </span>
        <span className="topbar__name">Mahad Ahmad</span>
      </div>

      <button
        type="button"
        className="topbar__menu-btn"
        onClick={onToggleSidebar}
        aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isSidebarOpen}
        aria-controls="primary-sidebar"
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}
