import { useEffect, useMemo, useRef } from "react";

import Card from "@components/Card";
import FeedSkeleton from "@components/FeedSkeleton";

import { useFeed } from "@hooks/useFeed";
import { useFavorites } from "@hooks/useFavorites";

export default function Feed() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    refetch,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useFeed();
  const { favorites, handleToggleFavorite } = useFavorites();

  function handleRetryNextPage() {
    void fetchNextPage();
  }

  useEffect(() => {
    document.title = `Catstagram | Feed`;
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetching || isFetchNextPageError) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasNextPage && !isFetching) {
          void fetchNextPage();
        }
      },
      {
        rootMargin: `0px 0px 300px 0px`,
      },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching, isFetchNextPageError]);

  const favoritesSet = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);

  if (isLoading) return <FeedSkeleton />;
  if (isError && !data)
    return (
      <main className="flex flex-col justify-center items-center gap-4 min-h-dvh bg-background">
        <p>Error: {(error as Error).message}</p>
        <button type="button" className="active-element px-4 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </main>
    );

  if (!data)
    return (
      <main className="flex flex-col justify-center items-center gap-4 min-h-dvh bg-background">
        <p>No data to show yet!</p>
        <button type="button" className="active-element px-4 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </main>
    );

  const dataArr = data.pages.flat();

  return (
    <main className="min-h-dvh bg-background">
      <div className="grid grid-cols-[repeat(auto-fit,300px)] justify-center gap-4 mt-[50px]">
        {dataArr.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            url={item.url}
            isFavorite={favoritesSet.has(item.id)}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        ))}
      </div>
      <div ref={sentinelRef}>
        {isFetchingNextPage && (
          <div className="flex justify-center py-6">
            <svg
              className="h-12 w-12 animate-spin text-accent"
              viewBox="0 0 24 24"
              fill="none"
              role="status"
              aria-label="Загрузка"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-25"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="16 47"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        {isFetchNextPageError && (
          <button
            className="active-element flex h-[3.125rem] w-fit items-center p-2"
            type="button"
            onClick={handleRetryNextPage}
          >
            Try again
          </button>
        )}
        {!hasNextPage && <p className="flex justify-center py-6">You've reached the end!</p>}
      </div>
    </main>
  );
}
