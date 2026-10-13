"use client";

import { Separator } from "@/shared/ui/separator";

export function ItemDetailsSkeleton() {
  return (
    <>
      <div className="flex flex-col justify-between py-8">
        <div className="flex w-full justify-between max-[501px]:flex-col">
          <div className="mb-3 h-[50px] min-w-0 w-full max-w-[620px] rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
          <div className="mb-3 h-[50px] w-[200px] shrink-0 rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
        </div>

        <div className="flex justify-between max-[501px]:flex-col max-[501px]:gap-4">
          <div className="h-[40px] w-[180px] shrink-0 rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
          <div className="h-[40px] w-[280px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
        </div>
      </div>

      <Separator />
      <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:grid-cols-[480px_500px]">
        <div className="flex w-full max-w-[480px] min-w-0 flex-col gap-2">
          <div className="aspect-[4/3] w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
          <div className="flex w-full justify-start gap-2">
            <div className="aspect-[4/3] min-w-0 max-w-[96px] flex-1 rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
            <div className="aspect-[4/3] min-w-0 max-w-[96px] flex-1 rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
            <div className="aspect-[4/3] min-w-0 max-w-[96px] flex-1 rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
            <div className="aspect-[4/3] min-w-0 max-w-[96px] flex-1 rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="h-[40px] w-[160px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
          <div className="flex w-full max-w-[300px] justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <div className="h-[24px] w-[40px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[60px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[80px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[100px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[120px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[140px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-end gap-2">
              <div className="h-[24px] w-[140px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[120px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[100px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[80px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[60px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
              <div className="h-[24px] w-[40px] max-w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="h-[44px] w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
          <div className="h-[80px] w-full rounded-lg bg-black/10 animate-pulse dark:bg-white/10" />
        </div>
      </div>
    </>
  );
}
