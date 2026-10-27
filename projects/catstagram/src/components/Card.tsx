import HeartIcon from "@components/HeartIcon";

import type { CardProps } from "@/types";

export default function Card(props: CardProps) {
  const { url, isFavorite, onToggleFavorite } = props;

  return (
    <div className="relative aspect-square w-[300px]">
      <img className="w-full h-full object-cover" src={url} loading="lazy" alt="Cat" />
      <button
        className="active-element absolute bottom-0 right-0 z-[10] aspect-square w-[50px] flex justify-center items-center text-accent"
        onClick={onToggleFavorite}
        aria-label="Toggle Favorite"
      >
        <HeartIcon isFavorite={isFavorite} />
      </button>
    </div>
  );
}
