export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  engine: string;
  description: string;
  imageUrl?: string;
};

export interface CarInsertPayload {
  brand?: string;
  model?: string;
  year?: number;
  engine?: string;
  description?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface CarUpdatePayload extends CarInsertPayload {
  id: number;
}
