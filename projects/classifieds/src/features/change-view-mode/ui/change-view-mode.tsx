"use client";

import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

export function ChangeViewMode() {
  return (
    <ToggleGroup
      type="single"
      defaultValue="grid"
      aria-label="Режим отображения"
    >
      <ToggleGroupItem value="grid" aria-label="Отображать плиткой">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Отображать списком">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
