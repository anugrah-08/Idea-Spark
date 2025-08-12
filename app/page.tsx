"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { KeywordsPanel } from "@/components/keywords-panel"
import { IdeasGrid } from "@/components/ideas-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [currentNiche, setCurrentNiche] = useState("")
  const [currentContentType, setCurrentContentType] = useState("")

  const handleGenerateIdeas = async (niche: string, contentType: string) => {
    setIsLoading(true)
    setCurrentNiche(niche)
    setCurrentContentType(contentType)

    // Simulate API call with 2-3 second delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setIsLoading(false)
    setHasGenerated(true)

    // Smooth scroll to results section
    setTimeout(() => {
      const resultsSection = document.getElementById("results-section")
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const handleRegenerate = () => {
    // Trigger regeneration (in a real app, this would call the API again)
    console.log("Regenerating ideas for:", currentNiche, currentContentType)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onGenerateIdeas={handleGenerateIdeas} isLoading={isLoading} />

        {hasGenerated && (
          <div id="results-section">
            <KeywordsPanel niche={currentNiche} />
            <IdeasGrid niche={currentNiche} contentType={currentContentType} onRegenerate={handleRegenerate} />
          </div>
        )}
      </main>
      {/* Added footer component */}
      <Footer />
    </div>
  )
}
