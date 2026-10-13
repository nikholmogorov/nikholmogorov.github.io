import { useQuery } from "@tanstack/react-query";
import type { Item } from "../model/item";
import { getItemById } from "./getItemById";
import { itemKeys } from "./itemKeys";

export function useGetItemById(id: string) {
  return useQuery<Item>({
    queryKey: itemKeys.detail(id),
    queryFn: () => getItemById(id),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
