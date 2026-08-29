import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ParticlesBackground from "../background/ParticlesBackground";
import "./MainLayout.css";

/**
 * Page shell rendered by the router around every route: ambient
 * background, fixed topbar + sidebar, the routed page content, and
 * the footer. Owns the mobile sidebar's open/closed state for now —
 * a natural spot to swap in SidebarContext once context/ is built.
 */
export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Tuck the mobile drawer away whenever the route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Let keyboard users dismiss the mobile drawer with Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsSidebarOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="main-layout">
      <ParticlesBackground />

      <Topbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="main-layout__content">
        <main className="main-layout__page">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
