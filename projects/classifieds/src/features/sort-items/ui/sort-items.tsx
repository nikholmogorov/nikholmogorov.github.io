"use client";

import type { ItemSortColumn, SortDirection } from "@/entities/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface SortItemsProps {
  sortColumn: ItemSortColumn;
  handleSetSortColumn: (value: ItemSortColumn) => void;
  sortDirection: SortDirection;
  setSortDirection: (value: SortDirection) => void;
}

export function SortItems(props: SortItemsProps) {
  const { sortColumn, handleSetSortColumn, sortDirection, setSortDirection } =
    props;

  const value = `${sortColumn}-${sortDirection}`;

  function handleSortChange(value: string) {
    if (value === `title-asc`) {
      handleSetSortColumn(`title`);
      setSortDirection(`asc`);
      return;
    } else if (value === `title-desc`) {
      handleSetSortColumn(`title`);
      setSortDirection(`desc`);
      return;
    } else if (value === `createdAt-asc`) {
      handleSetSortColumn("createdAt");
      setSortDirection("asc");
      return;
    } else if (value === `createdAt-desc`) {
      handleSetSortColumn("createdAt");
      setSortDirection("desc");
      return;
    } else if (value === `price-asc`) {
      handleSetSortColumn("price");
      setSortDirection("asc");
      return;
    } else if (value === `price-desc`) {
      handleSetSortColumn("price");
      setSortDirection("desc");
      return;
    }
  }

  return (
    <Select value={value} onValueChange={handleSortChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Сортировка</SelectLabel>
          <SelectItem value="title-asc">По названию (А–Я)</SelectItem>
          <SelectItem value="title-desc">По названию (Я–А)</SelectItem>
          <SelectItem value="createdAt-asc">
            По новизне (сначала новые)
          </SelectItem>
          <SelectItem value="createdAt-desc">
            По новизне (сначала старые)
          </SelectItem>
          <SelectItem value="price-asc">По цене (сначала дешевле)</SelectItem>
          <SelectItem value="price-desc">По цене (сначала дороже)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
