interface RealEstateParams {
  type?: `flat` | `room` | `house`;
  address?: string;
  area?: number;
  floor?: number;
}

interface ElectronicsParams {
  type?: `phone` | `laptop` | `misc`;
  brand?: string;
  model?: string;
  condition?: `new` | `used`;
  color?: string;
}

interface AutoParams {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: `automatic` | `manual`;
  mileage?: number;
  enginePower?: number;
}

interface BaseItem {
  id: number;
  title: string;
  description?: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
}

interface RealEstateItem extends BaseItem {
  category: `real_estate`;
  params: RealEstateParams;
}

interface ElectronicsItem extends BaseItem {
  category: `electronics`;
  params: ElectronicsParams;
}

interface AutoItem extends BaseItem {
  category: `auto`;
  params: AutoParams;
}

export type Item = AutoItem | ElectronicsItem | RealEstateItem;

export type ItemSortColumn = Extract<
  keyof Item,
  `title` | `createdAt` | `price`
>;

export type SortDirection = `asc` | `desc`;

export interface ItemShort {
  id: number;
  category: Item[`category`];
  title: string;
  price: number | null;
  needsRevision: boolean;
}

export interface ItemsResponse {
  items: ItemShort[];
  total: number;
}

export type ItemCategory = Item["category"];
