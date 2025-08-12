"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Header() {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger animation for header fade in from top
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          if (headerRef.current) {
            gsap.fromTo(
              headerRef.current,
              {
                y: -100,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              },
            )
          }
        })
      })
    }
  }, [])

  return (
    <motion.header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-purple-blue">
              <span className="text-lg font-bold text-white">I</span>
            </div>
            <span className="text-xl font-bold gradient-text-purple-blue">IdeaSpark</span>
          </Link>
        </motion.div>

        {/* Navigation - Centered navigation for better balance */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Pricing", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:gradient-text-purple-blue"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right side actions - Removed ThemeToggle, kept only user profile */}
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover-glow glow-pink hover:bg-secondary/80 transition-all duration-300"
            >
              <User className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">User profile</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
