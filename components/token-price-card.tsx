"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { motion } from "framer-motion"
import { HoverMotionWrapper } from "./motion-wrapper"

type TokenPriceProps = {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
  sparklineData?: number[]
}

export function TokenPriceCard({
  symbol,
  name,
  price,
  change,
  volume,
  marketCap,
  sparklineData = [],
}: TokenPriceProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Format price based on value
  const formatPrice = (price: number) => {
    if (price < 0.001) return price.toFixed(8)
    if (price < 1) return price.toFixed(4)
    if (price < 10) return price.toFixed(2)
    return price.toFixed(2)
  }

  return (
    <HoverMotionWrapper>
      <Card
        className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{symbol}</span>
                <Badge className="bg-white/10 text-white/70 text-xs">{name}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-white">${formatPrice(price)}</span>
                <Badge
                  className={`${change >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}
                >
                  {change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(change).toFixed(2)}%
                </Badge>
              </div>
            </div>

            {/* Sparkline chart */}
            <div className="h-12 w-24 relative">
              {sparklineData.length > 0 && (
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: isHovered ? 1 : 0.8,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    d={`M0,${40 - sparklineData[0]} ${sparklineData
                      .map((point, i) => `L${(i / (sparklineData.length - 1)) * 100},${40 - point}`)
                      .join(" ")}`}
                    fill="none"
                    stroke={change >= 0 ? "#10b981" : "#ef4444"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <p className="text-white/50 text-xs">Volume (24h)</p>
              <p className="text-white/90 text-sm">{volume}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Market Cap</p>
              <p className="text-white/90 text-sm">{marketCap}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </HoverMotionWrapper>
  )
}