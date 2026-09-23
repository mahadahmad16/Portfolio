import profilePhoto from "../../assets/images/My Photo.png";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { useLanguage } from "../../context/LanguageContext";
import "./Topbar.css";

/**
 * Fixed top bar: brand mark on the left, theme switcher + hamburger
 * toggle on the right (the hamburger is visible on small screens only
 * — the Sidebar is always visible on desktop). Swap `.topbar__avatar`'s
 * initials for the real profile photo once it's available:
 * <img src={profilePhoto} alt="Mahad Ahmad" />
 */
export default function Topbar({ isSidebarOpen, onToggleSidebar }) {
  const { t } = useLanguage();
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__avatar" aria-hidden="true">
          <img src={profilePhoto} alt="Mahad Ahmad" />
        </span>
        <span className="topbar__name">Mahad Ahmad</span>
      </div>

      <div className="topbar__actions">
        <ThemeSwitcher />
        <LanguageSwitcher />

        <button
          type="button"
          className="topbar__menu-btn"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? t("common.closeNavigation") : t("common.openNavigation")}
          aria-expanded={isSidebarOpen}
          aria-controls="primary-sidebar"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
