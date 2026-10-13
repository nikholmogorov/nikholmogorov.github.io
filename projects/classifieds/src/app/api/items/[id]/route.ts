import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  doesItemNeedRevision,
  type Item,
  itemUpdateInSchema,
} from "@/entities/item";
import { getItemsFromDb, saveItemsToDb } from "@/entities/item/index.server";
import { delay } from "@/shared/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    await delay();
    const items = await getItemsFromDb();
    const item = items.find((item) => String(item.id) === id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Объявление с таким id не найдено" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        ...item,
        needsRevision: doesItemNeedRevision(item),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка обработки GET /api/items/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    await delay();
    const items = await getItemsFromDb();
    const itemIndex = items.findIndex((item) => String(item.id) === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Объявление с таким id не найдено" },
        { status: 404 },
      );
    }

    const currentItem = items[itemIndex];

    const body = await request.json();

    const parsedData = itemUpdateInSchema.parse({
      ...body,
      category: body.category ?? currentItem.category,
    });

    const updatedItem = {
      ...currentItem,
      ...parsedData,
      params: parsedData.params ?? {},
      updatedAt: new Date().toISOString(),
    } as Item;

    items[itemIndex] = updatedItem;

    await saveItemsToDb(items);

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.format() },
        { status: 400 },
      );
    }

    console.error("Ошибка обработки PUT /api/items/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
