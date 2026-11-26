import { useLocalStorage } from "./useStorage";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "favorite_product_ids",
    [],
  );

  const safeIds = Array.isArray(favoriteIds) ? favoriteIds : [];

  function toggleFavorite(productId: number) {
    // Backend replacement: call POST/DELETE /api/favorites/${productId}
    setFavoriteIds((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list.includes(productId)
        ? list.filter((id) => id !== productId)
        : [...list, productId];
    });
  }

  return {
    favoriteIds: safeIds,
    isFavorite: (id: number) => safeIds.includes(id),
    toggleFavorite,
  };
}
