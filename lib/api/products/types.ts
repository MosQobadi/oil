export type { ProductCategory } from "@/lib/api/product-category";

export interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  price: number;
  badge: string;
  imageUrl?: string;
  description?: string;
  isActive?: boolean;
}

export interface ProductInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  imageUrl?: string;
  description?: string;
  isActive?: boolean;
  [key: string]: unknown;
}

export interface ProductUpdatePayload extends ProductInsertPayload {
  id: number;
}
