"use client";

import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

export function Message() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <Alert className="fixed left-4 max-[501px]:right-4 bottom-4 max-[501px]:w-auto min-[501px]:w-[500px] p-4 z-100">
      <div className="flex flex-col gap-2">
        <AlertTitle className="text-base">Ограниченный демо-режим</AlertTitle>
        <AlertDescription>
          Из-за ограничений размещения на Vercel в приложении недоступны
          редактирование объявлений и AI-подсказки цены и описания.
        </AlertDescription>
        <AlertDescription>
          Для полнофункциональной работы с приложением необходимо скачать
          и запустить его на своём компьютере, следуя инструкции в README.md,
          размещённой в GitHub-репозитории.
        </AlertDescription>
        <div className="flex gap-2 mt-2">
          <Button asChild className="h-10">
            <a
              href="https://github.com/nikholmogorov/nikholmogorov.github.io/tree/main/projects/classifieds"
              target="_blank"
              rel="noopener noreferrer"
            >
              Репозиторий
            </a>
          </Button>
          <Button
            className="h-10"
            type="button"
            variant="outline"
            onClick={() => setIsVisible(false)}
          >
            Закрыть
          </Button>
        </div>
      </div>
    </Alert>
  );
}
