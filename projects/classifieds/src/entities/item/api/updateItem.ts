import type { Item } from "../model/item";
import type { ItemUpdateIn } from "../model/schemas";

export async function updateItem(
  id: number | string,
  data: ItemUpdateIn,
): Promise<Item> {
  const response = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Ошибка обновления объявления #${id}: ${response.status}`);
  }

  const updatedItem: Item = await response.json();
  return updatedItem;
}
