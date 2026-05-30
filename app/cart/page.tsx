"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { t, language, isRTL } = useLanguage();
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
              {t.cart.subtitle}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              {t.cart.title}
            </h1>
          </motion.div>

          {items.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.cart.empty}
              </h2>
              <p className="text-muted-foreground mb-8">{t.cart.emptyDesc}</p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t.cart.continueShopping}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div
              className={`grid lg:grid-cols-3 gap-8 ${isRTL ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2"
              >
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  {/* Header */}
                  <div
                    className={`px-6 py-4 border-b border-border/50 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">
                      {items.length} {t.cart.items}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-border/30">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-6 flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center shrink-0">
                          <div className="w-14 h-20 bg-gradient-to-b from-secondary via-card to-secondary rounded-lg border border-border/30 flex flex-col items-center justify-center">
                            <span className="text-primary text-[10px] font-bold">
                              TOP OIL
                            </span>
                            {item.viscosity && (
                              <span className="text-[8px] text-foreground font-medium mt-0.5">
                                {item.viscosity}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                          <h3 className="font-bold text-foreground mb-1">
                            {language === "fa" ? item.nameFA : item.name}
                          </h3>
                          {item.specs && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.specs}
                            </p>
                          )}
                          <p className="text-lg font-bold text-primary">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity & Actions */}
                        <div
                          className={`flex flex-col items-end justify-between ${isRTL ? "items-start" : ""}`}
                        >
                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                          {/* Quantity */}
                          <div
                            className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                          >
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className={`mt-6 ${isRTL ? "text-right" : ""}`}>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      className={`gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      {t.cart.continueShopping}
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-28">
                  <h2
                    className={`text-xl font-bold text-foreground mb-6 ${isRTL ? "text-right" : ""}`}
                  >
                    {t.checkout.orderSummary}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-muted-foreground">
                        {t.cart.subtotal}
                      </span>
                      <span className="font-semibold text-foreground">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-muted-foreground">
                        {t.cart.shipping}
                      </span>
                      <span className="font-semibold text-foreground">
                        {shipping === 0
                          ? t.cart.free
                          : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-muted-foreground">
                        {t.cart.tax}
                      </span>
                      <span className="font-semibold text-foreground">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border/50 pt-4">
                      <div
                        className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <span className="text-lg font-bold text-foreground">
                          {t.cart.total}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {shipping === 0 && (
                    <div className="bg-primary/10 rounded-lg p-3 mb-6">
                      <p
                        className={`text-sm text-primary font-medium ${isRTL ? "text-right" : ""}`}
                      >
                        {language === "fa"
                          ? "ارسال رایگان برای سفارش‌های بالای $99"
                          : "Free shipping on orders over $99"}
                      </p>
                    </div>
                  )}

                  <Link href="/checkout">
                    <Button
                      className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      {t.cart.checkout}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
