export interface Size {
  id: number;
  name: string;
  number: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
}

export interface Product {
  id: number;
  name: string;
  colors: Color[];
}

export interface CartItem {
  productId: number;
  productName: string;
  colorId: number;
  colorName: string;
  sizeId: number | null;
  sizeLabel?: string;
  sizeNumber?: number;
  image: string;
  price: string;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number;
}

export interface StoreState {
  products: Product[];
  isProductsLoading: boolean;
  productsError: string | null;
  product: Product | null;
  isProductLoading: boolean;
  productError: string | null;
  sizes: Size[];
  isSizesLoading: boolean;
  sizesError: string | null;
  shoppingCart: CartItem[];
  searchQuery: string;
  inStockOnly: boolean;
  sortOrder: `asc` | `desc` | null;
  promoCode: PromoCode | null;
  fetchProducts: () => Promise<void>;
  fetchProductDetails: (id: number) => Promise<void>;
  fetchSizes: () => Promise<void>;
  addToShoppingCart: (cartItem: Omit<CartItem, `quantity`>) => void;
  removeFromShoppingCart: (indexToRemove: number) => void;
  removeAllFromShoppingCart: () => void;
  setSearchQuery: (query: string) => void;
  toggleInStockOnly: () => void;
  cycleSortOrder: () => void;
  applyPromoCode: (promo: PromoCode | null) => void;
  increaseQuantity: (itemIndex: number) => void;
  decreaseQuantity: (itemIndex: number) => void;
}
