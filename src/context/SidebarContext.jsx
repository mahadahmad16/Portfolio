import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SidebarContext = createContext(null);

/**
 * Wraps the app shell (see MainLayout) so any component — not just
 * Topbar/Sidebar directly — can read or control the mobile sidebar's
 * open state via the useSidebar() hook instead of prop drilling.
 */
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Tuck the drawer away whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Let keyboard users dismiss it with Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((open) => !open),
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

/** Internal — components should import useSidebar from hooks/ instead. */
export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}
