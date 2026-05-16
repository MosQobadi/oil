"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Car, Droplet, Filter, Wind, ChevronDown, Check, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { carDatabase, CarBrand, CarModel, CarEngine } from "@/lib/car-data"
import { allProducts } from "@/lib/products-data"

export function CarFinderSection() {
  const { t, language, isRTL } = useLanguage()
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null)
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedEngine, setSelectedEngine] = useState<CarEngine | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Filter brands based on search
  const filteredBrands = useMemo(() => {
    if (!searchQuery) return carDatabase
    const query = searchQuery.toLowerCase()
    return carDatabase.filter(
      brand =>
        brand.name.toLowerCase().includes(query) ||
        brand.nameFA.includes(query) ||
        brand.models.some(m => m.name.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand)
    setSelectedModel(null)
    setSelectedYear(null)
    setSelectedEngine(null)
    setShowResults(false)
  }

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model)
    setSelectedYear(null)
    setSelectedEngine(null)
    setShowResults(false)
  }

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setSelectedEngine(null)
    setShowResults(false)
  }

  const handleEngineSelect = (engine: CarEngine) => {
    setSelectedEngine(engine)
    setShowResults(true)
  }

  const resetSelection = () => {
    setSelectedBrand(null)
    setSelectedModel(null)
    setSelectedYear(null)
    setSelectedEngine(null)
    setShowResults(false)
    setSearchQuery("")
  }

  const getRecommendedProducts = () => {
    if (!selectedEngine) return null

    const oilProduct = allProducts.find(p => p.id === selectedEngine.recommendedOil.productId) 
      || allProducts.find(p => p.category === "engine-oil" && p.viscosity === selectedEngine.recommendedOil.viscosity)
    
    const oilFilter = allProducts.find(p => p.category === "oil-filter" && p.badge === "Premium")
    const airFilter = allProducts.find(p => p.category === "air-filter" && p.badge === "Standard")
    const cabinFilter = allProducts.find(p => p.category === "cabin-filter" && p.badge === "Premium")

    return { oilProduct, oilFilter, airFilter, cabinFilter }
  }

  const recommendedProducts = getRecommendedProducts()

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      nameFA: product.nameFA,
      price: product.price,
      type: product.category === "engine-oil" ? "oil" : product.category,
      viscosity: product.viscosity,
      specs: product.specs ? Object.values(product.specs).join(", ") : undefined,
    })
  }

  return (
    <section id="car-finder" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.carFinder.subtitle}
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            {t.carFinder.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.carFinder.description}
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
            <Input
              type="text"
              placeholder={t.carFinder.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-14 bg-card border-border/50 text-lg ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
            />
          </div>
        </motion.div>

        {/* Selection Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Brand Select */}
            <SelectBox
              label={t.carFinder.selectBrand}
              value={selectedBrand ? (language === "fa" ? selectedBrand.nameFA : selectedBrand.name) : null}
              options={filteredBrands.map(b => ({
                id: b.id,
                label: language === "fa" ? b.nameFA : b.name,
                value: b,
              }))}
              onSelect={handleBrandSelect}
              isRTL={isRTL}
              icon={<Car className="h-4 w-4" />}
            />

            {/* Model Select */}
            <SelectBox
              label={t.carFinder.selectModel}
              value={selectedModel?.name || null}
              options={(selectedBrand?.models || []).map(m => ({
                id: m.id,
                label: m.name,
                value: m,
              }))}
              onSelect={handleModelSelect}
              disabled={!selectedBrand}
              isRTL={isRTL}
              icon={<Car className="h-4 w-4" />}
            />

            {/* Year Select */}
            <SelectBox
              label={t.carFinder.selectYear}
              value={selectedYear?.toString() || null}
              options={(selectedModel?.years || []).map(y => ({
                id: y.toString(),
                label: y.toString(),
                value: y,
              }))}
              onSelect={handleYearSelect}
              disabled={!selectedModel}
              isRTL={isRTL}
            />

            {/* Engine Select */}
            <SelectBox
              label={t.carFinder.selectEngine}
              value={selectedEngine?.name || null}
              options={(selectedModel?.engines || []).map(e => ({
                id: e.id,
                label: e.name,
                value: e,
              }))}
              onSelect={handleEngineSelect}
              disabled={!selectedYear}
              isRTL={isRTL}
            />
          </div>

          {/* Selected Car Info */}
          {selectedEngine && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl bg-card border border-border/50"
            >
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground">{t.carFinder.yourCar}</p>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedYear} {language === "fa" && selectedBrand ? selectedBrand.nameFA : selectedBrand?.name} {selectedModel?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedEngine.name} ({selectedEngine.displacement})</p>
                </div>
              </div>
            </motion.div>
          )}

          {selectedBrand && (
            <div className="text-center mb-8">
              <Button variant="outline" onClick={resetSelection}>
                {t.common.cancel}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && selectedEngine && recommendedProducts && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                {t.carFinder.recommended}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Engine Oil */}
                {recommendedProducts.oilProduct && (
                  <ProductRecommendationCard
                    icon={<Droplet className="h-5 w-5" />}
                    title={t.carFinder.engineOil}
                    product={recommendedProducts.oilProduct}
                    specs={{
                      [t.carFinder.viscosity]: selectedEngine.recommendedOil.viscosity,
                      [t.carFinder.capacity]: selectedEngine.recommendedOil.capacity,
                      [t.carFinder.specification]: selectedEngine.recommendedOil.specification,
                    }}
                    onAddToCart={() => handleAddToCart(recommendedProducts.oilProduct!)}
                    language={language}
                    t={t}
                    isRTL={isRTL}
                  />
                )}

                {/* Oil Filter */}
                {recommendedProducts.oilFilter && (
                  <ProductRecommendationCard
                    icon={<Filter className="h-5 w-5" />}
                    title={t.carFinder.oilFilter}
                    product={recommendedProducts.oilFilter}
                    specs={{
                      "Part #": selectedEngine.recommendedFilters.oilFilter.partNumber,
                    }}
                    onAddToCart={() => handleAddToCart(recommendedProducts.oilFilter!)}
                    language={language}
                    t={t}
                    isRTL={isRTL}
                  />
                )}

                {/* Air Filter */}
                {recommendedProducts.airFilter && (
                  <ProductRecommendationCard
                    icon={<Wind className="h-5 w-5" />}
                    title={t.carFinder.airFilter}
                    product={recommendedProducts.airFilter}
                    specs={{
                      "Part #": selectedEngine.recommendedFilters.airFilter.partNumber,
                    }}
                    onAddToCart={() => handleAddToCart(recommendedProducts.airFilter!)}
                    language={language}
                    t={t}
                    isRTL={isRTL}
                  />
                )}

                {/* Cabin Filter */}
                {recommendedProducts.cabinFilter && (
                  <ProductRecommendationCard
                    icon={<Wind className="h-5 w-5" />}
                    title={t.carFinder.cabinFilter}
                    product={recommendedProducts.cabinFilter}
                    specs={{
                      "Part #": selectedEngine.recommendedFilters.cabinFilter.partNumber,
                    }}
                    onAddToCart={() => handleAddToCart(recommendedProducts.cabinFilter!)}
                    language={language}
                    t={t}
                    isRTL={isRTL}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Select Box Component
function SelectBox<T>({
  label,
  value,
  options,
  onSelect,
  disabled = false,
  isRTL,
  icon,
}: {
  label: string
  value: string | null
  options: { id: string; label: string; value: T }[]
  onSelect: (value: T) => void
  disabled?: boolean
  isRTL: boolean
  icon?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full h-14 px-4 rounded-xl bg-card border border-border/50 flex items-center justify-between gap-2 transition-all ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-primary/50 cursor-pointer"
        } ${isOpen ? "border-primary" : ""}`}
      >
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className={value ? "text-foreground font-medium" : "text-muted-foreground"}>
            {value || label}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && options.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl z-50 max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors ${
                  value === option.label ? "bg-primary/10" : ""
                } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <span className="text-foreground">{option.label}</span>
                {value === option.label && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Product Recommendation Card
function ProductRecommendationCard({
  icon,
  title,
  product,
  specs,
  onAddToCart,
  language,
  t,
  isRTL,
}: {
  icon: React.ReactNode
  title: string
  product: typeof allProducts[0]
  specs: Record<string, string>
  onAddToCart: () => void
  language: string
  t: typeof import("@/lib/translations").translations.en
  isRTL: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all group"
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            {icon}
          </div>
          <span className="font-semibold text-foreground">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className={`font-bold text-foreground mb-1 ${isRTL ? 'text-right' : ''}`}>
          {language === "fa" ? product.nameFA : product.name}
        </h4>
        <p className={`text-xs text-muted-foreground mb-3 line-clamp-2 ${isRTL ? 'text-right' : ''}`}>
          {language === "fa" ? product.descriptionFA : product.description}
        </p>

        {/* Specs */}
        <div className="space-y-1 mb-4">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className={`flex items-center justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{key}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className={`flex items-center justify-between pt-3 border-t border-border/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : ''}>
            <span className="text-lg font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className={`text-xs text-muted-foreground line-through ${isRTL ? 'mr-2' : 'ml-2'}`}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={onAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
