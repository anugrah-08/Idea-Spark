"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Target, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

interface KeywordData {
  keyword: string
  searchVolume: number
  competition: "Low" | "Medium" | "High"
  difficulty: number
}

interface KeywordsPanelProps {
  niche: string
}

export function KeywordsPanel({ niche }: KeywordsPanelProps) {
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger animation for table slide in from left with staggered rows
    if (typeof window !== "undefined") {
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)

          if (tableRef.current) {
            // Animate the entire table container
            gsap.fromTo(
              tableRef.current,
              {
                x: -100,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: tableRef.current,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              },
            )

            // Stagger animation for table rows
            const rows = tableRef.current.querySelectorAll("tbody tr")
            gsap.fromTo(
              rows,
              {
                x: -50,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: tableRef.current,
                  start: "top 70%",
                  end: "bottom 30%",
                  toggleActions: "play none none reverse",
                },
                delay: 0.3,
              },
            )
          }
        })
      })
    }
  }, [])

  // Generate mock keyword data based on niche
  const generateMockKeywords = (niche: string): KeywordData[] => {
    const baseKeywords = [
      { keyword: `${niche} tips`, searchVolume: 8900, competition: "Medium" as const, difficulty: 45 },
      { keyword: `best ${niche}`, searchVolume: 12400, competition: "High" as const, difficulty: 67 },
      { keyword: `${niche} guide`, searchVolume: 6700, competition: "Low" as const, difficulty: 32 },
      { keyword: `${niche} for beginners`, searchVolume: 5200, competition: "Low" as const, difficulty: 28 },
      { keyword: `how to ${niche}`, searchVolume: 15600, competition: "High" as const, difficulty: 72 },
      { keyword: `${niche} mistakes`, searchVolume: 3400, competition: "Low" as const, difficulty: 25 },
      { keyword: `${niche} tools`, searchVolume: 7800, competition: "Medium" as const, difficulty: 52 },
      { keyword: `${niche} trends`, searchVolume: 4100, competition: "Medium" as const, difficulty: 41 },
    ]
    return baseKeywords
  }

  const keywords = generateMockKeywords(niche)

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case "Low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "High":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-green-500"
    if (difficulty < 60) return "text-yellow-500"
    return "text-red-500"
  }

  const formatSearchVolume = (volume: number) => {
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  return (
    <section className="py-16 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <CardTitle className="flex items-center gap-2 text-2xl gradient-text-purple-blue">
                  <BarChart3 className="h-6 w-6" />
                  Keyword Research
                </CardTitle>
                <p className="text-muted-foreground">Discover high-potential keywords for your "{niche}" content</p>
              </motion.div>
            </CardHeader>
            <CardContent>
              <div ref={tableRef} className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="font-semibold">Keyword</TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Search Volume
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Competition
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">Difficulty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywords.map((keyword, index) => (
                      <motion.tr
                        key={index}
                        className="border-border/30 hover:bg-muted/50 transition-colors"
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <TableCell className="font-medium">
                          <span className="text-foreground">{keyword.keyword}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-500">
                              {formatSearchVolume(keyword.searchVolume)}
                            </span>
                            <span className="text-xs text-muted-foreground">monthly</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getCompetitionColor(keyword.competition)}>
                            {keyword.competition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getDifficultyColor(keyword.difficulty)}`}>
                              {keyword.difficulty}
                            </span>
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${
                                  keyword.difficulty < 30
                                    ? "bg-green-500"
                                    : keyword.difficulty < 60
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${keyword.difficulty}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                viewport={{ once: true }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    value: keywords.filter((k) => k.competition === "Low").length,
                    label: "Low Competition",
                    color: "text-green-500",
                  },
                  {
                    value: formatSearchVolume(keywords.reduce((sum, k) => sum + k.searchVolume, 0)),
                    label: "Total Monthly Volume",
                    color: "text-blue-500",
                  },
                  {
                    value: Math.round(keywords.reduce((sum, k) => sum + k.difficulty, 0) / keywords.length),
                    label: "Avg. Difficulty",
                    color: "text-purple-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-muted/30 rounded-lg p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                  >
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
