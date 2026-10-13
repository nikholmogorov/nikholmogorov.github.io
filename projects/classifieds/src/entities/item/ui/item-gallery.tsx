"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Lightbox,
  LightboxContent,
  LightboxThumbnails,
  LightboxTrigger,
} from "@/shared/ui/lightbox";
import { IMAGES } from "../model/constants";

export function ItemGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = IMAGES[activeIndex];

  return (
    <Lightbox
      items={IMAGES}
      index={activeIndex}
      onIndexChange={setActiveIndex}
      open={isLightboxOpen}
      onOpenChange={setIsLightboxOpen}
      loop
    >
      <div className="w-full max-w-[480px] space-y-3">
        <LightboxTrigger index={activeIndex} asChild>
          <button
            type="button"
            className="block w-full overflow-hidden rounded-lg border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-[431px]:mb-1"
            aria-label="Открыть фотографии товара"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                unoptimized
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-contain"
              />
            </div>
          </button>
        </LightboxTrigger>
        <div className="flex gap-2 overflow-x-auto pb-1 max-[431px]:gap-1">
          {IMAGES.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Показать фото ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`shrink-0 overflow-hidden rounded-md border-2 max-[431px]:aspect-[4/3] max-[431px]:min-w-0 max-[431px]:max-w-[96px] max-[391px]:max-w-[86px] max-[361px]:max-w-[79px] ${
                index === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image.thumbnail}
                alt=""
                width={96}
                height={72}
                unoptimized
                className="h-[72px] w-24 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <LightboxContent
        className="bg-black/95"
        labels={{
          zoomIn: "Увеличить",
          zoomOut: "Уменьшить",
          close: "Закрыть",
          previous: "Предыдущее фото",
          next: "Следующее фото",
          image: (index, count) => `Фото ${index + 1} из ${count}`,
        }}
      >
        <LightboxThumbnails
          className="mb-4"
          getLabel={(index) => `Перейти к фото ${index + 1}`}
        />
      </LightboxContent>
    </Lightbox>
  );
}
