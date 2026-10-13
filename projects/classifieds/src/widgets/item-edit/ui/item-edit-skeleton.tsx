"use client";

import { Separator } from "@/shared/ui/separator";

export function ItemEditSkeleton() {
  return (
    <>
      <div className="mt-8 mb-8 w-[440px] max-[431px]:w-[230px] h-[40px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="mt-8 mb-2 w-[100px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <Separator className="mt-4" />
      <div className="mt-8 mb-2 w-[100px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <Separator className="mt-4" />
      <div className="flex items-end gap-6 max-[821px]:flex-col max-[821px]:items-start max-[821px]:gap-0">
        <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] shrink-0">
          <div className="mt-8 mb-2 w-[60px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
          <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
        </div>
        <div className="min-w-0 flex-1 mb-0 max-[821px]:mt-6">
          <div className="w-[210px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="mt-4 w-[150px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="mt-8 mb-2 w-[120px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="mt-8 mb-2 w-[60px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="mt-8 mb-2 w-[120px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="mt-8 mb-2 w-[60px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[32px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <Separator className="mt-4" />
      <div className="mt-8 mb-2 w-[100px] h-[24px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[900px] max-[821px]:w-[780px] max-[769px]:w-[730px] max-[501px]:w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px] h-[115px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="w-[210px] h-[32px] mt-2 bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      <div className="flex gap-2 my-9">
        <div className="w-[100px] h-[40px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
        <div className="w-[100px] h-[40px] bg-black/10 dark:bg-white/10 rounded-lg animate-pulse"></div>
      </div>
    </>
  );
}
