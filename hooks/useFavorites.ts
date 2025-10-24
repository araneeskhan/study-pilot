import { useFavoritesStore } from "@/stores/favorites-store";
import { useAuthStore } from "@/stores/auth-store";

export function useFavorites() {
  const { isAuthenticated } = useAuthStore();
  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesByType,
  } = useFavoritesStore();

  const toggleFavorite = (id: string, type: any, data?: any) => {
    if (!isAuthenticated) {
      // Show login modal or redirect
      return;
    }

    if (isFavorite(id, type)) {
      removeFavorite(id, type);
      // TODO: Call API to remove from server
    } else {
      addFavorite({ id, type, data });
      // TODO: Call API to add to server
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
  };
}