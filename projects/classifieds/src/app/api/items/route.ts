import { type NextRequest, NextResponse } from "next/server";
import { doesItemNeedRevision, itemsGetInQuerySchema } from "@/entities/item";
import { getItemsFromDb } from "@/entities/item/index.server";
import { delay } from "@/shared/lib/utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    const parsedQuery = itemsGetInQuerySchema.safeParse(searchParams);

    await delay();

    if (!parsedQuery.success) {
      return NextResponse.json(
        { success: false, error: parsedQuery.error.format() },
        { status: 400 },
      );
    }

    const {
      q = "",
      limit,
      skip = 0,
      needsRevision,
      categories,
      sortColumn,
      sortDirection,
    } = parsedQuery.data;

    const allItems = await getItemsFromDb();

    const filteredItems = allItems.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(q.toLowerCase());
      const matchesRevision = !needsRevision || doesItemNeedRevision(item);
      const matchesCategory =
        !categories?.length || categories.some((cat) => cat === item.category);

      return matchesQuery && matchesRevision && matchesCategory;
    });

    const sortedItems = [...filteredItems].sort((item1, item2) => {
      if (!sortDirection) return 0;

      let comparisonValue = 0;

      if (sortColumn === "title") {
        comparisonValue = item1.title.localeCompare(item2.title);
      } else if (sortColumn === "createdAt") {
        comparisonValue =
          new Date(item1.createdAt).valueOf() -
          new Date(item2.createdAt).valueOf();
      } else if (sortColumn === "price") {
        comparisonValue = (item1.price ?? 0) - (item2.price ?? 0);
      }

      return (sortDirection === "desc" ? -1 : 1) * comparisonValue;
    });

    const slicedItems = limit
      ? sortedItems.slice(skip, skip + limit)
      : sortedItems.slice(skip);

    return NextResponse.json(
      {
        items: slicedItems.map((item) => ({
          id: item.id,
          category: item.category,
          title: item.title,
          price: item.price,
          needsRevision: doesItemNeedRevision(item),
        })),
        total: filteredItems.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка обработки GET /api/items:", error);
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
