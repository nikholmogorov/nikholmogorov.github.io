import { useState } from "react";
import { Link } from "react-router-dom";
import useStore, { selectTotal } from "@store/index";
import styles from "./ShoppingCart.module.scss";

export default function ShoppingCart() {
  const shoppingCart = useStore((state) => state.shoppingCart);
  const removeFromShoppingCart = useStore(
    (state) => state.removeFromShoppingCart,
  );
  const removeAllFromShoppingCart = useStore(
    (state) => state.removeAllFromShoppingCart,
  );
  const shoppingCartTotal = useStore(selectTotal);
  const promoCode = useStore((state) => state.promoCode);
  const applyPromoCode = useStore((state) => state.applyPromoCode);
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);

  const [promoInputValue, setPromoInputValue] = useState<string>(``);
  const [promoCodeStatus, setPromoCodeStatus] = useState<string>(() =>
    promoCode ? `Промокод успешно применён!` : `Введите промокод DISC50`,
  );

  if (shoppingCart.length === 0) {
    return (
      <section className={styles.shoppingCart}>
        <h1 className={styles.title}>Корзина</h1>
        <p className={styles.emptyShoppingCartText}>Пока пуста...</p>
      </section>
    );
  }

  function applyPromoCodeHandler() {
    if (!promoInputValue.trim()) return;
    if (promoInputValue.trim() === `DISC50`) {
      applyPromoCode({ code: `DISC50`, discount: 50 });
      setPromoCodeStatus(`Промокод успешно применён!`);
    } else {
      setPromoCodeStatus(`Промокод недействителен!`);
    }
  }

  function removePromoCodeHandler() {
    applyPromoCode(null);
    setPromoCodeStatus(`Промокод успешно удалён!`);
    setPromoInputValue(``);
  }

  return (
    <section className={styles.shoppingCart}>
      <h1 className={styles.title}>Корзина</h1>
      <ul className={styles.cartList}>
        {shoppingCart.map((item, index) => {
          return (
            <li
              className={styles.cartItem}
              key={`cart-item-${item.productId}-${item.colorId}-${item.sizeId}`}
            >
              <Link
                className={styles.cartItemLink}
                to={`/product/${item.productId}?color=${item.colorId}&size=${item.sizeId}`}
              >
                <h2 className={styles.cartItemTitle}>{item.productName}</h2>
                <img
                  className={styles.cartItemImage}
                  src={item.image}
                  onError={(e) => {
                    e.currentTarget.src = `/images/no_photo.jpg`;
                  }}
                  alt={`Фото для ${item.productName} ${item.colorName}`}
                />
                <p
                  className={styles.cartItemText}
                >{`Цвет: ${item.colorName}`}</p>
                <p
                  className={styles.cartItemText}
                >{`Размер: ${item.sizeLabel} / ${item.sizeNumber}`}</p>
                <p className={styles.cartItemText}>
                  {item.quantity > 1 && `Стоимость:`}
                </p>
                <p className={styles.cartItemText}>
                  {item.quantity > 1
                    ? `${item.price} ₽ × ${item.quantity} шт. = ${Number(item.price) * item.quantity} ₽`
                    : `Цена: ${item.price} ₽`}
                </p>
              </Link>
              <button
                className={styles.cartItemRemove}
                onClick={() => removeFromShoppingCart(index)}
                aria-label={`Удалить ${item.productName} из корзины`}
              >
                𐄂
              </button>
              <div className={styles.cartItemActions}>
                <button
                  className={styles.cartItemQuantityButton}
                  onClick={() => decreaseQuantity(index)}
                  disabled={item.quantity === 1}
                  aria-label="Уменьшить количество"
                >
                  −
                </button>
                <p className={styles.cartItemQuantity}>{item.quantity}</p>
                <button
                  className={styles.cartItemQuantityButton}
                  onClick={() => increaseQuantity(index)}
                  aria-label="Увеличить количество"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.cartSummary}>
        <div className={styles.promoForm}>
          <div className={styles.promoActions}>
            {!promoCode && (
              <>
                <label className={styles.promoLabel} htmlFor="promocode">
                  Промокод
                </label>
                <input
                  className={styles.promoInput}
                  value={promoInputValue}
                  onChange={(e) => setPromoInputValue(e.target.value)}
                  id="promocode"
                  type="text"
                  placeholder="Промокод"
                />
                <button
                  className={styles.addPromoButton}
                  onClick={applyPromoCodeHandler}
                >
                  Применить
                </button>
              </>
            )}
            {promoCode && (
              <button
                className={styles.removePromoButton}
                onClick={removePromoCodeHandler}
              >
                Удалить промокод
              </button>
            )}
          </div>
          <p className={styles.promoStatus}>{promoCodeStatus}</p>
        </div>
        <p>
          {promoCode
            ? `Итого с учётом скидки ${promoCode.discount}%: ${shoppingCartTotal}`
            : `Итого: ${shoppingCartTotal} ₽`}
        </p>
      </div>
      <div className={styles.cartActions}>
        <button
          className={styles.cartPurchase}
          onClick={() => alert(`Оформление заказа!`)}
        >
          Оформить заказ
        </button>
        <button
          className={styles.cartRemoveAll}
          onClick={removeAllFromShoppingCart}
        >
          Очистить корзину
        </button>
      </div>
    </section>
  );
}
