import { Size, Category, Product } from "@store/storeTypes";

const delay = 3000;

const sizes = [
  { id: 1, name: "XS", number: 44 },
  { id: 2, name: "S", number: 46 },
  { id: 3, name: "M", number: 48 },
  { id: 4, name: "L", number: 50 },
  { id: 5, name: "XL", number: 52 },
  { id: 6, name: "XXL", number: 54 },
];

const categories = [
  { id: 1, name: "Верхняя одежда" },
  { id: 2, name: "Нижняя одежда" },
  { id: 3, name: "Спорт" },
  { id: 4, name: "Аксессуары" },
];

const products = [
  {
    id: 1,
    name: "Футболка",
    categoryId: 1,
    brand: "Basic Club",
    colors: [
      {
        id: 1,
        name: "чёрный",
        images: ["projects/catalog/images/1/black_front.webp ", "projects/catalog/images/1/black_back.webp "],
        price: "900",
        description: 'Описание для "Футболка чёрный"',
        sizes: [1, 2, 3],
      },
      {
        id: 2,
        name: "белый",
        images: ["projects/catalog/images/1/white_front.webp ", "projects/catalog/images/1/white_back.webp "],
        price: "1100",
        description: 'Описание для "Футболка белый"',
        sizes: [1, 2, 3, 4, 5, 6],
      },
      {
        id: 3,
        name: "серый",
        images: ["projects/catalog/images/1/gray_front.webp ", "projects/catalog/images/1/gray_back.webp "],
        price: "1000",
        description: 'Описание для "Футболка серый"',
        sizes: [],
      },
    ],
  },
  {
    id: 2,
    name: "Майка",
    categoryId: 1,
    brand: "Run&Go",
    colors: [
      {
        id: 1,
        name: "желтый",
        images: ["projects/catalog/images/2/yellow_front.webp ", "projects/catalog/images/2/yellow_back.webp "],
        price: "750",
        description: 'Описание для "Майка желтый"',
        sizes: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        name: "синий",
        images: ["projects/catalog/images/2/blue_front.webp ", "projects/catalog/images/2/blue_back.webp "],
        price: "1500",
        description: 'Описание для "Майка синий"',
        sizes: [2],
      },
      {
        id: 3,
        name: "чёрный",
        images: ["projects/catalog/images/2/black_front.webp ", "projects/catalog/images/2/black_back.webp "],
        price: "800",
        description: 'Описание для "Майка чёрный"',
        sizes: [],
      },
    ],
  },
  {
    id: 3,
    name: "Худи",
    categoryId: 1,
    brand: "North Street",
    colors: [
      {
        id: 1,
        name: "чёрный",
        images: ["projects/catalog/images/3/black_front.webp ", "projects/catalog/images/3/black_detail.webp "],
        price: "1750",
        description: 'Описание для "Худи чёрный"',
        sizes: [3, 4, 5, 6],
      },
      {
        id: 2,
        name: "бежевый",
        images: ["projects/catalog/images/3/beige_front.webp "],
        price: "2250",
        description: 'Описание для "Худи бежевый"',
        sizes: [2, 3, 4],
      },
    ],
  },
  {
    id: 4,
    name: "Шорты",
    categoryId: 2,
    brand: "Basic Club",
    colors: [
      {
        id: 1,
        name: "хаки",
        images: ["projects/catalog/images/4/khaki_front.webp ", "projects/catalog/images/4/khaki_back.webp "],
        price: "750",
        description: 'Описание для "Шорты хаки"',
        sizes: [2, 3, 4, 5],
      },
      {
        id: 2,
        name: "чёрный",
        images: ["projects/catalog/images/4/black_front.webp ", "projects/catalog/images/4/black_back.webp "],
        price: "500",
        description: 'Описание для "Шорты чёрный"',
        sizes: [3, 4],
      },
      {
        id: 3,
        name: "серый",
        images: ["projects/catalog/images/4/gray_front.webp ", "projects/catalog/images/4/gray_back.webp "],
        price: "250",
        description: 'Описание для "Шорты серый"',
        sizes: [],
      },
    ],
  },
  {
    id: 5,
    name: "Кепка",
    categoryId: 4,
    brand: "North Street",
    colors: [
      {
        id: 1,
        name: "чёрный",
        images: ["projects/catalog/images/5/black_front.webp ", "projects/catalog/images/5/black_side.webp "],
        price: "500",
        description: 'Описание для "Кепка чёрный"',
        sizes: [3],
      },
      {
        id: 2,
        name: "белый",
        images: ["projects/catalog/images/5/white_front.webp ", "projects/catalog/images/5/white_side.webp "],
        price: "750",
        description: 'Описание для "Кепка белый"',
        sizes: [3],
      },
    ],
  },
  {
    id: 6,
    name: "Пальто",
    categoryId: 1,
    brand: "WarmLine",
    colors: [
      {
        id: 1,
        name: "чёрный",
        images: ["projects/catalog/images/6/black_front.webp ", "projects/catalog/images/6/black_back.webp "],
        price: "12000",
        description: 'Описание для "Пальто чёрный"',
        sizes: [],
      },
      {
        id: 2,
        name: "графит",
        images: [
          "projects/catalog/images/6/graphite_front.webp ",
          "projects/catalog/images/6/graphite_back.webp ",
        ],
        price: "15000",
        description: 'Описание для "Пальто графит"',
        sizes: [],
      },
    ],
  },
];

function getSizes(): Promise<Size[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sizes), delay);
  });
}

function getSize(id: number): Promise<Size> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const size = sizes.find((size) => String(size.id) === String(id));
      if (size) {
        resolve(size);
      } else {
        reject(new Error("getSize: Size not found"));
      }
    }, delay);
  });
}

function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), delay);
  });
}

function getCategory(id: number): Promise<Category> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const category = categories.find(
        (category) => String(category.id) === String(id),
      );
      if (category) {
        resolve(category);
      } else {
        reject(new Error("getCategory: Category not found"));
      }
    }, delay);
  });
}

function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), delay);
  });
}

function getProduct(id: number): Promise<Product> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id == id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, delay);
  });
}

function getProductColor(productID: number, colorID: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(
        (product) => String(product.id) === String(productID),
      );
      if (!product) {
        return reject(new Error("getProductColor: Product not found"));
      }
      const color = product.colors.find(
        (color) => String(color.id) === String(colorID),
      );
      if (color) {
        resolve(color);
      } else {
        reject(new Error("getProductColor: Color not found"));
      }
    }, delay);
  });
}

export {
  getSizes,
  getSize,
  getCategories,
  getCategory,
  getProducts,
  getProduct,
  getProductColor,
};
