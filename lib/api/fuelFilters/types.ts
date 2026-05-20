export interface FuelFilter {
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

export interface FuelFilterInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface FuelFilterUpdatePayload extends FuelFilterInsertPayload {
  id: number;
}
