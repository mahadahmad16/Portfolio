import { Menu, X } from "lucide-react";
import "./Topbar.css";

export default function Topbar({ isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__avatar" aria-hidden="true">
          MA
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
