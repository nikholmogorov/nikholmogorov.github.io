import type { ItemsResponse } from "../model/item";
import type { ItemsGetInQuery } from "../model/schemas";

export async function getItems(
  params: ItemsGetInQuery,
): Promise<ItemsResponse> {
  const searchParams = new URLSearchParams();

  if (params.q) {
    searchParams.set("q", params.q);
  }

  if (params.skip !== undefined) {
    searchParams.set("skip", String(params.skip));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.needsRevision !== undefined) {
    searchParams.set("needsRevision", String(params.needsRevision));
  }

  if (params.categories && params.categories.length > 0) {
    searchParams.set("categories", params.categories.join(","));
  }

  if (params.sortColumn) {
    searchParams.set("sortColumn", params.sortColumn);
  }

  if (params.sortDirection) {
    searchParams.set("sortDirection", params.sortDirection);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/api/items?${queryString}` : "/api/items";

  const response = await fetch(url, { method: "GET" });

  if (!response.ok)
    throw new Error(
      `Ошибка загрузки: ${response.status} ${response.statusText}`,
    );

  const data: ItemsResponse = await response.json();
  return data;
}
