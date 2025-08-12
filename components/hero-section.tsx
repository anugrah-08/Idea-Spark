"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface HeroSectionProps {
  onGenerateIdeas: (niche: string, contentType: string) => void
  isLoading: boolean
}

export function HeroSection({ onGenerateIdeas, isLoading }: HeroSectionProps) {
  const [niche, setNiche] = useState("")
  const [contentType, setContentType] = useState("both")
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger animation for form fade up with scale
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          if (formRef.current) {
            gsap.fromTo(
              formRef.current,
              {
                y: 50,
                opacity: 0,
                scale: 0.95,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: formRef.current,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          }
        })
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (niche.trim()) {
      onGenerateIdeas(niche.trim(), contentType)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          src="https://my.spline.design/squarechipsfallinginplace-BRxFK3UXdY6yZRDhhS9UhowO/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full object-cover"
          title="3D Background Animation"
          style={{
            filter: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Title with enhanced animations */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <motion.span
                className="gradient-text-purple-blue"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                Spark Your
              </motion.span>
              <br />
              <motion.span
                className="gradient-text-pink-orange"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              >
                Creative Ideas
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Generate unlimited blog and video ideas for your niche with AI-powered creativity
            </motion.p>
          </motion.div>

          {/* Form Section with GSAP animation */}
          <motion.div
            ref={formRef}
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Niche Input */}
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="niche" className="text-lg font-medium text-left block text-white">
                  What's your niche or topic?
                </Label>
                <Input
                  id="niche"
                  type="text"
                  placeholder="e.g., Fitness for beginners, Tech gadgets, Cooking recipes..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="h-14 text-lg px-6 bg-black/60 backdrop-blur border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder:text-white/60"
                  disabled={isLoading}
                />
              </motion.div>

              {/* Content Type Selector */}
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="content-type" className="text-lg font-medium text-left block text-white">
                  Content type
                </Label>
                <Select value={contentType} onValueChange={setContentType} disabled={isLoading}>
                  <SelectTrigger className="h-14 text-lg px-6 bg-black/60 backdrop-blur border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="blog">Blog Ideas</SelectItem>
                    <SelectItem value="video">Video Ideas</SelectItem>
                    <SelectItem value="both">Both Blog & Video</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Generate Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={!niche.trim() || isLoading}
                  className="w-full h-14 text-lg font-semibold gradient-purple-blue hover-glow glow-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Ideas
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Additional CTA */}
            <motion.p
              className="text-sm text-white/70 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Get 10 unique content ideas with keyword suggestions in seconds
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
