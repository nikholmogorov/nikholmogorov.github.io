import { Card, CardHeader } from "@/shared/ui/card";

export function ItemCardSkeleton() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 aspect-[200/268] max-[391px]:w-[256px]">
      <div className="relative w-full">
        <div className="aspect-[4/3] w-full animate-pulse bg-black/10 dark:bg-white/10" />
      </div>
      <CardHeader>
        <div className="mt-2 h-[22px] w-[150px] max-w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
        <div className="h-[20px] w-[120px] max-w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      </CardHeader>
    </Card>
  );
}
