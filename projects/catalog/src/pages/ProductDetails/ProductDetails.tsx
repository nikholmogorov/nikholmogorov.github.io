import { useState, useEffect } from "react";
import {
    useParams,
    useSearchParams,
    useNavigate,
    useLocation,
} from "react-router-dom";
import useStore from "@store/index";
import { Color } from "@store/storeTypes";
import { getImageUrl, handleImageError } from "@utils/image";
import styles from "./ProductDetails.module.scss";

export default function ProductDetails() {
    const { id } = useParams();
    const product = useStore((state) => state.product);
    const isProductLoading = useStore((state) => state.isProductLoading);
    const productError = useStore((state) => state.productError);
    const fetchProductDetails = useStore((state) => state.fetchProductDetails);

    const sizes = useStore((state) => state.sizes);
    const fetchSizes = useStore((state) => state.fetchSizes);

    const addToShoppingCart = useStore((state) => state.addToShoppingCart);

    const [searchParams, setSearchParams] = useSearchParams();
    const colorFromUrl = searchParams.get(`color`);
    const sizeFromUrl = searchParams.get(`size`);

    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    useEffect(() => {
        fetchProductDetails(Number(id));
        fetchSizes();
    }, [id, fetchProductDetails, fetchSizes]);

    useEffect(() => {
        if (!product || !product.colors?.length) return;

        const parsedColorId = colorFromUrl ? Number(colorFromUrl) : null;
        const parsedSizeId = sizeFromUrl ? Number(sizeFromUrl) : null;

        const targetColor =
            product.colors.find((item) => item.id === parsedColorId) ||
            product.colors[0];

        setSelectedColor(targetColor);
        setSelectedImageIndex(0);

        if (parsedSizeId && targetColor.sizes?.includes(parsedSizeId)) {
            setSelectedSize(parsedSizeId);
        } else {
            setSelectedSize(null);
        }
    }, [product, colorFromUrl, sizeFromUrl]);

    const colorPickerHandler = (color: Color) => {
        setSearchParams(
            (prevParams) => {
                const nextParams = new URLSearchParams(prevParams);
                nextParams.set(`color`, String(color.id));
                nextParams.delete(`size`);
                return nextParams;
            },
            { replace: true },
        );
    };

    const sizesPickerHandler = (id: number) => {
        setSearchParams(
            (prevParams) => {
                const nextParams = new URLSearchParams(prevParams);
                nextParams.set(`size`, String(id));
                return nextParams;
            },
            { replace: true },
        );
    };

    const addToShoppingCartHandler = () => {
        if (!product || !selectedColor || !selectedSize) return;

        const sizeCount = sizes.find((item) => item.id === selectedSize);
        const cartItem = {
            productId: product.id,
            productName: product.name,
            colorId: selectedColor.id,
            colorName: selectedColor.name,
            sizeId: selectedSize,
            sizeLabel: sizeCount?.name,
            sizeNumber: sizeCount?.number,
            image: selectedColor.images[0],
            price: selectedColor.price,
        };
        addToShoppingCart(cartItem);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const goBackHandler = () => {
        if (location.key !== `default`) {
            navigate(-1);
        } else {
            navigate(`/`, { replace: true });
        }
    };

    if (productError) {
        return (
            <section className={styles.productDetails}>
                <p className={styles.errorProductText}>
                    Не удалось загрузить информацию о товаре!
                </p>
                <p className={styles.errorProductText}>{productError}</p>
            </section>
        );
    }

    if (isProductLoading || !product || !selectedColor) {
        return (
            <section className={styles.productDetails} data-loading>
                <div className={styles.title}></div>
                <div className={styles.wrapper}>
                    <div className={styles.image}></div>
                    <div className={styles.productControls}>
                        <ul className={styles.miniaturesList}>
                            {Array(2)
                                .fill(null)
                                .map((_, index) => (
                                    <li
                                        className={styles.miniaturesButton}
                                        key={`miniatures-skeleton-${index}`}
                                    ></li>
                                ))}
                        </ul>
                        <ul className={styles.colorPicker}>
                            {Array(3)
                                .fill(null)
                                .map((_, index) => (
                                    <li
                                        className={styles.colorPickerButton}
                                        key={`color-picker-skeleton-${index}`}
                                    ></li>
                                ))}
                        </ul>
                        <ul className={styles.sizesPicker}>
                            {Array(6)
                                .fill(null)
                                .map((_, index) => (
                                    <li
                                        className={styles.sizesPickerButton}
                                        key={`sizes-picker-skeleton-${index}`}
                                    ></li>
                                ))}
                        </ul>
                        <p className={styles.text}></p>
                        <p className={styles.price}></p>
                        <div className={styles.actionButtons}>
                            <div className={styles.addToShoppingCartButton}></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const availableSizesSet = new Set(selectedColor.sizes ?? []);
    const isAvailableItem = sizes.some((item) => availableSizesSet.has(item.id));

    return (
        <section className={styles.productDetails}>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.wrapper}>
                <img
                    className={styles.image}
                    src={getImageUrl(selectedColor.images[selectedImageIndex])}
                    onError={handleImageError}
                    alt={`Фото ${product.name} ${selectedColor.name}`}
                    loading="lazy"
                />
                <div className={styles.productControls}>
                    <ul className={styles.miniaturesList}>
                        {selectedColor.images.map((item: string, index: number) => (
                            <li key={item}>
                                <button
                                    className={`${styles.miniaturesButton} ${index === selectedImageIndex ? styles.selected : ""}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img
                                        className={styles.miniaturesImage}
                                        src={getImageUrl(item)}
                                        onError={handleImageError}
                                        alt="Просмотр вещи"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.colorPicker}>
                        {product.colors.map((item) => (
                            <li key={`color-picker-item-${item.id}`}>
                                <button
                                    className={`${styles.colorPickerButton} ${item.id === selectedColor.id ? styles.selected : ""}`}
                                    onClick={() => colorPickerHandler(item)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.sizesPicker}>
                        {sizes.map((item) => {
                            const isAvailableSize = availableSizesSet.has(item.id);
                            return (
                                <li key={`sizes-picker-item-${item.id}`}>
                                    <button
                                        className={`${styles.sizesPickerButton} ${item.id === selectedSize ? styles.selected : ""}`}
                                        onClick={() => sizesPickerHandler(item.id)}
                                        disabled={!isAvailableSize}
                                    >
                                        {`${item.name} / ${item.number}`}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <p className={styles.text}>{selectedColor.description}</p>
                    <p className={styles.price}>{`${selectedColor.price} ₽`}</p>
                    <div className={styles.actionButtons}>
                        {
                            <button
                                className={styles.addToShoppingCartButton}
                                onClick={addToShoppingCartHandler}
                                disabled={!selectedSize}
                            >
                                {isAvailableItem ? `В корзину` : `Нет в наличии`}
                            </button>
                        }
                        {!isAvailableItem && (
                            <button className={styles.goBackButton} onClick={goBackHandler}>
                                Назад
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
