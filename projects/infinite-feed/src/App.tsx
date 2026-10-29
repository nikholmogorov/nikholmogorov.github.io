import { useState, useEffect, useRef } from "react";

import { Card } from "@/components/Card";
import { CardSkeleton } from "@/components/CardSkeleton";
import { Modal } from "@/components/Modal";

import { useFeed } from "@/hooks/useFeed";

import type { Post } from "@/types";

export default function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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

  function handleRetryNextPage() {
    void fetchNextPage();
  }

  if (isLoading)
    return (
      <main>
        <div className="flex flex-col items-center gap-5 my-5">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      </main>
    );

  if (isError && !data)
    return (
      <main>
        <div className="flex flex-col justify-center items-center gap-5 min-h-dvh">
          <p>Error: {(error as Error).message}</p>
          <button type="button" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      </main>
    );

  if (!data)
    return (
      <main>
        <div className="flex flex-col justify-center items-center gap-5 min-h-dvh">
          <p>No data to show yet!</p>
          <button type="button" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      </main>
    );

  const posts = data.pages.flat();

  return (
    <>
      <main>
        <div className="flex flex-col items-center gap-5 my-5">
          {posts.map((post) => (
            <Card key={post.id} post={post} onClick={() => setSelectedPost(post)} />
          ))}
          <div className="flex flex-col items-center gap-5" ref={sentinelRef}>
            {isFetchingNextPage &&
              Array(3)
                .fill(null)
                .map((_, index) => <CardSkeleton key={index} />)}
            {isFetchNextPageError && (
              <div className="flex flex-col items-center gap-5 ">
                <p>Couldn't load more posts!</p>
                <button type="button" onClick={handleRetryNextPage}>
                  Try again
                </button>
              </div>
            )}
            {!hasNextPage && <p className="flex justify-center py-5">You've reached the end!</p>}
          </div>
        </div>
      </main>
      {selectedPost && <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  );
}
