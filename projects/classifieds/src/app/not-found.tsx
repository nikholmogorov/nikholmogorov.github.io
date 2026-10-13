import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Страница не найдена</h1>
      <p className="mt-2 text-muted-foreground">
        Возможно, страница была удалена или адрес указан неправильно
      </p>
      <Link href="/" className="mt-6 underline underline-offset-4">
        Вернуться на главную
      </Link>
    </main>
  );
}
