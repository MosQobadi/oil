export interface AirFilter {
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

export interface AirFilterInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface AirFilterUpdatePayload extends AirFilterInsertPayload {
  id: number;
}
