"use client"

import { motion } from "framer-motion"
import { Shield, Thermometer, Droplets, Gauge, Leaf, Clock } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Superior Protection",
    description: "Advanced molecular shield technology prevents wear and tear, extending engine life by up to 40%.",
    stat: "40%",
    statLabel: "Longer Engine Life",
  },
  {
    icon: Thermometer,
    title: "Thermal Stability",
    description: "Maintains optimal viscosity from -40°C to 300°C, ensuring consistent performance in extreme conditions.",
    stat: "300°C",
    statLabel: "Heat Resistance",
  },
  {
    icon: Droplets,
    title: "Clean Engine",
    description: "Powerful detergents and dispersants keep your engine spotlessly clean, preventing sludge buildup.",
    stat: "99%",
    statLabel: "Cleaner Engine",
  },
  {
    icon: Gauge,
    title: "Maximum Power",
    description: "Reduced internal friction unlocks hidden horsepower and improves throttle response instantly.",
    stat: "+15HP",
    statLabel: "Power Gain",
  },
  {
    icon: Leaf,
    title: "Eco Performance",
    description: "Lower emissions and improved fuel efficiency help protect the environment without sacrificing power.",
    stat: "12%",
    statLabel: "Better MPG",
  },
  {
    icon: Clock,
    title: "Extended Intervals",
    description: "Premium synthetic base oils allow for longer drain intervals, saving time and money.",
    stat: "15K",
    statLabel: "Mile Intervals",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why APEX Oil</span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Engineered Excellence
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every drop of APEX oil is formulated with precision to deliver unmatched performance and protection.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 transition-all duration-500 hover:bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Stat */}
                <div className="flex items-baseline gap-2 pt-4 border-t border-border/50">
                  <span className="text-3xl font-bold text-primary">{benefit.stat}</span>
                  <span className="text-sm text-muted-foreground">{benefit.statLabel}</span>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
