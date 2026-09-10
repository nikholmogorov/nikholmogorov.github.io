import { Link } from "react-router-dom";
import { Product } from "@store/storeTypes";
import styles from "./Card.module.scss";

interface CardProps {
  itemData?: Product;
}

export default function Card(props: CardProps) {
  const { itemData } = props;

  const isCardLoading = !itemData;

  const cardImage =
    itemData?.colors?.[0]?.images?.[0] || `${import.meta.env.BASE_URL}images/no_photo.jpg`;
  const cardTitle = itemData?.name || ``;
  const cardPrice = isCardLoading
    ? ``
    : `от ${Math.min(...itemData?.colors?.map((item) => Number(item.price)))} ₽`;
  const cardLink = itemData?.id ? `/product/${itemData.id}` : `#`;

  return (
    <li>
      <Link
        className={styles.card}
        to={cardLink}
        data-loading={isCardLoading ? true : undefined}
      >
        {isCardLoading ? (
          <div className={styles.image}></div>
        ) : (
          <img
            className={styles.image}
            src={cardImage}
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.BASE_URL}/images/no_photo.jpg`;
            }}
            alt={`Фото товара ${cardTitle}`}
            loading="lazy"
          />
        )}
        <h2 className={styles.title}>{cardTitle}</h2>
        <p className={styles.price}>{cardPrice}</p>
      </Link>
    </li>
  );
}
