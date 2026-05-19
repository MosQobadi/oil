import type { ProductCategory } from "./types";

export const productTableMap: Record<ProductCategory, string> = {
  oils: "oils",
  oilFilters: "oil_filters",
  airFilters: "air_filters",
  cabinFilters: "cabin_filters",
};

export function productTableName(category: ProductCategory) {
  return productTableMap[category];
}
