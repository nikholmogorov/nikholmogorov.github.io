"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import {
  formatAnnouncementCount,
  ITEMS_PER_PAGE,
  useGetItems,
} from "@/entities/item";
import type {
  ItemCategory,
  ItemSortColumn,
  SortDirection,
} from "@/entities/item/";
import { ItemsList } from "@/widgets/items-list";
import { ListFilters } from "@/widgets/list-filters";
import { ListToolbar } from "@/widgets/list-toolbar";

export function ListPage() {
  const [searchQuery, setSearchQuery] = useState(``);
  const [sortColumn, setSortColumn] = useState<ItemSortColumn>(`title`);
  const [sortDirection, setSortDirection] = useState<SortDirection>(`asc`);
  const [categories, setCategories] = useState<ItemCategory[]>([]);
  const [needsRevision, setNeedsRevision] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams?.get(`page`));
  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query.trim());
      router.replace("/", { scroll: false });
    },
    [router],
  );

  function handleSetSortColumn(value: ItemSortColumn) {
    setSortColumn(value);
    router.replace("/", { scroll: false });
  }

  function handleCategoryChange(category: ItemCategory, checked: boolean) {
    setCategories((prev) =>
      checked === true
        ? [...prev, category]
        : prev.filter((item) => item !== category),
    );
    router.replace("/", { scroll: false });
  }

  function handleSetNeedsRevision(value: boolean) {
    setNeedsRevision(value);
    router.replace("/", { scroll: false });
  }

  function onResetFilters() {
    setCategories([]);
    setNeedsRevision(false);
    router.replace("/", { scroll: false });
  }

  const { data, isLoading, isError, error } = useGetItems({
    q: searchQuery,
    skip,
    limit: ITEMS_PER_PAGE,
    sortColumn: sortColumn,
    sortDirection: sortDirection,
    categories: categories,
    needsRevision: needsRevision,
  });

  return (
    <>
      <div className="py-6">
        <h1 className="text-2xl font-semibold max-[501px]:text-center">
          Мои объявления
        </h1>
        <p className="text-lg max-[501px]:text-center">
          {data ? formatAnnouncementCount(data.total) : `Загрузка объявлений`}
        </p>
      </div>
      <ListToolbar
        onSearchChange={handleSearchChange}
        sortColumn={sortColumn}
        handleSetSortColumn={handleSetSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <div className="flex gap-6 mt-4 items-start max-[821px]:items-center max-[821px]:flex-col">
        <ListFilters
          categories={categories}
          needsRevision={needsRevision}
          handleSetNeedsRevision={handleSetNeedsRevision}
          handleCategoryChange={handleCategoryChange}
          onResetFilters={onResetFilters}
        />
        <ItemsList
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
