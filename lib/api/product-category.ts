export type ProductCategory =
  | "oils"
  | "oilFilters"
  | "airFilters"
  | "cabinFilters"
  | "fuelFilters";

export const productCategoryToPrisma: Record<
  ProductCategory,
  "OIL" | "OIL_FILTER" | "AIR_FILTER" | "CABIN_FILTER" | "FUEL_FILTER"
> = {
  oils: "OIL",
  oilFilters: "OIL_FILTER",
  airFilters: "AIR_FILTER",
  cabinFilters: "CABIN_FILTER",
  fuelFilters: "FUEL_FILTER",
};

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
