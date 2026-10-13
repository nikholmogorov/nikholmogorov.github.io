import type { ItemsGetInQuery } from "../model/schemas";

export const itemKeys = {
  all: ["items"] as const,
  lists: () => [...itemKeys.all, "list"] as const,
  list: (params: ItemsGetInQuery) => [...itemKeys.lists(), params] as const,
  details: () => [...itemKeys.all, "detail"] as const,
  detail: (id: string) => [...itemKeys.details(), id] as const,
};
