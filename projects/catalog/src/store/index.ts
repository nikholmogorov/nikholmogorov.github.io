import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProducts, getProduct, getSizes } from "@services/api";
import { StoreState, CartItem } from "@store/storeTypes";
import { preloadImages } from "@utils/preloadImages";

let latestProductId: number | null = null;

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      isProductsLoading: false,
      productsError: null,

      product: null,
      isProductLoading: false,
      productError: null,

      sizes: [],
      isSizesLoading: false,
      sizesError: null,

      shoppingCart: [],

      searchQuery: ``,
      inStockOnly: false,
      sortOrder: null,

      promoCode: null,

      fetchProducts: async () => {
        if (get().products.length > 0 || get().isProductsLoading) return;
        set({ isProductsLoading: true, productsError: null });
        try {
          const response = await getProducts();
          const mainImageUrls = response
            .map((item) => item.colors?.[0]?.images?.[0])
            .filter((url) => Boolean(url));
          await preloadImages(mainImageUrls, 500);
          set({ products: response, isProductsLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : `Ошибка загрузки`;
          set({ isProductsLoading: false, productsError: errorMessage });
        }
      },

      fetchProductDetails: async (id) => {
        latestProductId = id;
        set({ product: null, isProductLoading: true, productError: null });
        try {
          const response = await getProduct(id);
          if (latestProductId !== id) return;
          const allImageUrls = response.colors
            ? response.colors.flatMap((color) => color.images || [])
            : [];
          await preloadImages(allImageUrls, 500);
          if (latestProductId !== id) return;
          set({ product: response, isProductLoading: false });
        } catch (error) {
          if (latestProductId !== id) return;
          const errorMessage =
            error instanceof Error ? error.message : `Ошибка загрузки`;
          set({ isProductLoading: false, productError: errorMessage });
        }
      },

      fetchSizes: async () => {
        if (get().sizes.length > 0 || get().isSizesLoading) return;
        set({ isSizesLoading: true, sizesError: null });
        try {
          const response = await getSizes();
          set({ sizes: response, isSizesLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : `Ошибка загрузки`;
          set({ isSizesLoading: false, sizesError: errorMessage });
        }
      },

      addToShoppingCart: (cartItem) => {
        set((state) => {
          if (
            state.shoppingCart.some(
              (item) =>
                item.productId === cartItem.productId &&
                item.sizeId === cartItem.sizeId &&
                item.colorId === cartItem.colorId,
            )
          ) {
            return {
              shoppingCart: state.shoppingCart.map((item) =>
                item.productId === cartItem.productId &&
                item.sizeId === cartItem.sizeId &&
                item.colorId === cartItem.colorId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return {
            shoppingCart: [...state.shoppingCart, { ...cartItem, quantity: 1 }],
          };
        });
      },

      removeFromShoppingCart: (indexToRemove) => {
        set((state) => ({
          shoppingCart: state.shoppingCart.filter(
            (_, index) => index !== indexToRemove,
          ),
        }));
      },

      removeAllFromShoppingCart: () => {
        set({ shoppingCart: [] });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      toggleInStockOnly: () => {
        set((state) => ({ inStockOnly: !state.inStockOnly }));
      },

      cycleSortOrder: () => {
        const current = get().sortOrder;
        if (current === null) set({ sortOrder: `asc` });
        else if (current === `asc`) set({ sortOrder: `desc` });
        else if (current === "desc") set({ sortOrder: null });
      },

      applyPromoCode: (promo) => {
        set({ promoCode: promo });
      },

      increaseQuantity: (itemIndex) => {
        set((state) => ({
          shoppingCart: state.shoppingCart.map((item, index) => {
            if (itemIndex === index)
              return { ...item, quantity: item.quantity + 1 };
            return item;
          }),
        }));
      },

      decreaseQuantity: (itemIndex) => {
        set((state) => ({
          shoppingCart: state.shoppingCart.map((item, index) => {
            if (itemIndex === index)
              return { ...item, quantity: Math.max(1, item.quantity - 1) };
            return item;
          }),
        }));
      },
    }),
    {
      name: `zustandStoreShop`,
      partialize: (state) => ({
        shoppingCart: state.shoppingCart,
        promoCode: state.promoCode,
      }),
    },
  ),
);

export function selectSubtotal(state: StoreState): number {
  return state.shoppingCart.reduce(
    (acc: number, item: CartItem) => acc + Number(item.price) * item.quantity,
    0,
  );
}

export const selectTotal = (state: StoreState): number => {
  if (!state.promoCode) return selectSubtotal(state);
  return Math.round((state.promoCode.discount / 100) * selectSubtotal(state));
};

export default useStore;