import type { Item } from "../model/item";

export async function getItemById(id: number | string): Promise<Item> {
  const response = await fetch(`/api/items/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Ошибка загрузки объявления: ${response.status} ${response.statusText}`,
    );
  }

  const data: Item = await response.json();
  return data;
}
