export interface CabinFilter {
  id: number;
  brand: string;
  name: string;
  model: string;
  price: number;
  badge: string;
  imageUrl?: string;
}

export interface CabinFilterInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface CabinFilterUpdatePayload extends CabinFilterInsertPayload {
  id: number;
}
