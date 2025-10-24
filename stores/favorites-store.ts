import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteItem {
  id: string;
  type: "country" | "university" | "scholarship" | "program";
  data?: any;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string, type: string) => void;
  isFavorite: (id: string, type: string) => boolean;
  getFavoritesByType: (type: string) => FavoriteItem[];
  clearFavorites: () => void;
  syncFavorites: (serverFavorites: FavoriteItem[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some(
            (fav) => fav.id === item.id && fav.type === item.type
          );
          if (exists) return state;
          return { favorites: [...state.favorites, item] };
        }),

      removeFavorite: (id, type) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => !(fav.id === id && fav.type === type)
          ),
        })),

      isFavorite: (id, type) => {
        const state = get();
        return state.favorites.some(
          (fav) => fav.id === id && fav.type === type
        );
      },

      getFavoritesByType: (type) => {
        const state = get();
        return state.favorites.filter((fav) => fav.type === type);
      },

      clearFavorites: () => set({ favorites: [] }),

      syncFavorites: (serverFavorites) =>
        set({ favorites: serverFavorites }),
    }),
    {
      name: "favorites-storage",
    }
  )
);