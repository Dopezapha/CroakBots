"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, TrendingDown, AlertTriangle, BarChart4, Zap, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HoverMotionWrapper } from "./motion-wrapper"

type Insight = {
  id: number
  type: "bullish" | "bearish" | "neutral" | "alert"
  title: string
  description: string
  token: string
  confidence: number
  timestamp: string
}

export function AiInsightsPanel() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeInsight, setActiveInsight] = useState<Insight | null>(null)

  useEffect(() => {
    // Simulate loading AI insights
    const loadInsights = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockInsights: Insight[] = [
        {
          id: 1,
          type: "bullish",
          title: "BTC Breakout Imminent",
          description:
            "Bitcoin is showing strong bullish divergence on the 4h chart with increasing volume. Our AI models predict a 75% chance of breaking $70k resistance in the next 48 hours.",
          token: "BTC",
          confidence: 75,
          timestamp: "10 minutes ago",
        },
        {
          id: 2,
          type: "bearish",
          title: "ETH Overbought on RSI",
          description:
            "Ethereum is showing signs of exhaustion with RSI above 80 on multiple timeframes. Consider taking partial profits or setting tighter stop losses.",
          token: "ETH",
          confidence: 68,
          timestamp: "25 minutes ago",
        },
        {
          id: 3,
          type: "alert",
          title: "CROAK Whale Movement",
          description:
            "Large wallet accumulation detected for CROAK. 2.5M tokens moved from exchanges to private wallets in the last hour, suggesting potential price action.",
          token: "CROAK",
          confidence: 82,
          timestamp: "1 hour ago",
        },
        {
          id: 4,
          type: "neutral",
          title: "SOL Consolidation Phase",
          description:
            "Solana is entering a consolidation phase after recent gains. Expect sideways movement between $145-$155 for the next 24-48 hours before next directional move.",
          token: "SOL",
          confidence: 64,
          timestamp: "2 hours ago",
        },
      ]

      setInsights(mockInsights)
      setActiveInsight(mockInsights[0])
      setIsLoading(false)
    }

    loadInsights()
  }, [])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-emerald-400" />
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-400" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />
      case "neutral":
        return <BarChart4 className="h-5 w-5 text-blue-400" />
      default:
        return <Brain className="h-5 w-5 text-indigo-400" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "bullish":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      case "bearish":
        return "bg-red-500/10 border-red-500/20 text-red-400"
      case "alert":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "neutral":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400"
      default:
        return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
    }
  }

  return (
    <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-400" />
          <CardTitle className="text-white text-lg">AI Market Insights</CardTitle>
        </div>
        <Badge className="bg-indigo-500/20 text-indigo-400 px-2 py-1 text-xs">
          <Zap className="h-3 w-3 mr-1" />
          Live
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40"></div>
                <Brain className="absolute inset-0 m-auto h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-white/70 text-sm">AI analyzing market data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 h-[300px]">
            <div className="border-r border-indigo-500/10 overflow-auto custom-scrollbar">
              {insights.map((insight) => (
                <HoverMotionWrapper key={insight.id}>
                  <button
                    className={`w-full p-3 text-left border-b border-indigo-500/10 hover:bg-indigo-500/5 transition-colors ${activeInsight?.id === insight.id ? "bg-indigo-500/10" : ""}`}
                    onClick={() => setActiveInsight(insight)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getInsightIcon(insight.type)}
                      <span className="text-white font-medium text-sm">{insight.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-white/10 text-white/70 text-xs">{insight.token}</Badge>
                      <span className="text-white/50 text-xs">{insight.timestamp}</span>
                    </div>
                  </button>
                </HoverMotionWrapper>
              ))}
            </div>

            <div className="col-span-2 p-4">
              <AnimatePresence mode="wait">
                {activeInsight && (
                  <motion.div
                    key={activeInsight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(activeInsight.type)}
                        <h3 className="text-white font-medium">{activeInsight.title}</h3>
                      </div>
                      <Badge className={getInsightColor(activeInsight.type)}>
                        {activeInsight.type.charAt(0).toUpperCase() + activeInsight.type.slice(1)}
                      </Badge>
                    </div>

                    <p className="text-white/80 text-sm mb-4">{activeInsight.description}</p>

                    <div className="mt-auto">
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/70 text-xs">AI Confidence</span>
                          <span className="text-white font-medium text-xs">{activeInsight.confidence}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${activeInsight.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/50 text-xs">{activeInsight.timestamp}</span>
                        <Button variant="ghost" size="sm" className="text-indigo-400 hover:bg-indigo-500/10 text-xs">
                          View Analysis <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}