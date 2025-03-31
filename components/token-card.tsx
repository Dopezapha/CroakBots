"use client"

import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"
import { PriceIndicator } from "@/components/price-indicator"
import { HoverMotionWrapper } from "@/components/motion-wrapper"

interface TokenCardProps {
  token: {
    name: string
    symbol: string
    price: number
    change24h: number
    marketCap: number
    aiSignal?: "buy" | "sell" | "hold"
    logo?: string
  }
}

export function TokenCard({ token }: TokenCardProps) {
  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
    return num.toFixed(2)
  }

  // Get AI signal badge color
  const getSignalColor = (signal?: string) => {
    if (signal === "buy") return "bg-emerald-500/20 text-emerald-500"
    if (signal === "sell") return "bg-red-500/20 text-red-500"
    return "bg-blue-500/20 text-blue-400"
  }

  // Get AI signal text
  const getSignalText = (signal?: string) => {
    if (signal === "buy") return "Buy"
    if (signal === "sell") return "Sell"
    return "Hold"
  }

  return (
    <HoverMotionWrapper>
      <div className="grid grid-cols-5 gap-4 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-white">
            {token.logo ? (
              <img src={token.logo || "/placeholder.svg"} alt={token.symbol} className="h-6 w-6 rounded-full" />
            ) : (
              token.symbol.charAt(0)
            )}
          </div>
          <div>
            <p className="text-white font-medium">{token.symbol}</p>
            <p className="text-white/50 text-xs">{token.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <p className="text-white font-medium">${token.price.toFixed(4)}</p>
        </div>

        <div className="flex items-center justify-end">
          <PriceIndicator value={token.change24h} />
        </div>

        <div className="flex items-center justify-end">
          <p className="text-white">${formatNumber(token.marketCap)}</p>
        </div>

        <div className="flex items-center justify-end">
          <Badge className={`flex items-center gap-1 ${getSignalColor(token.aiSignal)}`}>
            <Brain className="h-3 w-3" />
            <span>{getSignalText(token.aiSignal)}</span>
            <span className="text-xs ml-1">90%</span>
          </Badge>
        </div>
      </div>
    </HoverMotionWrapper>
  )
}