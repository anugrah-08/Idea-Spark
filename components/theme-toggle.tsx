"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-secondary/80">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    // Force immediate DOM update
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="hover-glow glow-purple hover:bg-secondary/80 transition-all duration-300 relative"
      >
        {theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
