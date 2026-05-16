"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CreditCard, Lock, Check, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { t, language, isRTL } = useLanguage()
  const { items, subtotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  })

  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Check className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {language === "fa" ? "سفارش شما ثبت شد!" : "Order Confirmed!"}
              </h1>
              <p className="text-muted-foreground mb-8">
                {language === "fa"
                  ? "از خرید شما متشکریم. تأییدیه سفارش به ایمیل شما ارسال خواهد شد."
                  : "Thank you for your purchase. An order confirmation has been sent to your email."}
              </p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t.cart.continueShopping}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-foreground mb-4">{t.cart.empty}</h1>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t.cart.continueShopping}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href="/cart"
              className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="h-4 w-4" />
              {t.checkout.backToCart}
            </Link>
            <h1 className={`text-4xl font-bold text-foreground ${isRTL ? 'text-right' : ''}`}>
              {t.checkout.title}
            </h1>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className={`grid lg:grid-cols-3 gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
              {/* Checkout Form */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Contact Information */}
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h2 className={`text-xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
                    {t.checkout.contact}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.phone}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <h2 className={`text-xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
                    {t.checkout.shipping}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.firstName}
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.lastName}
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="address" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.address}
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.city}
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.state}
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.postalCode}
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.country}
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h2 className="text-xl font-bold text-foreground">
                      {t.checkout.payment}
                    </h2>
                    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Lock className="h-4 w-4" />
                      {t.checkout.securePayment}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="cardName" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.cardName}
                      </Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="cardNumber" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.cardNumber}
                      </Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className={`h-12 bg-background ${isRTL ? 'text-right pr-12' : 'pl-12'}`}
                        />
                        <CreditCard className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.expiry}
                      </Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className={isRTL ? 'text-right block' : ''}>
                        {t.checkout.cvv}
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className={`h-12 bg-background ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                    <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                      {t.checkout.secureDesc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-28">
                  <h2 className={`text-xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
                    {t.checkout.orderSummary}
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center shrink-0">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                          <p className="font-medium text-foreground text-sm truncate">
                            {language === "fa" ? item.nameFA : item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t.cart.quantity}: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-4 space-y-3">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">{t.cart.subtotal}</span>
                      <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">{t.cart.shipping}</span>
                      <span className="font-semibold text-foreground">
                        {shipping === 0 ? t.cart.free : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">{t.cart.tax}</span>
                      <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border/50 pt-3">
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-lg font-bold text-foreground">{t.cart.total}</span>
                        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                  >
                    {isProcessing ? t.checkout.processing : t.checkout.placeOrder}
                  </Button>
                </div>
              </motion.div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
