export type ProductCategory =
  | "oils"
  | "oilFilters"
  | "airFilters"
  | "cabinFilters";

export interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  price: number;
  badge: string;
}

export interface ProductInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  [key: string]: unknown;
}

export interface ProductUpdatePayload extends ProductInsertPayload {
  id: number;
}
