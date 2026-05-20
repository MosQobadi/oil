export interface SuggestedProducts {
  suggestedOils?: number[];
  suggestedOilFilters?: number[];
  suggestedAirFilters?: number[];
  suggestedCabinFilters?: number[];
  suggestedFuelFilters?: number[];
}

export type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  engine: string;
  description: string;
  imageUrl?: string;
  suggestedProducts?: SuggestedProducts | null;
};

export interface CarInsertPayload {
  brand?: string;
  model?: string;
  year?: number;
  engine?: string;
  description?: string;
  imageUrl?: string;
  suggestedProducts?: SuggestedProducts | null;
  [key: string]: unknown;
}

export interface CarUpdatePayload extends CarInsertPayload {
  id: number;
}
