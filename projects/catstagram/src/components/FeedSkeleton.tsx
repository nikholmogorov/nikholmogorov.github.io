const SKELETON_ARRAY = Array(18).fill(null);

export default function FeedSkeleton() {
  return (
    <main className="min-h-dvh bg-background">
      <ul className="grid grid-cols-[repeat(auto-fit,300px)] justify-center gap-4 mt-[50px]">
        {SKELETON_ARRAY.map((_, index) => (
          <div
            key={`skeleton-card-${index}`}
            className="aspect-square w-[300px] bg-border animate-pulse"
          ></div>
        ))}
      </ul>
    </main>
  );
}
