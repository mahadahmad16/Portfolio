import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarContext";
import { ThemeProvider } from "../../context/ThemeContext";
import useSidebar from "../../hooks/useSidebar";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ParticlesBackground from "../background/ParticlesBackground";
import CursorFollower from "../common/CursorFollower";
import "./MainLayout.css";

/**
 * Page shell rendered by the router around every route. Wraps
 * LayoutShell in ThemeProvider and SidebarProvider so both are available
 * anywhere in the tree — including inside whatever page renders through
 * <Outlet /> — not just here.
 */
export default function MainLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <LayoutShell />
      </SidebarProvider>
    </ThemeProvider>
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