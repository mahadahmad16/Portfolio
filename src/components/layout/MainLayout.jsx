import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { LanguageProvider } from "../../context/LanguageContext";
import useSidebar from "../../hooks/useSidebar";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ParticlesBackground from "../background/ParticlesBackground";
import CursorFollower from "../common/CursorFollower";
import "./MainLayout.css";

/**
 * Page shell rendered by the router around every route. Wraps
 * LayoutShell in LanguageProvider, ThemeProvider, and SidebarProvider
 * so all three are available via useLanguage()/useTheme()/useSidebar()
 * anywhere in the tree — including inside whatever page renders
 * through <Outlet /> — not just here.
 */
export default function MainLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SidebarProvider>
          <LayoutShell />
        </SidebarProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

function LayoutShell() {
  const sidebar = useSidebar();

  return (
    <div className="main-layout">
      <ParticlesBackground />
      <CursorFollower />

      <Topbar isSidebarOpen={sidebar.isOpen} onToggleSidebar={sidebar.toggle} />
      <Sidebar isOpen={sidebar.isOpen} onClose={sidebar.close} />

      <div className="main-layout__content">
        <main className="main-layout__page">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}