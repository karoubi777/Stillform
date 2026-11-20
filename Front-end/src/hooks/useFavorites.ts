import { useState, useEffect } from "react";

const STORAGE_KEY = "favorite_product_ids";
const SYNC_EVENT = "favorites-updated";

function readFavorites(): number[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(readFavorites);

  useEffect(() => {
    function sync() {
      setFavoriteIds(readFavorites());
    }
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  function toggleFavorite(productId: number) {
    // Backend replacement: call POST/DELETE /api/favorites/${productId}
    const current = readFavorites();
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setFavoriteIds(next);
    window.dispatchEvent(new Event(SYNC_EVENT));
  }

  return {
    favoriteIds,
    isFavorite: (id: number) => favoriteIds.includes(id),
    toggleFavorite,
  };
}
