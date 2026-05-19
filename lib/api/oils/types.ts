export interface Oil {
  id: number;
  brand: string;
  name: string;
  model: string;
  price: number;
  badge: string;
  imageUrl?: string;
}

export interface OilInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface OilUpdatePayload extends OilInsertPayload {
  id: number;
}
