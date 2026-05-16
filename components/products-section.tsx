"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Star, Flame, Snowflake, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"

const products = [
  {
    id: "apex-pro-racing",
    name: "APEX Pro Racing",
    nameFA: "APEX پرو ریسینگ",
    viscosity: "5W-40",
    type: "Full Synthetic",
    typeFA: "فول سینتتیک",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviews: 2847,
    badge: "Best Seller",
    badgeFA: "پرفروش",
    features: ["Track Proven", "High Performance"],
    featuresFA: ["تست شده در پیست", "عملکرد بالا"],
    icon: Flame,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    id: "apex-elite-gt",
    name: "APEX Elite GT",
    nameFA: "APEX الیت GT",
    viscosity: "0W-20",
    type: "Full Synthetic",
    typeFA: "فول سینتتیک",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 1923,
    badge: "Eco Choice",
    badgeFA: "انتخاب اقتصادی",
    features: ["Fuel Economy", "Low Emissions"],
    featuresFA: ["صرفه‌جویی سوخت", "آلایندگی کم"],
    icon: Zap,
    gradient: "from-accent/20 to-accent/5",
  },
  {
    id: "apex-extreme",
    name: "APEX Extreme",
    nameFA: "APEX اکستریم",
    viscosity: "10W-60",
    type: "Racing Formula",
    typeFA: "فرمول مسابقه",
    price: 129.99,
    originalPrice: 159.99,
    rating: 5.0,
    reviews: 987,
    badge: "Premium",
    badgeFA: "ممتاز",
    features: ["Extreme Heat", "Motorsport Grade"],
    featuresFA: ["گرمای شدید", "درجه موتوراسپرت"],
    icon: Flame,
    gradient: "from-primary/30 to-primary/10",
  },
  {
    id: "apex-winter-guard",
    name: "APEX Winter Guard",
    nameFA: "APEX وینتر گارد",
    viscosity: "0W-40",
    type: "Full Synthetic",
    typeFA: "فول سینتتیک",
    price: 74.99,
    originalPrice: 94.99,
    rating: 4.7,
    reviews: 1456,
    badge: "Cold Climate",
    badgeFA: "آب و هوای سرد",
    features: ["Arctic Tested", "Quick Start"],
    featuresFA: ["تست قطب شمال", "استارت سریع"],
    icon: Snowflake,
    gradient: "from-blue-500/20 to-blue-500/5",
  },
]

export function ProductsSection() {
  const { t, language, isRTL } = useLanguage()
  const { addItem } = useCart()

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      nameFA: product.nameFA,
      price: product.price,
      type: "oil",
      viscosity: product.viscosity,
    })
  }

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

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                {/* Badge */}
                <div className={`absolute top-4 z-10 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full">
                    {language === "fa" ? product.badgeFA : product.badge}
                  </span>
                </div>

                {/* Product Image Area */}
                <div className={`relative h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    {/* Simplified bottle */}
                    <div className="w-24 h-32 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-card to-secondary rounded-xl border border-border/30">
                        <div className="absolute inset-x-2 top-8 bottom-8 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex flex-col items-center justify-center">
                          <div className="text-primary font-bold text-sm">APEX</div>
                          <div className="text-foreground font-bold text-xs mt-1">{product.viscosity}</div>
                        </div>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-4 bg-muted rounded-t-md" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating icon */}
                  <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                    <product.icon className="h-6 w-6 text-primary/50" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
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

                  <h3 className={`text-lg font-bold text-foreground group-hover:text-primary transition-colors ${isRTL ? 'text-right' : ''}`}>
                    {language === "fa" ? product.nameFA : product.name}
                  </h3>
                  
                  <p className={`text-sm text-muted-foreground mt-1 ${isRTL ? 'text-right' : ''}`}>
                    {product.viscosity} • {language === "fa" ? product.typeFA : product.type}
                  </p>

                  <div className={`flex flex-wrap gap-1.5 mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {(language === "fa" ? product.featuresFA : product.features).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-0.5 text-[10px] font-medium bg-secondary text-muted-foreground rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className={`flex items-center justify-between mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : ''}>
                      <span className="text-2xl font-bold text-foreground">
                        ${product.price}
                      </span>
                      <span className={`text-sm text-muted-foreground line-through ${isRTL ? 'mr-2' : 'ml-2'}`}>
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group/btn ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <ShoppingCart className={`h-4 w-4 group-hover/btn:scale-110 transition-transform ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t.products.addToCart}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
  )
}
