"use client";

import { PencilLine } from "lucide-react";
import Link from "next/link";
import {
  formatDate,
  getItemRevisionFields,
  getParamLabel,
  getParamValueLabel,
  ItemGallery,
  useGetItemById,
} from "@/entities/item";
import { Button } from "@/shared/ui/button";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { ErrorMessage } from "@/shared/ui/error-message";
import { Separator } from "@/shared/ui/separator";

import { ItemDetailsSkeleton } from "./item-details-skeleton";

const numberFormatter = new Intl.NumberFormat("ru-RU");

interface ItemDetailsProps {
  id: string;
}

export function ItemDetails(props: ItemDetailsProps) {
  const { id } = props;

  const { data, isLoading, isError, error } = useGetItemById(id);

  if (isLoading) return <ItemDetailsSkeleton />;
  if (isError)
    return (
      <div className="mt-25">
        <ErrorMessage
          title="Не удалось загрузить данные"
          errorMessage={error?.message}
        />
      </div>
    );
  if (!data)
    return (
      <div className="mt-25">
        <EmptyMessage
          title="Объявление не найдено"
          description="Возможно, оно было удалено или ссылка устарела"
        />
      </div>
    );

  const revisionFields = getItemRevisionFields(data);
  const params = Object.entries(data.params);

  return (
    <>
      <div className="flex flex-col justify-between py-8">
        <div className="flex justify-between w-full max-[501px]:flex-col">
          <h1 className="text-3xl font-semibold pb-3 text-balance">
            {data.title}
          </h1>
          <p className="text-3xl text-end font-semibold pb-3 max-[501px]:text-start">
            {data.price !== null
              ? `${numberFormatter.format(data.price)} ₽`
              : `Цена не указана`}
          </p>
        </div>
        <div className="flex justify-between max-[501px]:flex-col max-[501px]:gap-4">
          <Button className="text-base h-10 w-[180px]" asChild>
            <Link href={`/${id}/edit`}>
              Редактировать
              <PencilLine />
            </Link>
          </Button>
          <div className="flex flex-col">
            <p className="text-end max-[501px]:text-start">{`Опубликовано: ${formatDate(data.createdAt)}`}</p>
            <p className="text-end max-[501px]:text-start">{`Отредактировано: ${formatDate(data.updatedAt)}`}</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:grid-cols-[480px_500px]">
        <ItemGallery />
        <div>
          {revisionFields.length > 0 && (
            <div className="mb-9 p-4 rounded-lg w-[300px] bg-red-500 max-[461px]:w-full">
              <h3 className="font-semibold pb-2">Требует доработки</h3>
              <p>У объявления не заполнены поля:</p>
              <ul>
                {revisionFields.map((item) => (
                  <li key={item}>• {getParamLabel(data.category, item)}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="w-[300px]">
            <h2 className="text-xl font-semibold pb-4">Характеристики</h2>
            {params.length > 0 ? (
              params.map(([key, value]) => (
                <div className="flex justify-between" key={key}>
                  <span>{getParamLabel(data.category, key)}</span>
                  <span>{getParamValueLabel(data.category, key, value)}</span>
                </div>
              ))
            ) : (
              <span>Отсутствуют</span>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold pb-4">Описание</h2>
          <p>{data.description || `Отсутствует`}</p>
        </div>
      </div>
    </>
  );
}
