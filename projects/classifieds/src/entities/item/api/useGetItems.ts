import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ItemsResponse } from "../model/item";
import type { ItemsGetInQuery } from "../model/schemas";
import { getItems } from "./getItems";
import { itemKeys } from "./itemKeys";

export function useGetItems(params: ItemsGetInQuery) {
  return useQuery<ItemsResponse>({
    queryKey: itemKeys.list(params),
    queryFn: () => getItems(params),
    placeholderData: keepPreviousData,
  });
}
