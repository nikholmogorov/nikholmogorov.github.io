"use client";

import type { Item } from "@/entities/item";
import { InputField } from "@/shared/ui/input-field";
import { SelectField } from "@/shared/ui/select-field";

type RealEstateItem = Extract<Item, { category: "real_estate" }>;

type UpdateFormData = (updater: (prev: Item | null) => Item | null) => void;

interface RealEstateParamsFieldsProps {
  item: RealEstateItem;
  getFieldError: (path: string) => string | undefined;
  updateFormData: UpdateFormData;
}

export function RealEstateParamsFields({
  item,
  getFieldError,
  updateFormData,
}: RealEstateParamsFieldsProps) {
  return (
    <>
      <SelectField
        title="Тип недвижимости"
        value={item.params.type ?? ""}
        error={getFieldError("params.type")}
        onValueChange={(value) => {
          if (value !== "flat" && value !== "room" && value !== "house") {
            return;
          }

          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                type: value,
              },
            };
          });
        }}
        options={[
          { value: "flat", label: "Квартира" },
          { value: "room", label: "Комната" },
          { value: "house", label: "Дом" },
        ]}
      />

      <InputField
        title="Адрес"
        value={item.params.address ?? ""}
        error={getFieldError("params.address")}
        onChange={(event) => {
          const value = event.target.value;

          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                address: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                address: "",
              },
            };
          });
        }}
      />

      <InputField
        typeNumber
        title="Площадь"
        value={String(item.params.area ?? "")}
        error={getFieldError("params.area")}
        onChange={(event) => {
          const rawValue = event.target.value;
          const value = rawValue === "" ? undefined : Number(rawValue);

          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                area: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                area: undefined,
              },
            };
          });
        }}
      />

      <InputField
        typeNumber
        title="Этаж"
        value={String(item.params.floor ?? "")}
        error={getFieldError("params.floor")}
        onChange={(event) => {
          const rawValue = event.target.value;
          const value = rawValue === "" ? undefined : Number(rawValue);

          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                floor: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "real_estate") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                floor: undefined,
              },
            };
          });
        }}
      />
    </>
  );
}
