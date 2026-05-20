export type ProductCategory =
  | "oils"
  | "oilFilters"
  | "airFilters"
  | "cabinFilters"
  | "fuelFilters";

export function parseProductCategory(value: string): ProductCategory {
  if (
    value === "oils" ||
    value === "oilFilters" ||
    value === "airFilters" ||
    value === "cabinFilters" ||
    value === "fuelFilters"
  ) {
    return value;
  }

  throw new Error("Invalid product category.");
}
