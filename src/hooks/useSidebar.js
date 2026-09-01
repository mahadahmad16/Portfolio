import { useSidebarContext } from "../context/SidebarContext";

/**
 * Public hook for reading/controlling the mobile sidebar. Thin wrapper
 * around SidebarContext so components call useSidebar() without
 * needing to know a context is involved. Must be used within a
 * SidebarProvider (MainLayout sets this up).
 */
export default function useSidebar() {
  return useSidebarContext();
}
