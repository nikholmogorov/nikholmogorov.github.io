import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchData } from "@/api/feed";

import { PAGE_SIZE } from "@/constants";

export function useFeed() {
  return useInfiniteQuery({
    queryKey: [`feed`],
    queryFn: ({ pageParam, signal }) => fetchData(pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return lastPageParam + 1;
    },
  });
}
