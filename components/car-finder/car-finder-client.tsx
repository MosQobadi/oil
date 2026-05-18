"use client";

import { useMemo, useState } from "react";
import { Car, ChevronDown, Search } from "lucide-react";

import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  engine: string;
  description: string;
}

interface CarFinderClientProps {
  cars: Car[];
}

export function CarFinderClient({ cars }: CarFinderClientProps) {
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
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Car className="h-7 w-7 text-primary" />
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

            <p className="mt-4 text-muted-foreground">
              {selectedCar.description}
            </p>
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
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-card overflow-hidden z-50">
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
