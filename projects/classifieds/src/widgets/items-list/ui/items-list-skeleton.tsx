"use client";

import { ItemCardSkeleton } from "@/entities/item";

interface ItemsListSkeletonProps {
  cardSkeletonNumber: number;
  paginationButtonsNumber: number;
}

export function ItemsListSkeleton(props: ItemsListSkeletonProps) {
  const { cardSkeletonNumber, paginationButtonsNumber } = props;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid xl:grid-cols-5 grid-cols-3 gap-3 min-h-[540px] max-[501px]:grid-cols-2 max-[391px]:grid-cols-1">
        {Array.from(
          { length: cardSkeletonNumber },
          (_, index) => `card-skeleton-${index}`,
        ).map((key) => (
          <ItemCardSkeleton key={key} />
        ))}
      </div>
      <div className="flex justify-start gap-0.5 max-[501px]:justify-center">
        {Array.from(
          { length: paginationButtonsNumber },
          (_, index) => `pagination-skeleton-${index}`,
        ).map((key) => (
          <div
            key={key}
            className="w-[32px] h-[32px] rounded-lg bg-black/10 dark:bg-white/10 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
