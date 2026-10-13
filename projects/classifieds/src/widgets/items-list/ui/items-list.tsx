"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ITEMS_PER_PAGE, ItemCard } from "@/entities/item";
import type { ItemsResponse } from "@/entities/item/";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { ErrorMessage } from "@/shared/ui/error-message";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shared/ui/pagination";
import { ItemsListSkeleton } from "./items-list-skeleton";

interface ItemsListProps {
  data: ItemsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  currentPage: number;
}

export function ItemsList(props: ItemsListProps) {
  const { data, isLoading, isError, error, currentPage } = props;

  const router = useRouter();
  const pagesCount = Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE);
  function goToPage(page: number) {
    router.push(`/?page=${page}`, { scroll: false });
  }
  if (isLoading)
    return (
      <ItemsListSkeleton
        cardSkeletonNumber={ITEMS_PER_PAGE}
        paginationButtonsNumber={6}
      />
    );
  if (isError)
    return (
      <ErrorMessage
        title="Не удалось загрузить данные"
        errorMessage={error?.message}
      />
    );
  if (data?.total === 0)
    return (
      <EmptyMessage
        title="Объявления не найдены"
        description="Объявления отсутствуют или не соответствуют выбранным параметрам поиска"
      />
    );

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid xl:grid-cols-5 grid-cols-3 gap-3 min-h-[540px] max-[501px]:grid-cols-2 max-[391px]:grid-cols-1">
        {data?.items.map((item) => (
          <Link className="block h-full" key={item.id} href={`/${item.id}`}>
            <ItemCard
              category={item.category}
              title={item.title}
              price={item.price}
              isNeedRevision={item.needsRevision}
            />
          </Link>
        ))}
      </div>
      <Pagination className="justify-start max-[501px]:justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={`/?page=${Math.max(1, currentPage - 1)}`}
              aria-label="Предыдущая страница"
              onClick={(event) => {
                event.preventDefault();
                goToPage(Math.max(1, currentPage - 1));
              }}
            >
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
          {Array.from({ length: pagesCount }, (_, index) => index + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`/?page=${page}`}
                  isActive={currentPage === page}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationLink
              href={`/?page=${Math.min(pagesCount, currentPage + 1)}`}
              aria-label="Следующая страница"
              onClick={(event) => {
                event.preventDefault();
                goToPage(Math.min(pagesCount, currentPage + 1));
              }}
            >
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
