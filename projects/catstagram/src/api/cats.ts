import type { CardProps } from "@/types";

export const PAGE_SIZE = 18;

export async function fetchData(page: number, signal?: AbortSignal): Promise<CardProps[]> {
  const apiKey = import.meta.env.VITE_CAT_API_KEY;
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    page: String(page),
    order: `RAND`,
    mime_types: `jpg`,
  });
  // искусственная задержка для просмотра скелетонов
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?${params}`, {
    signal,
    headers: {
      "x-api-key": apiKey,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch cats: ${response.status}`);
  return response.json();
}
