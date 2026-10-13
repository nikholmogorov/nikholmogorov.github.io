import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { getCategoryLabel } from "../lib/utils";

const numberFormatter = new Intl.NumberFormat("ru-RU");

interface ItemCardProps {
  category: string;
  title: string;
  price: number | null;
  isNeedRevision: boolean;
}

export function ItemCard(props: ItemCardProps) {
  const { category, title, price, isNeedRevision } = props;

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 aspect-[200/268] cursor-pointer border border-transparent hover:border-foreground max-[391px]:w-[256px]">
      <div className="relative w-full">
        <Image
          unoptimized
          src="https://placehold.co/200x150"
          alt="Фото"
          width={200}
          height={150}
          loading="eager"
          className="block h-auto w-full object-cover"
        />
        <Badge
          className="absolute bottom-0 left-4 z-30 translate-y-1/2 bg-card text-sm"
          variant="outline"
        >
          {getCategoryLabel(category)}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="mt-2 truncate">{title}</CardTitle>
        <CardDescription className="text-sm">
          {price !== null
            ? `${numberFormatter.format(price)} ₽`
            : `Цена не указана`}
        </CardDescription>
        {!isNeedRevision || (
          <Badge
            className="mt-1 text-sm max-[391px]:mt-10"
            variant="destructive"
          >
            Требует доработки
          </Badge>
        )}
      </CardHeader>
    </Card>
  );
}
