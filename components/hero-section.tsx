"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              <span className="block">{t.hero.title1}</span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed ${isRTL ? 'mx-auto lg:mr-0' : 'mx-auto lg:mx-0'}`}
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`mt-10 flex flex-col sm:flex-row gap-4 ${isRTL ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className={`bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {t.hero.shopCollection}
                  <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className={`border-border/50 hover:bg-secondary/50 text-foreground font-semibold px-8 py-6 text-base group ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Play className={`h-4 w-4 group-hover:scale-110 transition-transform ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.hero.watchStory}
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className={`mt-12 flex items-center gap-8 ${isRTL ? 'justify-center lg:justify-end flex-row-reverse' : 'justify-center lg:justify-start'}`}
            >
              <div className={`flex ${isRTL ? '-space-x-reverse -space-x-3' : '-space-x-3'}`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{t.hero.reviews}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 rounded-full blur-3xl" />
              
              {/* Product container */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Oil bottle representation */}
                  <div className="w-64 h-80 relative">
                    {/* Bottle body */}
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary via-card to-secondary rounded-3xl border border-border/50 overflow-hidden">
                      {/* Label area */}
                      <div className="absolute inset-x-4 top-16 bottom-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/30 flex flex-col items-center justify-center p-4">
                        <div className="text-primary font-bold text-3xl tracking-tighter">APEX</div>
                        <div className="text-muted-foreground text-xs tracking-widest mt-1">SYNTHETIC</div>
                        <div className="w-16 h-0.5 bg-primary/50 mt-3 mb-3" />
                        <div className="text-foreground font-bold text-lg">5W-40</div>
                        <div className="text-muted-foreground text-[10px] tracking-wider mt-1">FULL SYNTHETIC</div>
                      </div>
                      {/* Cap */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-muted to-secondary rounded-t-lg border border-border/50" />
                    </div>
                    
                    {/* Reflection */}
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/5 to-transparent rounded-3xl" />
                  </div>

                  {/* Floating specs */}
                  <motion.div
                    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className={`absolute top-1/4 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 ${isRTL ? '-left-20' : '-right-20'}`}
                  >
                    <div className="text-xs text-muted-foreground">Viscosity</div>
                    <div className="text-sm font-bold text-foreground">5W-40</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                    className={`absolute top-1/2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 ${isRTL ? '-right-16' : '-left-16'}`}
                  >
                    <div className="text-xs text-muted-foreground">Protection</div>
                    <div className="text-sm font-bold text-primary">+45%</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                    className={`absolute bottom-1/4 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 ${isRTL ? '-left-12' : '-right-12'}`}
                  >
                    <div className="text-xs text-muted-foreground">API Rating</div>
                    <div className="text-sm font-bold text-foreground">SN Plus</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-wider">{t.hero.scroll}</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
