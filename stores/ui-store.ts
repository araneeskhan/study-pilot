import { create } from "zustand";

interface UIState {
  // Sidebar states
  sidebarOpen: boolean;
  adminSidebarOpen: boolean;
  dashboardSidebarOpen: boolean;

  // Modal states
  searchModalOpen: boolean;
  loginModalOpen: boolean;
  registerModalOpen: boolean;

  // Theme
  theme: "light" | "dark" | "system";

  // Mobile menu
  mobileMenuOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  toggleAdminSidebar: () => void;
  toggleDashboardSidebar: () => void;
  closeSidebar: () => void;
  closeAdminSidebar: () => void;
  closeDashboardSidebar: () => void;

  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleSearchModal: () => void;

  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;

  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleTheme: () => void;

  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial states
  sidebarOpen: true,
  adminSidebarOpen: true,
  dashboardSidebarOpen: true,
  searchModalOpen: false,
  loginModalOpen: false,
  registerModalOpen: false,
  theme: "light",
  mobileMenuOpen: false,

  // Sidebar actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAdminSidebar: () =>
    set((state) => ({ adminSidebarOpen: !state.adminSidebarOpen })),
  toggleDashboardSidebar: () =>
    set((state) => ({ dashboardSidebarOpen: !state.dashboardSidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  closeAdminSidebar: () => set({ adminSidebarOpen: false }),
  closeDashboardSidebar: () => set({ dashboardSidebarOpen: false }),

  // Search modal actions
  openSearchModal: () => set({ searchModalOpen: true }),
  closeSearchModal: () => set({ searchModalOpen: false }),
  toggleSearchModal: () =>
    set((state) => ({ searchModalOpen: !state.searchModalOpen })),

  // Auth modal actions
  openLoginModal: () =>
    set({ loginModalOpen: true, registerModalOpen: false }),
  closeLoginModal: () => set({ loginModalOpen: false }),
  openRegisterModal: () =>
    set({ registerModalOpen: true, loginModalOpen: false }),
  closeRegisterModal: () => set({ registerModalOpen: false }),

  // Theme actions
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    }
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
      }
      return { theme: newTheme };
    }),

  // Mobile menu actions
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));