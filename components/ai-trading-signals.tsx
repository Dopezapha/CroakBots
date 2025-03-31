"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Clock, Sparkles, AlertTriangle, Info } from "lucide-react"
import { HoverMotionWrapper, PulseMotionWrapper } from "./motion-wrapper"

type Signal = {
  id: number
  pair: string
  direction: "buy" | "sell" | "watch"
  price: string
  targets: string[]
  stopLoss: string
  timeframe: string
  confidence: number
  timestamp: string
  isNew: boolean
}

export function AiTradingSignals() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading AI signals
    const loadSignals = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const mockSignals: Signal[] = [
        {
          id: 1,
          pair: "BTC/USDT",
          direction: "buy",
          price: "64,250",
          targets: ["65,800", "68,500"],
          stopLoss: "62,400",
          timeframe: "4h",
          confidence: 85,
          timestamp: "5 minutes ago",
          isNew: true,
        },
        {
          id: 2,
          pair: "ETH/USDT",
          direction: "sell",
          price: "3,520",
          targets: ["3,350", "3,100"],
          stopLoss: "3,650",
          timeframe: "1h",
          confidence: 72,
          timestamp: "30 minutes ago",
          isNew: true,
        },
        {
          id: 3,
          pair: "SOL/USDT",
          direction: "watch",
          price: "145.20",
          targets: ["155.00", "165.00"],
          stopLoss: "135.00",
          timeframe: "1d",
          confidence: 65,
          timestamp: "2 hours ago",
          isNew: false,
        },
        {
          id: 4,
          pair: "CROAK/USDT",
          direction: "buy",
          price: "0.0245",
          targets: ["0.0280", "0.0320"],
          stopLoss: "0.0220",
          timeframe: "1d",
          confidence: 78,
          timestamp: "3 hours ago",
          isNew: false,
        },
      ]

      setSignals(mockSignals)
      setIsLoading(false)
    }

    loadSignals()
  }, [])

  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case "buy":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 px-2">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            BUY
          </Badge>
        )
      case "sell":
        return (
          <Badge className="bg-red-500/20 text-red-400 px-2">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            SELL
          </Badge>
        )
      case "watch":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 px-2">
            <Clock className="h-3 w-3 mr-1" />
            WATCH
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <CardTitle className="text-white text-lg">AI Trading Signals</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="h-8 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10">
          View All Signals
        </Button>
      </CardHeader>

      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40"></div>
                <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-white/70 text-sm">Generating trading signals...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signals.map((signal) => (
                <HoverMotionWrapper key={signal.id}>
                  <div
                    className={`p-4 rounded-lg border ${signal.direction === "buy" ? "bg-emerald-500/5 border-emerald-500/20" : signal.direction === "sell" ? "bg-red-500/5 border-red-500/20" : "bg-amber-500/5 border-amber-500/20"}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{signal.pair}</span>
                        {getDirectionBadge(signal.direction)}
                      </div>
                      {signal.isNew && (
                        <PulseMotionWrapper>
                          <Badge className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 text-xs">NEW</Badge>
                        </PulseMotionWrapper>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-white/50 text-xs mb-1">Entry Price</p>
                        <p className="text-white font-medium">${signal.price}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-1">Stop Loss</p>
                        <p className="text-white font-medium">${signal.stopLoss}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-1">Target 1</p>
                        <p className="text-white font-medium">${signal.targets[0]}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-1">Target 2</p>
                        <p className="text-white font-medium">${signal.targets[1]}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-white/10 text-white/70">{signal.timeframe}</Badge>
                        <span className="text-white/50 text-xs">{signal.timestamp}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white/70 text-xs mr-1">Confidence:</span>
                        <span
                          className={`text-xs font-medium ${signal.confidence > 75 ? "text-emerald-400" : signal.confidence > 60 ? "text-amber-400" : "text-white/70"}`}
                        >
                          {signal.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverMotionWrapper>
              ))}
            </div>

            <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/80 text-sm">
                  Trading signals are generated by our AI models based on technical analysis, market sentiment, and
                  historical patterns.
                </p>
                <div className="flex items-center mt-1">
                  <Info className="h-3 w-3 text-white/50 mr-1" />
                  <p className="text-white/50 text-xs">Always use proper risk management and do your own research.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}