import { useContext } from "react";

import { FavoritesContext } from "@/components/FavoritesProvider";

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error(`useFavorites must be used within ThemeProvider`);
  }

  return context;
}
