"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles } from "lucide-react"
import { PriceIndicator } from "@/components/price-indicator"
import { AIConfidenceIndicator } from "@/components/ai-confidence-indicator"
import { HoverMotionWrapper } from "@/components/motion-wrapper"

interface AIPredictionCardProps {
  prediction: {
    token: string
    symbol: string
    currentPrice: number
    predictedPrice: number
    timeframe: string
    direction: "up" | "down"
    confidence: number
    logo?: string
  }
}

export function AIPredictionCard({ prediction }: AIPredictionCardProps) {
  const percentChange = ((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice) * 100

  return (
    <HoverMotionWrapper>
      <Card className="bg-indigo-500/5 border-indigo-500/20 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-white">
                {prediction.logo ? (
                  <img
                    src={prediction.logo || "/placeholder.svg"}
                    alt={prediction.symbol}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  prediction.symbol.charAt(0)
                )}
              </div>
              <div>
                <p className="text-white font-medium">{prediction.symbol}</p>
                <p className="text-white/50 text-xs">{prediction.token}</p>
              </div>
            </div>

            <Badge className="bg-indigo-500/20 text-indigo-400">
              <Brain className="h-3 w-3 mr-1" />
              AI Prediction
            </Badge>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Current Price:</span>
            <span className="text-white font-medium">${prediction.currentPrice.toFixed(4)}</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Predicted Price:</span>
            <span
              className={prediction.direction === "up" ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}
            >
              ${prediction.predictedPrice.toFixed(4)}
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Timeframe:</span>
            <span className="text-white">{prediction.timeframe}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-sm">Potential Return:</span>
            <PriceIndicator value={percentChange} />
          </div>

          <AIConfidenceIndicator confidence={90} />

          <div className="mt-3 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span className="text-indigo-400 text-xs font-medium">AI Signal:</span>
              <span className="text-white text-xs">
                {prediction.direction === "up" ? "Strong buy opportunity" : "Consider taking profits"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </HoverMotionWrapper>
  )
}