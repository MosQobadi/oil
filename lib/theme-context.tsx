"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "dark" | "light"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  // Initial mount - set theme from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem("apex-theme") as Theme | null
    const initialTheme = saved && (saved === "dark" || saved === "light") ? saved : "dark"
    setThemeState(initialTheme)
    
    // Apply immediately to prevent flash
    const root = document.documentElement
    root.classList.remove("dark", "light")
    root.classList.add(initialTheme)
    
    setMounted(true)
  }, [])

  // Theme change effect
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      root.classList.remove("dark", "light")
      root.classList.add(theme)
      localStorage.setItem("apex-theme", theme)
    }
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState(prev => prev === "dark" ? "light" : "dark")
  }

  // Return children with initial theme class to prevent hydration mismatch
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
