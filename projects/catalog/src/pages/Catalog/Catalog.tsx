import { useEffect, useMemo } from "react";
import useStore from "@store/index";
import Card from "@components/Card/Card";
import CatalogControls from "@components/CatalogControls/CatalogControls";
import styles from "./Catalog.module.scss";

const SKELETON_ARRAY = Array(6).fill(null);

export default function Catalog() {
    const products = useStore((state) => state.products);
    const isProductsLoading = useStore((state) => state.isProductsLoading);
    const productsError = useStore((state) => state.productsError);
    const fetchProducts = useStore((state) => state.fetchProducts);
    const searchQuery = useStore((state) => state.searchQuery);
    const inStockOnly = useStore((state) => state.inStockOnly);
    const sortOrder = useStore((state) => state.sortOrder);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const filtered = products.filter((item) => {
            const matchesSearch = !query || item.name.toLowerCase().includes(query);
            const hasStock = item.colors?.some((color) => color.sizes?.length > 0);
            const matchesStock = !inStockOnly || hasStock;
            return matchesSearch && matchesStock;
        });
        if (sortOrder === `asc` || sortOrder === `desc`) {
            return [...filtered].sort((a, b) => {
                const priceA = Math.min(
                    ...a.colors.map((color) => Number(color.price)),
                );
                const priceB = Math.min(
                    ...b.colors.map((color) => Number(color.price)),
                );
                return sortOrder === `asc` ? priceA - priceB : priceB - priceA;
            });
        }
        return filtered;
    }, [products, searchQuery, inStockOnly, sortOrder]);

    let content = null;

    if (isProductsLoading) {
        content = (
            <>
                <CatalogControls />
                <ul className={styles.list}>
                    {SKELETON_ARRAY.map((_, index) => (
                        <Card key={`skeleton-card-${index}`} />
                    ))}
                </ul>
            </>
        );
    } else if (productsError) {
        content = (
            <>
                <p className={styles.errorCatalogText}>Не удалось загрузить каталог!</p>
                {productsError && (
                    <p className={styles.errorCatalogText}>{productsError}</p>
                )}
            </>
        );
    } else if (!products.length) {
        content = <p className={styles.emptyCatalogText}>Каталог пуст!</p>;
    } else if (!filteredAndSortedProducts.length) {
        content = (
            <>
                <CatalogControls />
                <p className={styles.emptyCatalogText}>Ничего не найдено!</p>
            </>
        );
    } else {
        content = (
            <>
                <CatalogControls />
                <ul className={styles.list}>
                    {filteredAndSortedProducts.map((item) => (
                        <Card itemData={item} key={item.id} />
                    ))}
                </ul>
            </>
        );
    }

    return (
        <section className={styles.catalog}>
            <h1 className={styles.title}>Каталог</h1>
            {content}
        </section>
    );
}
