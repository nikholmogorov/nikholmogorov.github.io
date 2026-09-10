import useStore from "@store/index";
import styles from "./CatalogControls.module.scss";

export default function CatalogControls() {
  const searchQuery = useStore((state) => state.searchQuery);
  const inStockOnly = useStore((state) => state.inStockOnly);
  const sortOrder = useStore((state) => state.sortOrder);
  const isProductsLoading = useStore((state) => state.isProductsLoading);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const toggleInStockOnly = useStore((state) => state.toggleInStockOnly);
  const cycleSortOrder = useStore((state) => state.cycleSortOrder);

  let sortSymbol = ` `;
  if (sortOrder === `asc`) sortSymbol = `⭣`;
  else if (sortOrder === `desc`) sortSymbol = `⭡`;

  if (isProductsLoading) {
    return (
      <div className={styles.catalogControls} data-loading>
        <div className={styles.search}></div>
        <div className={styles.label}></div>
        <div className={styles.checkbox}></div>
        <div className={styles.sortButton}></div>
      </div>
    );
  }

  return (
    <div className={styles.catalogControls}>
      <label className={styles.searchLabel} htmlFor="search">
        Поиск
      </label>
      <input
        className={styles.search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        id="search"
        type="text"
        placeholder="Поиск"
      />
      <label className={styles.label} htmlFor="in-stock">
        <input
          className={styles.checkbox}
          id="in-stock"
          type="checkbox"
          checked={inStockOnly}
          onChange={toggleInStockOnly}
        />
        В наличии
      </label>
      <button className={styles.sortButton} onClick={cycleSortOrder}>
        Цена {sortSymbol}
      </button>
    </div>
  );
}
