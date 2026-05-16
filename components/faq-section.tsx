"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What makes APEX oil different from other synthetic oils?",
    answer: "APEX uses proprietary molecular technology developed over 40 years of R&D. Our unique additive package provides 45% better wear protection than industry standards, while our synthetic base oils maintain viscosity across a wider temperature range than any competitor.",
  },
  {
    question: "How often should I change APEX oil?",
    answer: "For most vehicles using APEX synthetic oil, we recommend oil changes every 10,000-15,000 miles or 12 months, whichever comes first. However, if you drive in severe conditions (extreme temperatures, towing, track use), consider changing at 7,500 miles.",
  },
  {
    question: "Is APEX compatible with my vehicle?",
    answer: "APEX oils meet or exceed specifications from all major manufacturers including BMW, Mercedes-Benz, Porsche, Volkswagen, Audi, Ferrari, Ford, GM, Toyota, and more. Check our product pages for specific approvals, or contact our support team for personalized recommendations.",
  },
  {
    question: "Can I mix APEX with my current oil?",
    answer: "Yes, APEX synthetic oils are fully compatible with other synthetic and conventional oils. However, for optimal performance, we recommend a complete drain and fill. Mixing oils may dilute the advanced additives that make APEX superior.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to over 60 countries worldwide. Free shipping is available on orders over $150 for most international destinations. Express shipping options are available at checkout. Delivery typically takes 3-7 business days depending on location.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 100% satisfaction guarantee. If you&apos;re not completely satisfied with your purchase, return it within 30 days for a full refund—no questions asked. We&apos;ll even cover return shipping for defective products.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Common Questions
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to know about APEX engine oils.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`rounded-xl border transition-all duration-300 ${
                  openIndex === index
                    ? "border-primary/50 bg-card"
                    : "border-border/50 bg-card/30 hover:bg-card/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-foreground pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`h-5 w-5 ${openIndex === index ? "text-primary" : "text-muted-foreground"}`} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
