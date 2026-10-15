import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateItemDescription } from "@/features/generate-item-description/index.server";
import { OllamaClientError, type OllamaErrorCode } from "@/shared/api";

const ollamaErrors: Record<
  OllamaErrorCode,
  { status: number; message: string }
> = {
  INVALID_INPUT: {
    status: 400,
    message: "Некорректные параметры запроса",
  },
  CONFIGURATION: {
    status: 500,
    message: "Ошибка конфигурации локальной модели",
  },
  TIMEOUT: {
    status: 504,
    message: "Модель не ответила вовремя. Попробуйте ещё раз",
  },
  CONNECTION: {
    status: 503,
    message: "Не удалось подключиться к Ollama",
  },
  HTTP_ERROR: {
    status: 502,
    message: "Локальная модель вернула ошибку",
  },
  INVALID_RESPONSE: {
    status: 502,
    message: "Модель вернула некорректный ответ",
  },
  GENERATION_LIMIT: {
    status: 502,
    message: "Ответ модели оказался слишком длинным",
  },
  EMPTY_RESPONSE: {
    status: 502,
    message: "Модель вернула пустой ответ",
  },
  MODEL_NOT_FOUND: {
    status: 503,
    message:
      "Не найдена подходящая модель Ollama. Проверьте установленные модели.",
  },
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Тело запроса должно содержать корректный JSON",
      },
      { status: 400 },
    );
  }

  try {
    const result = await generateItemDescription(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Некорректные данные объявления",
          details: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    if (error instanceof OllamaClientError) {
      const mapped = ollamaErrors[error.code];

      return NextResponse.json(
        {
          success: false,
          error: mapped.message,
        },
        { status: mapped.status },
      );
    }

    console.error("Ошибка POST /api/ai/description:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Не удалось сформировать описание",
      },
      { status: 500 },
    );
  }
}
