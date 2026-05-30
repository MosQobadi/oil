"use client";

import { useMemo, useState } from "react";
import { Car as CarIcon, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { useCars } from "@/lib/api/cars/queries";
import { useProducts } from "@/lib/api/products/queries";
import type { Car } from "@/lib/api/cars/types";

export function CarFinderClient() {
  const { data: cars = [], isLoading, isError } = useCars();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // SEARCH FILTER
  const filteredCars = useMemo(() => {
    if (!searchQuery) return cars;

    return cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [cars, searchQuery]);

  // UNIQUE BRANDS
  const brands = [...new Set(filteredCars.map((car) => car.brand))];

  // UNIQUE MODELS
  const models = [
    ...new Set(
      filteredCars
        .filter((car) => car.brand === selectedBrand)
        .map((car) => car.model),
    ),
  ];

  // UNIQUE YEARS
  const years = [
    ...new Set(
      filteredCars
        .filter(
          (car) => car.brand === selectedBrand && car.model === selectedModel,
        )
        .map((car) => car.year),
    ),
  ];

  // FINAL SELECTED CAR
  const selectedCar = filteredCars.find(
    (car) =>
      car.brand === selectedBrand &&
      car.model === selectedModel &&
      car.year === selectedYear,
  );

  const oilsQuery = useProducts("oils");
  const oilFiltersQuery = useProducts("oilFilters");
  const airFiltersQuery = useProducts("airFilters");
  const cabinFiltersQuery = useProducts("cabinFilters");
  const fuelFiltersQuery = useProducts("fuelFilters");

  const getSuggestedLabels = (
    ids: number[] | undefined,
    products: { id: number; brand: string; name: string }[],
  ) => {
    if (!ids || ids.length === 0) return [];

    return ids
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
      .map((product) => `${product?.brand ?? ""} ${product?.name ?? ""}`);
  };

  const suggestedOils = getSuggestedLabels(
    selectedCar?.suggestedProducts?.suggestedOils,
    oilsQuery.data ?? [],
  );
  const suggestedOilFilters = getSuggestedLabels(
    selectedCar?.suggestedProducts?.suggestedOilFilters,
    oilFiltersQuery.data ?? [],
  );
  const suggestedAirFilters = getSuggestedLabels(
    selectedCar?.suggestedProducts?.suggestedAirFilters,
    airFiltersQuery.data ?? [],
  );
  const suggestedCabinFilters = getSuggestedLabels(
    selectedCar?.suggestedProducts?.suggestedCabinFilters,
    cabinFiltersQuery.data ?? [],
  );
  const suggestedFuelFilters = getSuggestedLabels(
    selectedCar?.suggestedProducts?.suggestedFuelFilters,
    fuelFiltersQuery.data ?? [],
  );

  const suggestedSections = [
    { title: "Suggested Oils", items: suggestedOils },
    { title: "Suggested Oil Filters", items: suggestedOilFilters },
    { title: "Suggested Air Filters", items: suggestedAirFilters },
    { title: "Suggested Cabin Filters", items: suggestedCabinFilters },
    { title: "Suggested Fuel Filters", items: suggestedFuelFilters },
  ].filter((section) => section.items.length > 0);

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center text-muted-foreground">
          Loading cars...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center text-destructive">
          Failed to load cars.
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Find Your Car</h2>

          <p className="text-muted-foreground mt-4">
            Select your car and see recommended products.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

          <Input
            placeholder="Search brand or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12"
          />
        </div>

        {/* SELECTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BRAND */}
          <SelectBox
            label="Select Brand"
            value={selectedBrand}
            options={brands}
            onSelect={(value) => {
              setSelectedBrand(value);

              setSelectedModel(null);

              setSelectedYear(null);
            }}
          />

          {/* MODEL */}
          <SelectBox
            label="Select Model"
            value={selectedModel}
            options={models}
            disabled={!selectedBrand}
            onSelect={(value) => {
              setSelectedModel(value);

              setSelectedYear(null);
            }}
          />

          {/* YEAR */}
          <SelectBox
            label="Select Year"
            value={selectedYear?.toString() || null}
            options={years.map(String)}
            disabled={!selectedModel}
            onSelect={(value) => {
              setSelectedYear(Number(value));
            }}
          />
        </div>

        {/* RESULT */}
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-border bg-card p-6"
          >
            <div
              className={`grid gap-6 ${selectedCar.imageUrl ? "lg:grid-cols-[240px_1fr]" : ""}`}
            >
              {selectedCar.imageUrl && (
                <div className="relative overflow-hidden rounded-3xl bg-muted/10">
                  <img
                    src={selectedCar.imageUrl}
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CarIcon className="h-7 w-7 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedCar.brand} {selectedCar.model}
                    </h3>

                    <p className="text-muted-foreground">
                      {selectedCar.year} • {selectedCar.engine}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  {selectedCar.description}
                </p>

                {suggestedSections.length > 0 && (
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <h4 className="text-lg font-semibold">
                      Recommended Products
                    </h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {suggestedSections.map((section) => (
                        <SuggestedSection
                          key={section.title}
                          title={section.title}
                          items={section.items}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface SelectBoxProps {
  label: string;

  value: string | null;

  options: string[];

  disabled?: boolean;

  onSelect: (value: string) => void;
}

function SelectBox({
  label,
  value,
  options,
  disabled,
  onSelect,
}: SelectBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-14 px-4 rounded-xl border border-border bg-card flex items-center justify-between"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || label}
        </span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {open && options.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border max-h-60 border-border bg-card  z-50 overflow-y-scroll">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);

                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface SuggestedSectionProps {
  title: string;
  items: string[];
}

function SuggestedSection({ title, items }: SuggestedSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h5 className="text-sm font-semibold text-foreground">{title}</h5>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          No recommendations.
        </p>
      )}
    </div>
  );
}
