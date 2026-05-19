"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Filter,
  ChevronDown,
  X,
  SlidersHorizontal,
  Droplet,
  CircleDot,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { allProducts, Product } from "@/lib/products-data";
import type { TranslationKeys } from "@/lib/translations";

type TabKey = "engine-oil" | "oil-filter" | "air-cabin-filter";

const tabs: { key: TabKey; icon: React.ReactNode }[] = [
  { key: "engine-oil", icon: <Droplet className="h-4 w-4" /> },
  { key: "oil-filter", icon: <CircleDot className="h-4 w-4" /> },
  { key: "air-cabin-filter", icon: <Wind className="h-4 w-4" /> },
];

export default function ProductsPage() {
  const { t, language, isRTL } = useLanguage();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<TabKey>("engine-oil");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "popular" | "price-low" | "price-high" | "newest"
  >("popular");

  // Filter states
  const [selectedViscosities, setSelectedViscosities] = useState<string[]>([]);
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const getTabLabel = (key: TabKey) => {
    switch (key) {
      case "engine-oil":
        return t.productsPage.engineOils;
      case "oil-filter":
        return t.productsPage.oilFilters;
      case "air-cabin-filter":
        return t.productsPage.airCabinFilters;
    }
  };

  // Get products for current tab
  const tabProducts = useMemo(() => {
    switch (activeTab) {
      case "engine-oil":
        return allProducts.filter((p) => p.category === "engine-oil");
      case "oil-filter":
        return allProducts.filter((p) => p.category === "oil-filter");
      case "air-cabin-filter":
        return allProducts.filter(
          (p) => p.category === "air-filter" || p.category === "cabin-filter",
        );
      default:
        return [];
    }
  }, [activeTab]);

  // Get unique viscosities for engine oils
  const viscosities = useMemo(() => {
    return [
      ...new Set(
        allProducts.filter((p) => p.viscosity).map((p) => p.viscosity!),
      ),
    ];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...tabProducts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameFA.includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    // Viscosity filter (for engine oils)
    if (activeTab === "engine-oil" && selectedViscosities.length > 0) {
      products = products.filter(
        (p) => p.viscosity && selectedViscosities.includes(p.viscosity),
      );
    }

    // Filter type filter (for filters)
    if (activeTab === "air-cabin-filter" && selectedFilterTypes.length > 0) {
      products = products.filter((p) =>
        selectedFilterTypes.includes(p.category),
      );
    }

    // Price filter
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.reverse();
        break;
      case "popular":
      default:
        products.sort((a, b) => b.reviews - a.reviews);
    }

    return products;
  }, [
    tabProducts,
    searchQuery,
    selectedViscosities,
    selectedFilterTypes,
    priceRange,
    sortBy,
    activeTab,
  ]);

  const clearAllFilters = () => {
    setSelectedViscosities([]);
    setSelectedFilterTypes([]);
    setPriceRange([0, 200]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedViscosities.length > 0 ||
    selectedFilterTypes.length > 0 ||
    searchQuery;

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      nameFA: product.nameFA,
      price: product.price,
      type: product.category === "engine-oil" ? "oil" : product.category,
      viscosity: product.viscosity,
      specs: product.specs
        ? Object.values(product.specs).join(", ")
        : undefined,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t.productsPage.subtitle}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              {t.productsPage.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.productsPage.description}
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div
              className={`inline-flex bg-card rounded-xl p-1.5 border border-border/50 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">
                    {getTabLabel(tab.key)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search & Sort Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex flex-col sm:flex-row gap-4 mb-8 ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t.common.search + "..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-card border-border/50"
              />
            </div>

            <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 gap-2 ${showFilters ? "border-primary" : ""} ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters
                  ? t.productsPage.hideFilters
                  : t.productsPage.showFilters}
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className={`h-12 px-4 rounded-lg bg-card border border-border/50 text-foreground ${isRTL ? "text-right" : ""}`}
              >
                <option value="popular">{t.productsPage.popular}</option>
                <option value="price-low">{t.productsPage.lowToHigh}</option>
                <option value="price-high">{t.productsPage.highToLow}</option>
                <option value="newest">{t.productsPage.newest}</option>
              </select>
            </div>
          </motion.div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.aside
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 280 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden lg:block shrink-0 overflow-hidden"
                >
                  <div className="w-[280px] bg-card rounded-2xl border border-border/50 p-6">
                    <div
                      className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <h3 className="font-semibold text-foreground">
                        {t.productsPage.filters}
                      </h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-primary hover:underline"
                        >
                          {t.productsPage.clearAll}
                        </button>
                      )}
                    </div>

                    {/* Viscosity Filter (for engine oils) */}
                    {activeTab === "engine-oil" && (
                      <div className="mb-6">
                        <h4
                          className={`text-sm font-medium text-foreground mb-3 ${isRTL ? "text-right" : ""}`}
                        >
                          {t.productsPage.viscosity}
                        </h4>
                        <div className="space-y-2">
                          {viscosities.map((visc) => (
                            <label
                              key={visc}
                              className={`flex items-center gap-3 cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <Checkbox
                                checked={selectedViscosities.includes(visc)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedViscosities([
                                      ...selectedViscosities,
                                      visc,
                                    ]);
                                  } else {
                                    setSelectedViscosities(
                                      selectedViscosities.filter(
                                        (v) => v !== visc,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <span className="text-sm text-muted-foreground">
                                {visc}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Filter Type (for air/cabin filters) */}
                    {activeTab === "air-cabin-filter" && (
                      <div className="mb-6">
                        <h4
                          className={`text-sm font-medium text-foreground mb-3 ${isRTL ? "text-right" : ""}`}
                        >
                          {t.productsPage.filterType}
                        </h4>
                        <div className="space-y-2">
                          {[
                            {
                              id: "air-filter",
                              label: t.productsPage.airFilter,
                            },
                            {
                              id: "cabin-filter",
                              label: t.productsPage.cabinFilter,
                            },
                          ].map((type) => (
                            <label
                              key={type.id}
                              className={`flex items-center gap-3 cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <Checkbox
                                checked={selectedFilterTypes.includes(type.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedFilterTypes([
                                      ...selectedFilterTypes,
                                      type.id,
                                    ]);
                                  } else {
                                    setSelectedFilterTypes(
                                      selectedFilterTypes.filter(
                                        (t) => t !== type.id,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <span className="text-sm text-muted-foreground">
                                {type.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price Range */}
                    <div>
                      <h4
                        className={`text-sm font-medium text-foreground mb-3 ${isRTL ? "text-right" : ""}`}
                      >
                        {t.productsPage.price}
                      </h4>
                      <div
                        className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <Input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-24 h-10"
                          min={0}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-24 h-10"
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results count */}
              <p
                className={`text-sm text-muted-foreground mb-6 ${isRTL ? "text-right" : ""}`}
              >
                {filteredProducts.length} {t.productsPage.results}
              </p>

              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Filter className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t.productsPage.noProducts}
                  </h3>
                  <Button variant="outline" onClick={clearAllFilters}>
                    {t.productsPage.clearAll}
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        language={language}
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
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Product Card Component
function ProductCard({
  product,
  language,
  isRTL,
  onAddToCart,
  t,
}: {
  product: Product;
  language: string;
  isRTL: boolean;
  onAddToCart: () => void;
  t: TranslationKeys;
}) {
  return (
    <div className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all">
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-4 z-10 ${isRTL ? "right-4" : "left-4"}`}>
          <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full">
            {language === "fa" ? product.badgeFA : product.badge}
          </span>
        </div>
      )}

      {/* Product Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center overflow-hidden">
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          {/* Simplified product representation */}
          <div className="w-20 h-28 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary via-card to-secondary rounded-xl border border-border/30">
              <div className="absolute inset-x-2 top-6 bottom-6 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex flex-col items-center justify-center p-1">
                <div className="text-primary font-bold text-xs">APEX</div>
                {product.viscosity && (
                  <div className="text-foreground font-bold text-[10px] mt-0.5">
                    {product.viscosity}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div
          className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-primary fill-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Name */}
        <h3
          className={`text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1 ${isRTL ? "text-right" : ""}`}
        >
          {language === "fa" ? product.nameFA : product.name}
        </h3>

        {/* Type/Viscosity */}
        <p
          className={`text-sm text-muted-foreground mb-3 ${isRTL ? "text-right" : ""}`}
        >
          {product.viscosity && `${product.viscosity} • `}
          {product.type || product.badge}
        </p>

        {/* Features */}
        <div
          className={`flex flex-wrap gap-1.5 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {(language === "fa" ? product.featuresFA : product.features)
            .slice(0, 2)
            .map((feature) => (
              <span
                key={feature}
                className="px-2 py-0.5 text-[10px] font-medium bg-secondary text-muted-foreground rounded"
              >
                {feature}
              </span>
            ))}
        </div>

        {/* Price & CTA */}
        <div
          className={`flex items-center justify-between pt-4 border-t border-border/30 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className={isRTL ? "text-right" : ""}>
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span
                className={`text-sm text-muted-foreground line-through ${isRTL ? "mr-2" : "ml-2"}`}
              >
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button
            onClick={onAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShoppingCart className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.products.addToCart}
          </Button>
        </div>
      </div>
    </div>
  );
}
