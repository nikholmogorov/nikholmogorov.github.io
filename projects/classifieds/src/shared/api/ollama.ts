import "server-only";

export type OllamaErrorCode =
  | "INVALID_INPUT"
  | "CONFIGURATION"
  | "TIMEOUT"
  | "CONNECTION"
  | "HTTP_ERROR"
  | "INVALID_RESPONSE"
  | "GENERATION_LIMIT"
  | "EMPTY_RESPONSE"
  | "MODEL_NOT_FOUND";

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

interface ModelListCache {
  baseUrl: string;
  expiresAt: number;
  names: Set<string>;
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
const DEFAULT_PRIMARY_MODEL = "qwen2.5:1.5b";
const DEFAULT_FALLBACK_MODEL = "qwen-ru:latest";
const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_NUM_PREDICT = 600;
const DEFAULT_TEMPERATURE = 0.2;

// Кешируем список моделей на 10 секунд.
const MODEL_LIST_CACHE_TTL_MS = 10_000;

let modelListCache: ModelListCache | undefined;

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

/**
 * Получает список установленных моделей Ollama.
 * Результат успешно выполненного запроса кешируется на 10 секунд.
 */
async function getInstalledModelNames(
  baseUrl: string,
  timeoutMs: number,
): Promise<Set<string>> {
  if (
    modelListCache &&
    modelListCache.baseUrl === baseUrl &&
    modelListCache.expiresAt > Date.now()
  ) {
    return modelListCache.names;
  }

  let response: Response;
  let rawBody: string;

  try {
    response = await fetch(`${baseUrl}/api/tags`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });

    rawBody = await response.text();
  } catch (error) {
    if (isTimeoutError(error)) {
      throw new OllamaClientError(
        "Превышено время ожидания списка моделей Ollama",
        "TIMEOUT",
      );
    }

    throw new OllamaClientError(
      `Не удалось получить список моделей Ollama: ${getErrorMessage(error)}`,
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
      `Ошибка получения списка моделей Ollama: HTTP ${response.status}: ${detail.slice(0, 300)}`,
      "HTTP_ERROR",
      response.status,
    );
  }

  if (!isRecord(payload) || !Array.isArray(payload.models)) {
    throw new OllamaClientError(
      "Ollama вернула некорректный список моделей",
      "INVALID_RESPONSE",
    );
  }

  const names = new Set<string>();

  for (const item of payload.models) {
    if (!isRecord(item)) continue;

    const name =
      typeof item.name === "string"
        ? item.name.trim()
        : typeof item.model === "string"
          ? item.model.trim()
          : "";

    if (name) {
      names.add(name);
    }
  }

  modelListCache = {
    baseUrl,
    expiresAt: Date.now() + MODEL_LIST_CACHE_TTL_MS,
    names,
  };

  return names;
}

/**
 * Выбирает первую установленную модель по приоритету:
 * 1. OLLAMA_PRIMARY_MODEL
 * 2. OLLAMA_FALLBACK_MODEL
 */
async function selectOllamaModel(
  baseUrl: string,
  timeoutMs: number,
): Promise<string> {
  const primaryModel =
    process.env.OLLAMA_PRIMARY_MODEL?.trim() || DEFAULT_PRIMARY_MODEL;

  const fallbackModel =
    process.env.OLLAMA_FALLBACK_MODEL?.trim() || DEFAULT_FALLBACK_MODEL;

  const installedModels = await getInstalledModelNames(baseUrl, timeoutMs);

  // Основная модель всегда имеет приоритет.
  if (installedModels.has(primaryModel)) {
    return primaryModel;
  }

  // Резервная модель используется только при отсутствии основной.
  if (installedModels.has(fallbackModel)) {
    return fallbackModel;
  }

  const installedList =
    installedModels.size > 0 ? [...installedModels].join(", ") : "нет";

  throw new OllamaClientError(
    [
      "Не найдена ни одна из подходящих моделей Ollama.",
      `Основная модель: ${primaryModel}.`,
      `Резервная модель: ${fallbackModel}.`,
      `Установленные модели: ${installedList}.`,
      `Для установки основной модели выполните: ollama pull ${primaryModel}.`,
      `Для установки резервной модели выполните: ollama pull ${fallbackModel}.`,
    ].join(" "),
    "MODEL_NOT_FOUND",
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

  const requestTimeout =
    timeoutMs ??
    getPositiveInteger(process.env.OLLAMA_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);

  let endpoint: string;

  try {
    endpoint = new URL(`${baseUrl}/api/chat`).toString();
  } catch {
    throw new OllamaClientError("Некорректный адрес Ollama", "CONFIGURATION");
  }

  // Определяем установленную модель перед генерацией.
  const model = await selectOllamaModel(baseUrl, requestTimeout);

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
