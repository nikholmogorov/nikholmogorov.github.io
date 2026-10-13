"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ThemeProvider } from "@/app/providers/theme-provider";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground"
        style={{
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <p className="text-7xl font-bold">500</p>
            <h1 className="mt-4 text-2xl font-semibold">Критическая ошибка</h1>
            <p className="mt-2 text-muted-foreground">
              Произошла непредвиденная ошибка
            </p>
            {error.digest && (
              <p className="mt-2 text-base text-muted-foreground">
                Код ошибки: {error.digest}
              </p>
            )}
            <button
              type="button"
              onClick={retry}
              className="mt-6 rounded-md bg-primary px-5 h-10 text-base text-primary-foreground hover:opacity-90"
            >
              Попробовать снова
            </button>
            <Link href="/" className="mt-4 underline underline-offset-4">
              Вернуться на главную
            </Link>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
