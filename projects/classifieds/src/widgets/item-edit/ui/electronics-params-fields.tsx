"use client";

import type { Item } from "@/entities/item";
import { InputField } from "@/shared/ui/input-field";
import { SelectField } from "@/shared/ui/select-field";

type ElectronicsItem = Extract<Item, { category: "electronics" }>;

type UpdateFormData = (updater: (prev: Item | null) => Item | null) => void;

interface ElectronicsParamsFieldsProps {
  item: ElectronicsItem;
  getFieldError: (path: string) => string | undefined;
  updateFormData: UpdateFormData;
}

export function ElectronicsParamsFields({
  item,
  getFieldError,
  updateFormData,
}: ElectronicsParamsFieldsProps) {
  return (
    <>
      <SelectField
        title="Тип"
        value={item.params.type ?? ""}
        error={getFieldError("params.type")}
        onValueChange={(value) => {
          if (value !== "phone" && value !== "laptop" && value !== "misc") {
            return;
          }

          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

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
          { value: "phone", label: "Телефон" },
          { value: "laptop", label: "Ноутбук" },
          { value: "misc", label: "Разное" },
        ]}
      />

      <InputField
        title="Бренд"
        value={item.params.brand ?? ""}
        error={getFieldError("params.brand")}
        onChange={(event) => {
          const value = event.target.value;

          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                brand: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                brand: "",
              },
            };
          });
        }}
      />

      <InputField
        title="Модель"
        value={item.params.model ?? ""}
        error={getFieldError("params.model")}
        onChange={(event) => {
          const value = event.target.value;

          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                model: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                model: "",
              },
            };
          });
        }}
      />

      <SelectField
        title="Состояние"
        value={item.params.condition ?? ""}
        error={getFieldError("params.condition")}
        onValueChange={(value) => {
          if (value !== "new" && value !== "used") return;

          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                condition: value,
              },
            };
          });
        }}
        options={[
          { value: "new", label: "Новое" },
          { value: "used", label: "Б/У" },
        ]}
      />

      <InputField
        title="Цвет"
        value={item.params.color ?? ""}
        error={getFieldError("params.color")}
        onChange={(event) => {
          const value = event.target.value;

          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                color: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "electronics") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                color: "",
              },
            };
          });
        }}
      />
    </>
  );
}
