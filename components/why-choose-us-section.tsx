"use client"

import { motion } from "framer-motion"
import { Award, Beaker, Factory, Truck, Shield, Headphones } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "OEM Approved",
    description: "Meets and exceeds specifications from BMW, Mercedes, Porsche, Ferrari, and more.",
  },
  {
    icon: Beaker,
    title: "Advanced R&D",
    description: "Over $50M invested annually in research and molecular engineering innovation.",
  },
  {
    icon: Factory,
    title: "Made in Germany",
    description: "Manufactured in state-of-the-art facilities with ISO 9001:2015 certification.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free express delivery on orders over $75. Same-day dispatch available.",
  },
  {
    icon: Shield,
    title: "100% Guarantee",
    description: "Not satisfied? Full refund within 30 days, no questions asked.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "ASE-certified technicians available 24/7 to answer your questions.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
              The APEX
              <span className="block text-primary">Difference</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              For over 40 years, APEX has been the trusted choice of professional racing teams, 
              luxury automakers, and discerning drivers who demand nothing but the best for their engines.
            </p>

            {/* Feature image placeholder */}
            <div className="mt-10 relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary border border-border/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-medium">40+ Years of Excellence</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent/5 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right - Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    <reason.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
