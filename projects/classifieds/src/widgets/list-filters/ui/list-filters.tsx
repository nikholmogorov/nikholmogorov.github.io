"use client";

import type { ItemCategory } from "@/entities/item/";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Switch } from "@/shared/ui/switch";

interface ListFiltersProps {
  categories: ItemCategory[];
  needsRevision: boolean;
  handleSetNeedsRevision: (value: boolean) => void;
  handleCategoryChange: (category: ItemCategory, checked: boolean) => void;
  onResetFilters: () => void;
}

export function ListFilters(props: ListFiltersProps) {
  const {
    categories,
    needsRevision,
    handleSetNeedsRevision,
    handleCategoryChange,
    onResetFilters,
  } = props;

  return (
    <div className="flex flex-col gap-2 w-64 shrink-0">
      <div className="p-4 bg-card rounded-lg">
        <h2 className="font-semibold">Фильтры</h2>
        <Accordion type="single" collapsible defaultValue="filters">
          <AccordionItem value="filters">
            <AccordionTrigger>Категория</AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-col gap-3">
                <Field orientation="horizontal">
                  <Checkbox
                    id="auto"
                    name="auto"
                    checked={categories.includes(`auto`)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(`auto`, checked === true)
                    }
                  />
                  <Label htmlFor="auto">Авто</Label>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    id="electronics"
                    name="electronics"
                    checked={categories.includes(`electronics`)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(`electronics`, checked === true)
                    }
                  />
                  <Label htmlFor="electronics">Электроника</Label>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    id="real_estate"
                    name="real_estate"
                    checked={categories.includes(`real_estate`)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(`real_estate`, checked === true)
                    }
                  />
                  <Label htmlFor="real_estate">Недвижимость</Label>
                </Field>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
        <div className="flex items-center gap-4 py-2">
          <Label htmlFor="only-rework" className="leading-normal">
            Только требующие доработок
          </Label>
          <Switch
            id="only-rework"
            checked={needsRevision}
            onCheckedChange={handleSetNeedsRevision}
          />
        </div>
      </div>
      <Button className="h-10" onClick={onResetFilters}>
        Сбросить фильтры
      </Button>
    </div>
  );
}
