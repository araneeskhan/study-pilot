import { create } from "zustand";

interface SearchFilters {
  country?: string;
  degreeLevel?: string;
  field?: string;
  minTuition?: number;
  maxTuition?: number;
  scholarshipType?: string;
  universityType?: string;
}

interface SearchState {
  // Search query
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;

  // Filters
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  updateFilter: (key: keyof SearchFilters, value: any) => void;
  clearFilters: () => void;

  // Search type
  searchType: "all" | "countries" | "universities" | "scholarships" | "programs";
  setSearchType: (
    type: "all" | "countries" | "universities" | "scholarships" | "programs"
  ) => void;

  // Results
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;

  // Recent searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // Initial states
  query: "",
  filters: {},
  searchType: "all",
  isSearching: false,
  recentSearches: [],

  // Query actions
  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: "" }),

  // Filter actions
  setFilters: (filters) => set({ filters }),
  updateFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  clearFilters: () => set({ filters: {} }),

  // Search type actions
  setSearchType: (searchType) => set({ searchType }),

  // Searching state
  setIsSearching: (isSearching) => set({ isSearching }),

  // Recent searches
  addRecentSearch: (query) =>
    set((state) => {
      const searches = [
        query,
        ...state.recentSearches.filter((s) => s !== query),
      ].slice(0, 10);
      return { recentSearches: searches };
    }),
  clearRecentSearches: () => set({ recentSearches: [] }),
}));