import { Link, useLocation } from "react-router-dom";
import useStore, { selectTotal } from "@store/index";
import { CartItem } from "@store/storeTypes";
import styles from "./Header.module.scss";

export default function Header() {
  const shoppingCartCount = useStore((state) =>
    state.shoppingCart.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0,
    ),
  );
  const shoppingCartTotal = useStore(selectTotal);

  const { pathname } = useLocation();
  const isCatalogPage = pathname === `/`;
  const isCartPage = pathname === `/shopping-cart`;

  return (
    <header className={styles.header}>
      {!isCatalogPage && (
        <Link className={styles.catalogLink} to={`/`}>
          Каталог
        </Link>
      )}
      {!isCartPage && (
        <Link className={styles.shoppingCartLink} to={`/shopping-cart`}>
          Корзина
          {shoppingCartCount > 0 && (
            <span
              className={styles.shoppingCartCount}
            >{` (${shoppingCartCount}) ${shoppingCartTotal} ₽`}</span>
          )}
        </Link>
      )}
    </header>
  );
}
