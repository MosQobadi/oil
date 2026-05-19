// Generic product type shared across all admin product lists
export interface BaseProduct {
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
