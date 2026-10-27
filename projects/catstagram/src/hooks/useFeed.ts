import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchData, PAGE_SIZE } from "@api/cats";

export function useFeed() {
  return useInfiniteQuery({
    queryKey: [`cats`],
    queryFn: ({ pageParam, signal }) => fetchData(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return lastPageParam + 1;
    },
  });
}
