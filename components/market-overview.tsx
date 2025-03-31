"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { motion } from "framer-motion"
import { FloatMotionWrapper } from "@/components/motion-wrapper"
import { LoadingSpinner } from "@/components/loading-spinner"

interface MarketOverviewProps {
  isLoading?: boolean
  sentiment?: "bullish" | "bearish" | "neutral"
  confidence?: number
  aiWinRate?: number
}

export function MarketOverview({
  isLoading = false,
  sentiment = "bullish",
  confidence = 90,
  aiWinRate = 90,
}: MarketOverviewProps) {
  return (
    <Card className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/30 shadow-lg shadow-indigo-500/5">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <FloatMotionWrapper yOffset={5} duration={2}>
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-indigo-400" />
              </div>
            </FloatMotionWrapper>
            <div>
              <h3 className="text-lg font-bold text-white">AI Market Prediction</h3>
              <p className="text-white/70">Our AI analyzes market trends and patterns</p>
            </div>
          </div>

          <div className="flex-1 bg-black/20 rounded-lg p-3 border border-indigo-500/20">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <p className="text-white/70">Analyzing market conditions...</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  {sentiment === "bullish" ? (
                    <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                  ) : sentiment === "bearish" ? (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-blue-400" />
                  )}
                  <p className="text-white font-medium">
                    Market trend:{" "}
                    <span
                      className={
                        sentiment === "bullish"
                          ? "text-emerald-500"
                          : sentiment === "bearish"
                            ? "text-red-500"
                            : "text-blue-400"
                      }
                    >
                      {sentiment}
                    </span>
                  </p>
                </div>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden hidden md:block">
                  <motion.div
                    className={`h-full rounded-full ${
                      sentiment === "bullish"
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                        : sentiment === "bearish"
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : "bg-gradient-to-r from-blue-500 to-blue-400"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
                <Badge
                  className={`whitespace-nowrap ${
                    sentiment === "bullish"
                      ? "bg-emerald-500/20 text-emerald-500"
                      : sentiment === "bearish"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {confidence}% Confidence
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/70">AI Win Rate:</span>
            <span className="text-emerald-500 font-medium">{aiWinRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}