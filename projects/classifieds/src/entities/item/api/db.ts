import fs from "node:fs/promises";
import path from "node:path";
import type { Item } from "../model/item";

const filePath = path.join(process.cwd(), "data", "items.json");

export async function getItemsFromDb(): Promise<Item[]> {
  try {
    const rawData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(rawData) as Item[];
  } catch (error) {
    console.error("Ошибка чтения из файла data/items.json:", error);
    return [];
  }
}

export async function saveItemsToDb(items: Item[]): Promise<void> {
  try {
    const content = JSON.stringify(items, null, 2);
    await fs.writeFile(filePath, content, "utf-8");
  } catch (error) {
    console.error("Ошибка записи в файл data/items.json:", error);
    throw new Error("Не удалось сохранить данные");
  }
}
