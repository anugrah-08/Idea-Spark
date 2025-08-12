"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Video, Download, RefreshCw, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

interface ContentIdea {
  id: number
  title: string
  description: string
  suggestedKeyword: string
  type: "blog" | "video" | "both"
}

interface IdeasGridProps {
  niche: string
  contentType: string
  onRegenerate: () => void
}

export function IdeasGrid({ niche, contentType, onRegenerate }: IdeasGridProps) {
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger animation for idea cards fade in + upward motion with stagger
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".idea-card")
            gsap.fromTo(
              cards,
              {
                y: 60,
                opacity: 0,
                scale: 0.9,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: gridRef.current,
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

  // Generate mock content ideas based on niche and content type
  const generateMockIdeas = (niche: string, contentType: string): ContentIdea[] => {
    const blogIdeas = [
      {
        id: 1,
        title: `10 Essential ${niche} Tips for Beginners`,
        description: `A comprehensive guide covering the fundamental concepts and practical tips that newcomers to ${niche} need to know to get started successfully.`,
        suggestedKeyword: `${niche} tips for beginners`,
        type: "blog" as const,
      },
      {
        id: 2,
        title: `The Ultimate ${niche} Mistakes to Avoid`,
        description: `Learn from common pitfalls and mistakes that people make when starting their ${niche} journey, and how to avoid them.`,
        suggestedKeyword: `${niche} mistakes to avoid`,
        type: "blog" as const,
      },
      {
        id: 3,
        title: `Best ${niche} Tools and Resources in 2024`,
        description: `A curated list of the most effective tools, apps, and resources that can help you excel in ${niche}.`,
        suggestedKeyword: `best ${niche} tools 2024`,
        type: "blog" as const,
      },
      {
        id: 4,
        title: `How to Master ${niche} in 30 Days`,
        description: `A step-by-step roadmap and daily action plan to help you develop strong ${niche} skills in just one month.`,
        suggestedKeyword: `learn ${niche} in 30 days`,
        type: "blog" as const,
      },
      {
        id: 5,
        title: `${niche} Trends That Will Dominate This Year`,
        description: `Explore the latest trends, innovations, and developments in ${niche} that you should be aware of.`,
        suggestedKeyword: `${niche} trends 2024`,
        type: "blog" as const,
      },
    ]

    const videoIdeas = [
      {
        id: 6,
        title: `${niche} Explained in 5 Minutes`,
        description: `A quick, engaging video that breaks down the core concepts of ${niche} in an easy-to-understand format.`,
        suggestedKeyword: `${niche} explained simply`,
        type: "video" as const,
      },
      {
        id: 7,
        title: `My ${niche} Journey: Before vs After`,
        description: `Share your personal transformation story and the results you've achieved through ${niche}.`,
        suggestedKeyword: `${niche} transformation story`,
        type: "video" as const,
      },
      {
        id: 8,
        title: `${niche} Challenge: 7 Days of Progress`,
        description: `Document a week-long challenge where you focus intensively on ${niche} and share daily updates.`,
        suggestedKeyword: `${niche} 7 day challenge`,
        type: "video" as const,
      },
      {
        id: 9,
        title: `Reacting to ${niche} Myths and Facts`,
        description: `Create an entertaining reaction video where you debunk common myths and confirm facts about ${niche}.`,
        suggestedKeyword: `${niche} myths vs facts`,
        type: "video" as const,
      },
      {
        id: 10,
        title: `${niche} Q&A: Your Questions Answered`,
        description: `Answer the most frequently asked questions about ${niche} from your audience in an engaging format.`,
        suggestedKeyword: `${niche} questions answered`,
        type: "video" as const,
      },
    ]

    if (contentType === "blog") return blogIdeas
    if (contentType === "video") return videoIdeas
    return [...blogIdeas, ...videoIdeas]
  }

  const ideas = generateMockIdeas(niche, contentType)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRegenerating(false)
    onRegenerate()
  }

  const handleExport = async () => {
    setIsExporting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExporting(false)
    alert("Ideas exported successfully! (This is a demo - no actual file was created)")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "blog":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "video":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold gradient-text-pink-orange mb-4">Your Content Ideas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-generated {contentType === "both" ? "blog and video" : contentType} ideas for "{niche}"
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              variant="outline"
              size="lg"
              className="hover-glow glow-purple border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 bg-transparent"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate Ideas
                </>
              )}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              size="lg"
              className="gradient-pink-orange hover-glow glow-pink transition-all duration-300"
            >
              {isExporting ? (
                <>
                  <Download className="mr-2 h-4 w-4 animate-pulse" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export to Google Docs
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Ideas Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              className="idea-card"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="group bg-card/50 backdrop-blur border-border/50 hover:border-purple-500/30 hover:bg-card/70 transition-all duration-300 hover-glow glow-purple h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Badge variant="outline" className={getTypeColor(idea.type)}>
                        {getTypeIcon(idea.type)}
                        <span className="ml-1 capitalize">{idea.type}</span>
                      </Badge>
                    </motion.div>
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:gradient-text-purple-blue transition-all duration-300">
                    {idea.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{idea.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-foreground/80">Suggested Keyword:</div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge variant="secondary" className="text-xs bg-muted/50">
                        {idea.suggestedKeyword}
                      </Badge>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-2xl font-bold gradient-text-purple-blue mb-2">{ideas.length}</div>
            <div className="text-sm text-muted-foreground">Creative ideas generated for your {niche} content</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
