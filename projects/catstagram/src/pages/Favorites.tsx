import { useState, useEffect, useMemo } from "react";

import Card from "@components/Card";

import { useFavorites } from "@hooks/useFavorites";

import type { FavoriteItem } from "@/types";

export default function Favorites() {
  const { favorites, handleToggleFavorite } = useFavorites();
  const [displayedFavorites] = useState<FavoriteItem[]>(favorites);

  useEffect(() => {
    document.title = `Catstagram | Favorites`;
  }, []);

  const favoritesSet = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);

  if (displayedFavorites.length === 0)
    return (
      <main className="flex justify-center items-center min-h-dvh bg-background">
        <p>No favorites yet!</p>
      </main>
    );

  return (
    <main className="min-h-dvh bg-background">
      <div className="grid grid-cols-[repeat(auto-fit,300px)] justify-center gap-4 mt-[50px]">
        {displayedFavorites.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            url={item.url}
            isFavorite={favoritesSet.has(item.id)}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        ))}
      </div>
    </main>
  );
}
