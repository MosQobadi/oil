import type { ProductCategory } from "./types";

export const productTableMap: Record<ProductCategory, string> = {
  oils: "oils",
  oilFilters: "oilFilters",
  airFilters: "airFilters",
  cabinFilters: "cabinFilters",
  fuelFilters: "fuelFilters",
};

export function productTableName(category: ProductCategory) {
  return productTableMap[category];
}
