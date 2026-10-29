import { PAGE_SIZE } from "@/constants";

import type { Post } from "@/types";

export async function fetchData(page: number, signal?: AbortSignal): Promise<Post[]> {
  const params = new URLSearchParams({
    _limit: String(PAGE_SIZE),
    _page: String(page),
  });
  // искусственная задержка для просмотра скелетонов
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`, { signal });
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
  return response.json();
}
