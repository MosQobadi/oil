"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Flame, Snowflake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { useOils } from "@/lib/api/oils/queries";
import { useOilFilters } from "@/lib/api/oilFilters/queries";
import { useAirFilters } from "@/lib/api/airFilters/queries";
import { useCabinFilters } from "@/lib/api/cabinFilters/queries";
import type { Oil } from "@/lib/api/oils/types";
import type { OilFilter } from "@/lib/api/oilFilters/types";
import type { AirFilter } from "@/lib/api/airFilters/types";
import type { CabinFilter } from "@/lib/api/cabinFilters/types";

type ProductCategory = "oils" | "oilFilters" | "airFilters" | "cabinFilters";

type SectionProduct = Oil | OilFilter | AirFilter | CabinFilter;

const tabConfig = [
  {
    id: "oils" as const,
    label: "engineOil",
    icon: Flame,
    gradient: "from-primary/20 to-primary/5",
    typeLabel: "Oil",
  },
  {
    id: "oilFilters" as const,
    label: "oilFilter",
    icon: Zap,
    gradient: "from-accent/20 to-accent/5",
    typeLabel: "Oil Filter",
  },
  {
    id: "airFilters" as const,
    label: "airFilter",
    icon: Snowflake,
    gradient: "from-sky-200/30 to-sky-200/5",
    typeLabel: "Air Filter",
  },
  {
    id: "cabinFilters" as const,
    label: "cabinFilter",
    icon: Star,
    gradient: "from-emerald-200/30 to-emerald-200/5",
    typeLabel: "Cabin Filter",
  },
];

export function ProductsSection() {
  const { t, language, isRTL } = useLanguage();
  const { addItem } = useCart();

  const {
    data: oils = [],
    isLoading: isOilsLoading,
    isError: isOilsError,
  } = useOils();

  const {
    data: oilFilters = [],
    isLoading: isOilFiltersLoading,
    isError: isOilFiltersError,
  } = useOilFilters();

  const {
    data: airFilters = [],
    isLoading: isAirFiltersLoading,
    isError: isAirFiltersError,
  } = useAirFilters();

  const {
    data: cabinFilters = [],
    isLoading: isCabinFiltersLoading,
    isError: isCabinFiltersError,
  } = useCabinFilters();

  const [selectedTab, setSelectedTab] = useState<ProductCategory>("oils");

  const products =
    selectedTab === "oils"
      ? oils
      : selectedTab === "oilFilters"
        ? oilFilters
        : selectedTab === "airFilters"
          ? airFilters
          : cabinFilters;

  const isLoading =
    selectedTab === "oils"
      ? isOilsLoading
      : selectedTab === "oilFilters"
        ? isOilFiltersLoading
        : selectedTab === "airFilters"
          ? isAirFiltersLoading
          : isCabinFiltersLoading;

  const isError =
    selectedTab === "oils"
      ? isOilsError
      : selectedTab === "oilFilters"
        ? isOilFiltersError
        : selectedTab === "airFilters"
          ? isAirFiltersError
          : isCabinFiltersError;

  const currentTab = tabConfig.find((tab) => tab.id === selectedTab)!;

  const handleAddToCart = (product: SectionProduct) => {
    const typeMap: Record<ProductCategory, SectionProduct["id"]> = {
      oils: product.id,
      oilFilters: product.id,
      airFilters: product.id,
      cabinFilters: product.id,
    };

    const cartType =
      selectedTab === "oils"
        ? "oil"
        : selectedTab === "oilFilters"
          ? "oil-filter"
          : selectedTab === "airFilters"
            ? "air-filter"
            : "cabin-filter";

    addItem({
      id: `${selectedTab}-${product.id}`,
      name: product.name,
      nameFA: product.name,
      price: product.price,
      type: cartType,
      specs: product.model,
    });
  };

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.products.subtitle}
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            {t.products.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.products.description}
          </p>
        </motion.div>

        <div className="mb-10">
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as ProductCategory)}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1">
              {tabConfig.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                  {t.products[tab.label as keyof typeof t.products]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-border/50 bg-background p-12 text-center text-sm text-muted-foreground">
            {t.common.loading}
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-border/50 bg-background p-12 text-center text-sm text-destructive">
            {t.common.error}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-border/50 bg-background p-12 text-center text-sm text-muted-foreground">
            {t.admin.noProducts}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const Icon = currentTab.icon;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                    <div
                      className={`absolute top-4 z-10 ${isRTL ? "right-4" : "left-4"}`}
                    >
                      <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full">
                        {product.badge || currentTab.typeLabel}
                      </span>
                    </div>

                    <div
                      className={`relative h-48 bg-gradient-to-br ${currentTab.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-card to-secondary rounded-3xl border border-border/20" />
                      <div className="relative z-10 text-center">
                        <img
                          className="w-30"
                          src={product.imageUrl || "/placeholder-image.jpg"}
                          alt={product.name}
                        />
                        {/* <div className="text-primary font-bold text-xl mb-2">
                          APEX
                        </div>
                        <div className="text-foreground font-semibold text-sm">
                          {currentTab.typeLabel}
                        </div> */}
                      </div>
                      <div
                        className={`absolute bottom-4 ${isRTL ? "left-4" : "right-4"}`}
                      >
                        <Icon className="h-6 w-6 text-primary/60" />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {product.brand}
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {currentTab.typeLabel}
                        </span>
                      </div>

                      <h3
                        className={`text-xl font-semibold text-foreground ${isRTL ? "text-right" : ""}`}
                      >
                        {product.name}
                      </h3>

                      <p
                        className={`text-sm text-muted-foreground mt-2 ${isRTL ? "text-right" : ""}`}
                      >
                        {t.carFinder.specification}: {product.model}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <div className={isRTL ? "text-right" : ""}>
                          <p className="text-2xl font-bold text-foreground">
                            ${product?.price?.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <ShoppingCart
                          className={`h-4 w-4 transition-transform ${isRTL ? "ml-2" : "mr-2"}`}
                        />
                        {t.products.addToCart}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 hover:bg-secondary/50 text-foreground font-semibold px-12"
            >
              {t.products.viewAll}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
