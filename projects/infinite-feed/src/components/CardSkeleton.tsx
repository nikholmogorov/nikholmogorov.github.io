export function CardSkeleton() {
  const skeleton = `h-5 bg-[var(--color-element)] opacity-15 animate-pulse`;

  return (
    <div className="p-2.5 w-[37.5rem] max-[501px]:w-[22.5rem] max-[361px]:w-[20rem] text-left border border-[color:var(--color-element)] bg-[var(--color-background)]">
      <div className="flex items-center gap-2.5">
        <span className={`w-4.5 ${skeleton}`}></span>
        <span className={`w-20 ${skeleton}`}></span>
      </div>
      <div className={`w-2/4 mt-3 ${skeleton}`}></div>
      <div className={`w-full mt-2 ${skeleton}`}></div>
      <div className={`w-3/4 mt-2 ${skeleton}`}></div>
    </div>
  );
}
