import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarContext";
import useSidebar from "../../hooks/useSidebar";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ParticlesBackground from "../background/ParticlesBackground";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <LayoutShell />
    </SidebarProvider>
  );
}

function LayoutShell() {
  const sidebar = useSidebar();

  return (
    <div className="main-layout">
      <ParticlesBackground />

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
