"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Moon,
  Shield,
  ShoppingCart,
  Sun,
  UserCircle,
  X,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: t.nav.products, href: "/products" },
    { name: t.nav.carFinder, href: "#car-finder" },
    { name: t.nav.benefits, href: "#benefits" },
    { name: t.nav.whyUs, href: "#why-us" },
    { name: t.nav.reviews, href: "#reviews" },
    { name: t.nav.faq, href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);

    const handlePopState = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fa" : "en");
  };

  const handleLogout = async () => {
    await logout();
    if (pathname.startsWith("/admin")) {
      router.push("/");
    }
  };

  const profileName = user?.name?.trim() || user?.email || t.account.customer;
  const accountRole = user?.isAdmin ? t.account.admin : t.account.customer;

  const renderAccountMenu = () =>
    user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`h-10 gap-2 px-2 text-muted-foreground hover:text-foreground sm:px-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
            title={t.account.profile}
          >
            <UserCircle className="h-5 w-5" />
            <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
              {t.account.profile}
            </span>
            <ChevronDown className="hidden h-4 w-4 sm:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isRTL ? "start" : "end"}
          sideOffset={10}
          className={`w-[min(calc(100vw-2rem),22rem)] p-2 ${
            isRTL ? "text-right" : ""
          }`}
        >
          <DropdownMenuLabel className="px-3 py-3">
            <div className="space-y-1">
              <p className="text-xs font-normal text-muted-foreground">
                {t.account.signedInAs}
              </p>
              <p className="truncate text-base font-semibold text-foreground">
                {profileName}
              </p>
              <div
                className={`flex items-center gap-2 text-sm font-normal text-muted-foreground ${
                  isRTL ? "flex-row-reverse justify-end" : ""
                }`}
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <p className="text-xs font-normal text-primary">{accountRole}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.isAdmin && (
            <DropdownMenuItem
              className={`min-h-11 cursor-pointer px-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
              onSelect={() => router.push("/admin")}
            >
              <Shield className="h-4 w-4" />
              {t.account.adminPanel}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className={`min-h-11 cursor-pointer px-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
            onSelect={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {t.account.logout}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link href="/auth">
        <Button
          variant="ghost"
          className={`h-10 gap-2 px-2 text-muted-foreground hover:text-foreground sm:px-3 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
          title={t.account.login}
        >
          <LogIn className="h-5 w-5" />
          <span className="hidden text-sm font-medium sm:inline">
            {t.account.login}
          </span>
        </Button>
      </Link>
    );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">
                      A
                    </span>
                  </div>
                  <div className="absolute -inset-1 rounded-lg bg-primary/20 blur-md -z-10" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  APEX<span className="text-primary">OIL</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div
              className={`hidden lg:flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ y: -2 }}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div
              className={`hidden md:flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-foreground"
                title={language === "en" ? "فارسی" : "English"}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {renderAccountMenu()}

              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
                  {t.nav.shopNow}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="text-muted-foreground"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              {renderAccountMenu()}
              <button
                className="text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-semibold text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg">
                    {t.nav.shopNow}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
