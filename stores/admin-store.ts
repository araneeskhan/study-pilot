import { create } from "zustand";

interface AdminStats {
  totalCountries: number;
  totalUniversities: number;
  totalScholarships: number;
  totalPrograms: number;
  totalUsers: number;
  totalConsultations: number;
  totalBlogPosts: number;
}

interface AdminState {
  // Stats
  stats: AdminStats | null;
  setStats: (stats: AdminStats) => void;

  // Current editing item
  editingItem: any;
  setEditingItem: (item: any) => void;
  clearEditingItem: () => void;

  // View mode (table/grid)
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;

  // Bulk actions
  selectedItems: string[];
  toggleSelectItem: (id: string) => void;
  selectAllItems: (ids: string[]) => void;
  clearSelection: () => void;

  // Filters
  statusFilter: "all" | "published" | "draft";
  setStatusFilter: (filter: "all" | "published" | "draft") => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  // Initial states
  stats: null,
  editingItem: null,
  viewMode: "table",
  selectedItems: [],
  statusFilter: "all",

  // Stats actions
  setStats: (stats) => set({ stats }),

  // Editing item actions
  setEditingItem: (item) => set({ editingItem: item }),
  clearEditingItem: () => set({ editingItem: null }),

  // View mode actions
  setViewMode: (viewMode) => set({ viewMode }),

  // Bulk selection actions
  toggleSelectItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(id)
        ? state.selectedItems.filter((itemId) => itemId !== id)
        : [...state.selectedItems, id],
    })),
  selectAllItems: (ids) => set({ selectedItems: ids }),
  clearSelection: () => set({ selectedItems: [] }),

  // Filter actions
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));