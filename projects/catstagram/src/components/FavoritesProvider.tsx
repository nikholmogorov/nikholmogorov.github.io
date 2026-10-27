import { useState, useEffect, createContext, useCallback, useMemo } from "react";

import type { FavoriteItem, FavoritesProviderProps, FavoritesContextValue } from "@/types";

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export default function FavoritesProvider(props: FavoritesProviderProps) {
  const { children } = props;

  const [favorites, setFavorites] = useState<FavoriteItem[]>(getFavoritesFromStorage);

  useEffect(() => {
    localStorage.setItem(`favorites`, JSON.stringify(favorites));
  }, [favorites]);

  function getFavoritesFromStorage(): FavoriteItem[] {
    const savedFavorites = localStorage.getItem(`favorites`);
    if (!savedFavorites) return [];
    try {
      return JSON.parse(savedFavorites);
    } catch {
      return [];
    }
  }

  const handleToggleFavorite = useCallback(
    (item: FavoriteItem) => {
      if (favorites.some((i) => i.id === item.id)) {
        setFavorites(favorites.filter((j) => j.id !== item.id));
      } else {
        setFavorites([...favorites, item]);
      }
    },
    [favorites],
  );

  const value = useMemo(
    () => ({ favorites, handleToggleFavorite }),
    [favorites, handleToggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
