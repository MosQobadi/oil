"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CircleDot,
  Droplet,
  Fuel,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { useOils } from "@/lib/api/oils/queries";
import { useOilFilters } from "@/lib/api/oilFilters/queries";
import { useAirFilters } from "@/lib/api/airFilters/queries";
import { useCabinFilters } from "@/lib/api/cabinFilters/queries";
import { useFuelFilters } from "@/lib/api/fuelFilters/queries";
import type { Oil } from "@/lib/api/oils/types";
import type { OilFilter } from "@/lib/api/oilFilters/types";
import type { AirFilter } from "@/lib/api/airFilters/types";
import type { CabinFilter } from "@/lib/api/cabinFilters/types";
import type { FuelFilter } from "@/lib/api/fuelFilters/types";
import type { TranslationKeys } from "@/lib/translations";

type ProductType =
  | "oils"
  | "oilFilters"
  | "airFilters"
  | "cabinFilters"
  | "fuelFilters";
type Product = Oil | OilFilter | AirFilter | CabinFilter | FuelFilter;

const tabs: {
  key: ProductType;
  label: keyof TranslationKeys["productsPage"];
  icon: React.ReactNode;
  cartType: "oil" | "oil-filter" | "air-filter" | "cabin-filter" | "fuel-filter";
}[] = [
  { key: "oils", label: "engineOils", icon: <Droplet className="h-4 w-4" />, cartType: "oil" },
  { key: "oilFilters", label: "oilFilters", icon: <CircleDot className="h-4 w-4" />, cartType: "oil-filter" },
  { key: "airFilters", label: "airFilter", icon: <Wind className="h-4 w-4" />, cartType: "air-filter" },
  { key: "cabinFilters", label: "cabinFilter", icon: <SlidersHorizontal className="h-4 w-4" />, cartType: "cabin-filter" },
  { key: "fuelFilters", label: "fuelFilter", icon: <Fuel className="h-4 w-4" />, cartType: "fuel-filter" },
];

export default function ProductsPage() {
  const { t, isRTL } = useLanguage();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<ProductType>("oils");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">(
    "name",
  );

  const oils = useOils();
  const oilFilters = useOilFilters();
  const airFilters = useAirFilters();
  const cabinFilters = useCabinFilters();
  const fuelFilters = useFuelFilters();

  const currentQuery =
    activeTab === "oils"
      ? oils
      : activeTab === "oilFilters"
        ? oilFilters
        : activeTab === "airFilters"
          ? airFilters
          : activeTab === "cabinFilters"
            ? cabinFilters
            : fuelFilters;

  const currentTab = tabs.find((tab) => tab.key === activeTab)!;
  const products = (currentQuery.data ?? []) as Product[];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = products.filter((product) =>
      [product.brand, product.name, product.model, product.badge]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchQuery, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: `${activeTab}-${product.id}`,
      name: product.name,
      nameFA: product.name,
      price: product.price,
      type: currentTab.cartType,
      specs: product.model,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 ${isRTL ? "text-right" : ""}`}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {t.productsPage.subtitle}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t.productsPage.title}
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {t.productsPage.description}
            </p>
          </motion.div>

          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                } ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {tab.icon}
                {t.productsPage[tab.label]}
              </button>
            ))}
          </div>

          <div className={`mb-8 grid gap-3 sm:grid-cols-[1fr_auto] ${isRTL ? "sm:[direction:rtl]" : ""}`}>
            <div className="relative">
              <Search
                className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={`${t.common.search}...`}
                className={`h-12 bg-card ${isRTL ? "pr-11 text-right" : "pl-11"}`}
              />
            </div>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
              className={`h-12 rounded-lg border border-border/50 bg-card px-4 text-foreground ${
                isRTL ? "text-right" : ""
              }`}
            >
              <option value="name">{t.admin.name}</option>
              <option value="price-low">{t.productsPage.lowToHigh}</option>
              <option value="price-high">{t.productsPage.highToLow}</option>
            </select>
          </div>

          <p className={`mb-5 text-sm text-muted-foreground ${isRTL ? "text-right" : ""}`}>
            {filteredProducts.length} {t.productsPage.results}
          </p>

          {currentQuery.isLoading ? (
            <StatusBox>{t.common.loading}</StatusBox>
          ) : currentQuery.isError ? (
            <StatusBox isError>{t.common.error}</StatusBox>
          ) : filteredProducts.length === 0 ? (
            <StatusBox>{t.productsPage.noProducts}</StatusBox>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={`${activeTab}-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <ProductCard
                    product={product}
                    typeLabel={t.productsPage[currentTab.label]}
                    isRTL={isRTL}
                    onAddToCart={() => handleAddToCart(product)}
                    t={t}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function StatusBox({
  children,
  isError,
}: {
  children: React.ReactNode;
  isError?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-border/50 bg-card p-10 text-center text-sm ${
        isError ? "text-destructive" : "text-muted-foreground"
      }`}
    >
      {children}
    </div>
  );
}

function ProductCard({
  product,
  typeLabel,
  isRTL,
  onAddToCart,
  t,
}: {
  product: Product;
  typeLabel: string;
  isRTL: boolean;
  onAddToCart: () => void;
  t: TranslationKeys;
}) {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-card transition hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
        {product.badge && (
          <span
            className={`absolute top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground ${
              isRTL ? "right-4" : "left-4"
            }`}
          >
            {product.badge}
          </span>
        )}
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="max-h-36 max-w-[70%] object-contain"
        />
      </div>

      <div className={`space-y-4 p-5 ${isRTL ? "text-right" : ""}`}>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {product.brand}
          </p>
          <h2 className="mt-2 text-xl font-bold text-foreground">
            {product.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {typeLabel}
            {product.model ? ` - ${product.model}` : ""}
          </p>
        </div>

        <div
          className={`flex items-center justify-between gap-4 border-t border-border/40 pt-4 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <span className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button onClick={onAddToCart} className={isRTL ? "flex-row-reverse" : ""}>
            <ShoppingCart className="h-4 w-4" />
            {t.products.addToCart}
          </Button>
        </div>
      </div>
    </div>
  );
}
