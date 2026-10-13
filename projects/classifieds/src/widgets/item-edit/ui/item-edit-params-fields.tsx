"use client";

import type { Item } from "@/entities/item";

import { AutoParamsFields } from "./auto-params-fields";
import { ElectronicsParamsFields } from "./electronics-params-fields";
import { RealEstateParamsFields } from "./real-estate-params-fields";

type UpdateFormData = (updater: (prev: Item | null) => Item | null) => void;

interface ItemEditParamsFieldsProps {
  item: Item;
  getFieldError: (path: string) => string | undefined;
  updateFormData: UpdateFormData;
}

export function ItemEditParamsFields({
  item,
  getFieldError,
  updateFormData,
}: ItemEditParamsFieldsProps) {
  switch (item.category) {
    case "auto":
      return (
        <AutoParamsFields
          item={item}
          getFieldError={getFieldError}
          updateFormData={updateFormData}
        />
      );

    case "electronics":
      return (
        <ElectronicsParamsFields
          item={item}
          getFieldError={getFieldError}
          updateFormData={updateFormData}
        />
      );

    case "real_estate":
      return (
        <RealEstateParamsFields
          item={item}
          getFieldError={getFieldError}
          updateFormData={updateFormData}
        />
      );

    default:
      return null;
  }
}
