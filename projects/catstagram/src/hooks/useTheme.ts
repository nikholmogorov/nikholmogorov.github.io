import { useContext } from "react";

import { ThemeContext } from "@/components/ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error(`useTheme must be used within FavoritesProvider`);
  }

  return context;
}
