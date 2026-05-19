export interface OilFilter {
  id: number;
  brand: string;
  name: string;
  model: string;
  price: number;
  badge: string;
  imageUrl?: string;
}

export interface OilFilterInsertPayload {
  brand?: string;
  name?: string;
  model?: string;
  price?: number;
  badge?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface OilFilterUpdatePayload extends OilFilterInsertPayload {
  id: number;
}
