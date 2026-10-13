import "server-only";

export type OllamaErrorCode =
  | "INVALID_INPUT"
  | "CONFIGURATION"
  | "TIMEOUT"
  | "CONNECTION"
  | "HTTP_ERROR"
  | "INVALID_RESPONSE"
  | "GENERATION_LIMIT"
  | "EMPTY_RESPONSE";

export type OllamaResponseFormat = "text" | "json" | Record<string, unknown>;

interface GenerateOllamaTextOptions {
  prompt: string;
  system?: string;
  temperature?: number;
  numPredict?: number;
  timeoutMs?: number;
  responseFormat?: OllamaResponseFormat;
}

interface OllamaRequestMessage {
  role: "system" | "user";
  content: string;
}

export class OllamaClientError extends Error {
  constructor(
    message: string,
    public readonly code: OllamaErrorCode,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "OllamaClientError";
  }
}

const DEFAULT_BASE_URL = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen-ru:latest";
const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_NUM_PREDICT = 600;
const DEFAULT_TEMPERATURE = 0.2;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getPositiveInteger(
  value: string | undefined,
  fallback: number,
): number {
  if (!value) return fallback;

  const parsed = Number(value);

  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Неизвестная ошибка";
}

function isTimeoutError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError")
  );
}

export async function generateOllamaText({
  prompt,
  system,
  temperature = DEFAULT_TEMPERATURE,
  numPredict = DEFAULT_NUM_PREDICT,
  timeoutMs,
  responseFormat = "text",
}: GenerateOllamaTextOptions): Promise<string> {
  const normalizedPrompt = prompt.trim();

  if (!normalizedPrompt) {
    throw new OllamaClientError(
      "Промпт для модели не должен быть пустым",
      "INVALID_INPUT",
    );
  }

  if (!Number.isSafeInteger(numPredict) || numPredict < 1) {
    throw new OllamaClientError(
      "Лимит генерации должен быть положительным целым числом",
      "INVALID_INPUT",
    );
  }

  if (!Number.isFinite(temperature) || temperature < 0) {
    throw new OllamaClientError(
      "Температура генерации должна быть неотрицательным числом",
      "INVALID_INPUT",
    );
  }

  if (
    timeoutMs !== undefined &&
    (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1)
  ) {
    throw new OllamaClientError(
      "Таймаут должен быть положительным целым числом",
      "INVALID_INPUT",
    );
  }

  const baseUrl = (
    process.env.OLLAMA_BASE_URL?.trim() || DEFAULT_BASE_URL
  ).replace(/\/+$/, "");

  const model = process.env.OLLAMA_MODEL?.trim() || DEFAULT_MODEL;

  const requestTimeout =
    timeoutMs ??
    getPositiveInteger(process.env.OLLAMA_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);

  let endpoint: string;

  try {
    endpoint = new URL(`${baseUrl}/api/chat`).toString();
  } catch {
    throw new OllamaClientError("Некорректный адрес Ollama", "CONFIGURATION");
  }

  const systemInstructions = [
    system?.trim(),
    responseFormat !== "text"
      ? [
          "Верни только один корректный JSON-объект.",
          "Не добавляй Markdown, комментарии или текст вне JSON.",
          "Соблюдай заданную JSON Schema, если она передана.",
        ].join(" ")
      : undefined,
  ]
    .filter((instruction): instruction is string => Boolean(instruction))
    .join("\n\n");

  const messages: OllamaRequestMessage[] = [];

  if (systemInstructions) {
    messages.push({
      role: "system",
      content: systemInstructions,
    });
  }

  messages.push({
    role: "user",
    content: normalizedPrompt,
  });

  const requestBody = {
    model,
    messages,
    think: false,
    stream: false,
    options: {
      temperature,
      num_predict: numPredict,
    },
    ...(responseFormat !== "text" ? { format: responseFormat } : {}),
  };

  let response: Response;
  let rawBody: string;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
      signal: AbortSignal.timeout(requestTimeout),
    });

    rawBody = await response.text();
  } catch (error) {
    if (isTimeoutError(error)) {
      throw new OllamaClientError(
        "Превышено время ожидания ответа от Ollama",
        "TIMEOUT",
      );
    }

    throw new OllamaClientError(
      `Не удалось подключиться к Ollama: ${getErrorMessage(error)}`,
      "CONNECTION",
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const detail =
      isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : rawBody || response.statusText;

    throw new OllamaClientError(
      `Ollama вернула HTTP ${response.status}: ${detail.slice(0, 300)}`,
      "HTTP_ERROR",
      response.status,
    );
  }

  if (!isRecord(payload)) {
    throw new OllamaClientError(
      "Ollama вернула некорректный JSON",
      "INVALID_RESPONSE",
    );
  }

  if (payload.done_reason === "length") {
    throw new OllamaClientError(
      "Ответ модели обрезан из-за достижения лимита генерации",
      "GENERATION_LIMIT",
    );
  }

  const message = payload.message;

  if (!isRecord(message) || typeof message.content !== "string") {
    throw new OllamaClientError(
      "В ответе Ollama отсутствует текст",
      "INVALID_RESPONSE",
    );
  }

  const content = message.content.trim();

  if (!content) {
    throw new OllamaClientError(
      "Модель вернула пустой ответ",
      "EMPTY_RESPONSE",
    );
  }

  if (responseFormat !== "text") {
    try {
      JSON.parse(content);
    } catch {
      throw new OllamaClientError(
        "Модель вернула некорректный JSON",
        "INVALID_RESPONSE",
      );
    }
  }

  return content;
}
