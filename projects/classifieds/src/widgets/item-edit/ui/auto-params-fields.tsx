"use client";

import type { Item } from "@/entities/item";
import { InputField } from "@/shared/ui/input-field";
import { SelectField } from "@/shared/ui/select-field";

type AutoItem = Extract<Item, { category: "auto" }>;

type UpdateFormData = (updater: (prev: Item | null) => Item | null) => void;

interface AutoParamsFieldsProps {
  item: AutoItem;
  getFieldError: (path: string) => string | undefined;
  updateFormData: UpdateFormData;
}

export function AutoParamsFields({
  item,
  getFieldError,
  updateFormData,
}: AutoParamsFieldsProps) {
  return (
    <>
      <InputField
        title="Марка"
        value={item.params.brand ?? ""}
        error={getFieldError("params.brand")}
        onChange={(event) => {
          const value = event.target.value;

          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

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
            if (!prev || prev.category !== "auto") return prev;

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
            if (!prev || prev.category !== "auto") return prev;

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
            if (!prev || prev.category !== "auto") return prev;

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

      <InputField
        typeNumber
        title="Год выпуска"
        value={String(item.params.yearOfManufacture ?? "")}
        error={getFieldError("params.yearOfManufacture")}
        onChange={(event) => {
          const rawValue = event.target.value;
          const value = rawValue === "" ? undefined : Number(rawValue);

          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                yearOfManufacture: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                yearOfManufacture: undefined,
              },
            };
          });
        }}
      />

      <SelectField
        title="Коробка передач"
        value={item.params.transmission ?? ""}
        error={getFieldError("params.transmission")}
        onValueChange={(value) => {
          if (value !== "automatic" && value !== "manual") return;

          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                transmission: value,
              },
            };
          });
        }}
        options={[
          { value: "automatic", label: "Автоматическая" },
          { value: "manual", label: "Механическая" },
        ]}
      />

      <InputField
        typeNumber
        title="Пробег"
        value={String(item.params.mileage ?? "")}
        error={getFieldError("params.mileage")}
        onChange={(event) => {
          const rawValue = event.target.value;
          const value = rawValue === "" ? undefined : Number(rawValue);

          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                mileage: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                mileage: undefined,
              },
            };
          });
        }}
      />

      <InputField
        typeNumber
        title="Мощность двигателя"
        value={String(item.params.enginePower ?? "")}
        error={getFieldError("params.enginePower")}
        onChange={(event) => {
          const rawValue = event.target.value;
          const value = rawValue === "" ? undefined : Number(rawValue);

          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                enginePower: value,
              },
            };
          });
        }}
        onClear={() => {
          updateFormData((prev) => {
            if (!prev || prev.category !== "auto") return prev;

            return {
              ...prev,
              params: {
                ...prev.params,
                enginePower: undefined,
              },
            };
          });
        }}
      />
    </>
  );
}
