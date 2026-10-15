"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  debounce,
  type Item,
  itemKeys,
  itemUpdateInSchema,
  updateItem,
  useGetItemById,
} from "@/entities/item";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { ErrorMessage } from "@/shared/ui/error-message";

import { ItemEditForm } from "./item-edit-form";
import { ItemEditSkeleton } from "./item-edit-skeleton";

type FormErrors = Record<string, string>;

interface FormValidation {
  source: Item;
  isValid: boolean;
  errors: FormErrors;
}

interface ItemEditProps {
  id: string;
}

interface ItemEditStateViewProps {
  id: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: Item | undefined;
  formData: Item | null;
}

function getItemEditStateView({
  id,
  isLoading,
  isError,
  errorMessage,
  data,
  formData,
}: ItemEditStateViewProps): ReactNode | null {
  if (isLoading) {
    return <ItemEditSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-25">
        <ErrorMessage
          title="Не удалось загрузить данные"
          errorMessage={errorMessage}
        />
      </div>
    );
  }

  if (data && (!formData || String(formData.id) !== id)) {
    return <ItemEditSkeleton />;
  }

  return null;
}

export function ItemEdit({ id }: ItemEditProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Item | null>(null);
  const [validation, setValidation] = useState<FormValidation | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, isError, error } = useGetItemById(id);

  const debouncedValidate = useMemo(
    () =>
      debounce((item: Item) => {
        const result = itemUpdateInSchema.safeParse(item);
        const errors: FormErrors = {};

        if (!result.success) {
          for (const issue of result.error.issues) {
            const key = issue.path.join(".");

            if (key && !(key in errors)) {
              errors[key] = issue.message;
            }
          }
        }

        setValidation({
          source: item,
          isValid: result.success,
          errors,
        });
      }, 1000),
    [],
  );

  const updateFormData = (updater: (prev: Item | null) => Item | null) => {
    const next = updater(formData);

    if (next === formData) return;

    setFormData(next);

    if (next) {
      debouncedValidate(next);
    }
  };

  useEffect(() => {
    if (!data) return;

    setFormData(data);
    debouncedValidate(data);
  }, [data, debouncedValidate]);

  const getFieldError = (path: string) => {
    if (validation?.source !== formData) return undefined;

    return validation.errors[path];
  };

  const isFormValid =
    validation !== null && validation.source === formData && validation.isValid;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData || isSaving) return;

    const result = itemUpdateInSchema.safeParse(formData);

    if (!result.success) {
      const errors: FormErrors = {};

      for (const issue of result.error.issues) {
        const path = issue.path.join(".");

        if (path && !(path in errors)) {
          errors[path] = issue.message;
        }
      }

      setValidation({
        source: formData,
        isValid: false,
        errors,
      });

      return;
    }

    setIsSaving(true);

    try {
      const updatedItem = await updateItem(id, result.data);

      queryClient.setQueryData(itemKeys.detail(id), updatedItem);

      await queryClient.invalidateQueries({
        queryKey: itemKeys.lists(),
      });

      toast.success("Объявление успешно обновлено", {
        description: "Изменения сохранены",
      });

      router.push(`/${updatedItem.id}`);
    } catch (error) {
      toast.error("Ошибка сохранения", {
        description:
          error instanceof Error
            ? `При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже. ${error.message}`
            : "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const stateView = getItemEditStateView({
    id,
    isLoading,
    isError,
    errorMessage: error?.message,
    data,
    formData,
  });

  if (stateView !== null) {
    return stateView;
  }

  if (!formData) {
    return (
      <div className="mt-25">
        <EmptyMessage
          title="Объявление не найдено"
          description="Возможно, оно было удалено или ссылка устарела"
        />
      </div>
    );
  }

  return (
    <ItemEditForm
      id={id}
      formData={formData}
      getFieldError={getFieldError}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isSaving={isSaving}
    />
  );
}
