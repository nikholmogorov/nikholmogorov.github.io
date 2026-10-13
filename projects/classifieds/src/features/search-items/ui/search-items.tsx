"use client";

import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { debounce } from "@/entities/item";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";

interface SearchItemsProps {
  onSearchChange: (query: string) => void;
}

export function SearchItems(props: SearchItemsProps) {
  const { onSearchChange } = props;

  const [value, setValue] = useState(``);

  const debouncedSearch = useMemo(
    () => debounce(onSearchChange, 500),
    [onSearchChange],
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  }

  return (
    <ButtonGroup className="grow">
      <Input
        placeholder="Найти объявление"
        value={value}
        onChange={handleChange}
      />
      <Button variant="outline" aria-label="Поиск">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
