"use client";

import Link from "next/link";
import type { FormEventHandler } from "react";

import { MAX_DESCRIPTION_LENGTH, type Item } from "@/entities/item";
import { GenerateItemDescription } from "@/features/generate-item-description";
import { SuggestItemPrice } from "@/features/suggest-item-price";
import { Button } from "@/shared/ui/button";
import { InputGroup, InputGroupAddon, InputGroupTextarea } from "@/shared/ui/input-group";
import { InputField } from "@/shared/ui/input-field";
import { SelectField } from "@/shared/ui/select-field";
import { Separator } from "@/shared/ui/separator";

import { ItemEditParamsFields } from "./item-edit-params-fields";

type UpdateFormData = (updater: (prev: Item | null) => Item | null) => void;

interface ItemEditFormProps {
  id: string;
  formData: Item;
  getFieldError: (path: string) => string | undefined;
  updateFormData: UpdateFormData;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isFormValid: boolean;
  isSaving: boolean;
}

export function ItemEditForm({
  id,
  formData,
  getFieldError,
  updateFormData,
  onSubmit,
  isFormValid,
  isSaving,
}: ItemEditFormProps) {
  const descriptionError = getFieldError("description");

  return (
    <form onSubmit={onSubmit}>
      <h1 className="w-fit pt-8 pb-4 text-3xl font-semibold">
        Редактирование объявления
      </h1>

      <SelectField
        title="Категория"
        semiBold
        value={formData.category}
        error={getFieldError("category")}
        onValueChange={(value) => {
          if (
            value !== "auto" &&
            value !== "electronics" &&
            value !== "real_estate"
          ) {
            return;
          }

          updateFormData((prev) => {
            if (!prev) return prev;

            switch (value) {
              case "auto":
                return { ...prev, category: "auto", params: {} };
              case "electronics":
                return { ...prev, category: "electronics", params: {} };
              case "real_estate":
                return { ...prev, category: "real_estate", params: {} };
              default:
                return prev;
            }
          });
        }}
        options={[
          { value: "auto", label: "Авто" },
          { value: "electronics", label: "Электроника" },
          { value: "real_estate", label: "Недвижимость" },
        ]}
      />

      <Separator className="mt-4" />

      <InputField
        title="Название"
        semiBold
        value={formData.title}
        error={getFieldError("title")}
        onChange={(event) => {
          const value = event.target.value;

          updateFormData((prev) =>
            prev ? { ...prev, title: value } : prev,
          );
        }}
        onClear={() => {
          updateFormData((prev) =>
            prev ? { ...prev, title: "" } : prev,
          );
        }}
      />

      <Separator className="mt-4" />

      <div className="flex items-end gap-6 max-[821px]:flex-col max-[821px]:items-start max-[821px]:gap-0">
        <div className="w-[450px] max-[431px]:w-[400px] shrink-0 max-[391px]:w-[360px] max-[361px]:w-[330px]">
          <InputField
            title="Цена"
            semiBold
            typeNumber
            value={formData.price == null ? "" : String(formData.price)}
            error={getFieldError("price")}
            onChange={(event) => {
              const rawValue = event.target.value;
              const value = rawValue === "" ? null : Number(rawValue);

              updateFormData((prev) =>
                prev ? { ...prev, price: value } : prev,
              );
            }}
            onClear={() => {
              updateFormData((prev) =>
                prev ? { ...prev, price: null } : prev,
              );
            }}
          />
        </div>

        <div className="min-w-0 flex-1 mb-4">
          <SuggestItemPrice
            item={formData}
            onApply={(price) => {
              updateFormData((prev) =>
                prev ? { ...prev, price } : prev,
              );
            }}
          />
        </div>
      </div>

      <Separator className="mt-4" />

      <h2 className="pt-4 font-semibold">Характеристики</h2>

      <ItemEditParamsFields
        item={formData}
        getFieldError={getFieldError}
        updateFormData={updateFormData}
      />

      <Separator className="mt-4" />

      <h2 className="pt-4 pb-2 font-semibold">Описание</h2>

      <div className="max-w-[900px] max-[501px]:w-[450px] max-[431px]:w-[400px] max-[391px]:w-[360px] max-[361px]:w-[330px]">
        <InputGroup>
          <InputGroupTextarea
            maxLength={MAX_DESCRIPTION_LENGTH}
            placeholder="Описание объявления"
            value={formData.description ?? ""}
            aria-invalid={Boolean(descriptionError)}
            aria-describedby={
              descriptionError ? "description-error" : undefined
            }
            onChange={(event) => {
              const value = event.target.value;

              updateFormData((prev) =>
                prev ? { ...prev, description: value } : prev,
              );
            }}
          />

          <InputGroupAddon
            align="block-end"
            className="justify-end"
          >
            {(formData.description ?? "").length}/{MAX_DESCRIPTION_LENGTH}
          </InputGroupAddon>
        </InputGroup>

        <p
          id="description-error"
          className="mt-1 min-h-3 text-[12px] leading-3 text-destructive"
          role={descriptionError ? "alert" : undefined}
        >
          {descriptionError ?? ""}
        </p>

        <GenerateItemDescription
          item={formData}
          onApply={(description) => {
            updateFormData((prev) =>
              prev ? { ...prev, description } : prev,
            );
          }}
        />
      </div>

      <div className="mt-9 mb-26 flex gap-2">
        <Button
          className="h-10 text-base"
          type="submit"
          disabled={!isFormValid || isSaving}
        >
          {isSaving ? "Сохранение" : "Сохранить"}
        </Button>

        <Button
          className="h-10 text-base"
          variant="destructive"
          asChild
        >
          <Link href={`/${id}`}>Отменить</Link>
        </Button>
      </div>
    </form>
  );
}