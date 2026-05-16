"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  const { t, isRTL } = useLanguage()

  const footerLinks = {
    products: [
      { name: t.footer.fullSynthetic, href: "/products" },
      { name: t.footer.racingFormula, href: "/products" },
      { name: t.footer.highMileage, href: "/products" },
      { name: t.footer.dieselOils, href: "/products" },
      { name: t.footer.motorcycleOils, href: "/products" },
    ],
    company: [
      { name: t.footer.aboutUs, href: "#" },
      { name: t.footer.careers, href: "#" },
      { name: t.footer.press, href: "#" },
      { name: t.footer.partnerships, href: "#" },
      { name: t.footer.sustainability, href: "#" },
    ],
    support: [
      { name: t.footer.helpCenter, href: "#" },
      { name: t.footer.contactUs, href: "#" },
      { name: t.footer.shippingInfo, href: "#" },
      { name: t.footer.returns, href: "#" },
      { name: t.footer.trackOrder, href: "#" },
    ],
    resources: [
      { name: t.footer.oilFinder, href: "#car-finder" },
      { name: t.footer.techSpecs, href: "#" },
      { name: t.footer.blog, href: "#" },
      { name: t.footer.videoGuides, href: "#" },
      { name: t.footer.faqs, href: "#faq" },
    ],
  }

  return (
    <footer className="relative bg-card/50 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link href="/" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  APEX<span className="text-primary">OIL</span>
                </span>
              </Link>
            </motion.div>
            <p className={`text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs ${isRTL ? 'text-right' : ''}`}>
              {t.footer.description}
            </p>
            
            {/* Contact Info */}
            <div className={`space-y-3 text-sm text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
              <a href="mailto:support@apexoil.com" className={`flex items-center gap-3 hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="h-4 w-4 text-primary" />
                support@apexoil.com
              </a>
              <a href="tel:1-800-APEX-OIL" className={`flex items-center gap-3 hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="h-4 w-4 text-primary" />
                1-800-APEX-OIL
              </a>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-4 w-4 text-primary" />
                Munich, Germany
              </div>
            </div>

            {/* Social Links */}
            <div className={`flex gap-4 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className={`font-semibold text-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>{t.footer.products}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name} className={isRTL ? 'text-right' : ''}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold text-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name} className={isRTL ? 'text-right' : ''}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold text-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>{t.footer.support}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name} className={isRTL ? 'text-right' : ''}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold text-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>{t.footer.resources}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name} className={isRTL ? 'text-right' : ''}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`py-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
          <div className={`flex flex-wrap items-center gap-6 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="#" className="hover:text-foreground transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t.footer.terms}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t.footer.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
