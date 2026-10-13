import type { ItemSortColumn, SortDirection } from "@/entities/item";
import { ChangeViewMode } from "@/features/change-view-mode";
import { SearchItems } from "@/features/search-items";
import { SortItems } from "@/features/sort-items";

interface ListToolbarProps {
  onSearchChange: (query: string) => void;
  sortColumn: ItemSortColumn;
  handleSetSortColumn: (value: ItemSortColumn) => void;
  sortDirection: SortDirection;
  setSortDirection: (value: SortDirection) => void;
}

export function ListToolbar(props: ListToolbarProps) {
  const {
    onSearchChange,
    sortColumn,
    handleSetSortColumn,
    sortDirection,
    setSortDirection,
  } = props;

  return (
    <div className="flex max-[501px]:flex-col max-[501px]:w-[256px] max-[501px]:mx-auto items-center w-full gap-4 bg-card p-3 rounded-lg">
      <SearchItems onSearchChange={onSearchChange} />
      <div className="max-[501px]:hidden">
        <ChangeViewMode />
      </div>
      <SortItems
        sortColumn={sortColumn}
        handleSetSortColumn={handleSetSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>
  );
}
