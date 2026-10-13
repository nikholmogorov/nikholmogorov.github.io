"use client";

import { Lightbulb, LoaderCircle, RotateCcw } from "lucide-react";
import { useState } from "react";

import type { Item } from "@/entities/item";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import {
  type DescriptionSuggestionOut,
  descriptionSuggestionOutSchema,
} from "../model/schemas";

type RequestStatus = "idle" | "loading" | "success" | "error";

interface GenerateItemDescriptionProps {
  item: Item;
  onApply: (description: string) => void;
}

function getApiError(payload: unknown): string {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  return "Не удалось сформировать описание. Попробуйте ещё раз.";
}

export function GenerateItemDescription({
  item,
  onApply,
}: GenerateItemDescriptionProps) {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [suggestion, setSuggestion] = useState<DescriptionSuggestionOut | null>(
    null,
  );
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const hasDescription = Boolean(item.description?.trim());

  const handleRequest = async () => {
    if (status === "loading") return;

    const mode = item.description?.trim() ? "improve" : "generate";

    setStatus("loading");
    setIsOpen(false);
    setSuggestion(null);
    setError("");

    try {
      const response = await fetch("/api/ai/description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          category: item.category,
          title: item.title,
          description: item.description ?? "",
          price: item.price,
          params: item.params,
        }),
      });

      if (!response.ok) {
        const payload: unknown = await response.json().catch(() => null);
        throw new Error(getApiError(payload));
      }

      const payload: unknown = await response.json().catch(() => null);

      const result = descriptionSuggestionOutSchema.safeParse(payload);

      if (!result.success) {
        throw new Error("Сервер вернул некорректное описание");
      }

      setSuggestion(result.data);
      setStatus("success");
      setIsOpen(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Не удалось сформировать описание",
      );
      setStatus("error");
      setIsOpen(true);
    }
  };

  return (
    <div className="relative mt-2 w-full">
      <Button
        className="border-amber-500 bg-amber-400! text-amber-950 hover:bg-amber-500! hover:text-amber-950 dark:border-amber-300 dark:bg-amber-400! dark:text-amber-950 dark:hover:bg-amber-300!"
        type="button"
        variant="outline"
        disabled={status === "loading"}
        onClick={handleRequest}
        aria-expanded={isOpen}
        aria-controls="description-ai-result"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
            Выполняется запрос
          </>
        ) : status !== "idle" ? (
          <>
            <RotateCcw className="mr-2 size-4" aria-hidden="true" />
            Повторить запрос
          </>
        ) : (
          <>
            <Lightbulb className="mr-2 size-4" aria-hidden="true" />
            {hasDescription ? "Улучшить описание" : "Придумать описание"}
          </>
        )}
      </Button>

      {isOpen && (
        <div
          id="description-ai-result"
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-[900px] max-[821px]:w-fit rounded-lg border p-4 shadow-lg",
            status === "error"
              ? "border-destructive/40 bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] text-foreground"
              : "border-border bg-popover text-popover-foreground",
          )}
        >
          {status === "success" && suggestion ? (
            <>
              <h3 className="font-semibold">Предложенное описание</h3>

              <div className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap break-words text-sm">
                {suggestion.description}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    onApply(suggestion.description);
                    setIsOpen(false);
                  }}
                >
                  Применить
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Закрыть
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="font-medium text-destructive">
                Не удалось сформировать описание
              </p>

              <p className="mt-2 text-sm text-destructive">{error}</p>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsOpen(false)}
                >
                  Закрыть
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
