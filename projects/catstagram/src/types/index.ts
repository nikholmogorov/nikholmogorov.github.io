interface CardProps {
  id: string;
  url: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

type FavoriteItem = Pick<CardProps, "id" | "url">;

type HeartIconProps = Pick<CardProps, "isFavorite">;

type Theme = "light" | "dark" | "pink";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextValue {
  theme: Theme;
  handleToggleTheme: () => void;
}

interface FavoritesProviderProps {
  children: React.ReactNode;
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  handleToggleFavorite: (item: FavoriteItem) => void;
}

export type {
  CardProps,
  FavoriteItem,
  ThemeProviderProps,
  ThemeContextValue,
  FavoritesProviderProps,
  FavoritesContextValue,
  Theme,
  HeartIconProps,
};
