"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage(props: ErrorPageProps) {
  const { error, reset } = props;

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold">500</p>
      <h1 className="mt-4 text-2xl font-semibold">Ошибка</h1>
      <p className="mt-2 text-muted-foreground">
        Произошла непредвиденная ошибка
      </p>
      {error.digest && (
        <p className="mt-2 text-base text-muted-foreground">
          Код ошибки: {error.digest}
        </p>
      )}
      <Button
        className="mt-6 rounded-md bg-primary px-5 h-10 text-base text-primary-foreground hover:opacity-90"
        onClick={reset}
      >
        Попробовать снова
      </Button>
      <Link href="/" className="mt-4 underline underline-offset-4">
        Вернуться на главную
      </Link>
    </main>
  );
}
