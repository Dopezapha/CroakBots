"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CustomTooltip } from "@/components/ui/chart"
import { Loader2 } from "lucide-react"

// Define the shape of our price data
type PriceData = {
  timestamp: string
  price: number
  volume: number
}

export function PriceChart() {
  const [data, setData] = useState<PriceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("1h")

  useEffect(() => {
    const fetchPriceData = async () => {
      setIsLoading(true)

      try {
        // In a real implementation, this would be an API call
        // For now, we'll generate some realistic looking data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const now = new Date()
        const generateData = () => {
          const result: PriceData[] = []
          const basePrice = 0.00039
          const baseVolume = 50000

          // Generate different data points based on time range
          const dataPoints = timeRange === "1h" ? 60 : timeRange === "24h" ? 24 : timeRange === "7d" ? 7 * 24 : 30

          const timeIncrement =
            timeRange === "1h"
              ? 60 * 1000
              : timeRange === "24h"
                ? 60 * 60 * 1000
                : timeRange === "7d"
                  ? 6 * 60 * 60 * 1000
                  : 24 * 60 * 60 * 1000

          for (let i = dataPoints; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * timeIncrement)

            // Add some randomness to price and volume
            const randomFactor = 1 + (Math.random() * 0.04 - 0.02)
            const volumeFactor = 1 + (Math.random() * 0.2 - 0.1)

            // Create a trend in the data
            const trendFactor = Math.sin(i / (dataPoints / 3)) * 0.03

            const price = basePrice * (randomFactor + trendFactor)
            const volume = baseVolume * volumeFactor

            result.push({
              timestamp: timestamp.toISOString(),
              price,
              volume,
            })
          }

          return result
        }

        setData(generateData())
      } catch (error) {
        console.error("Error fetching price data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPriceData()

    // Set up auto-refresh for real-time data
    const intervalId = setInterval(() => {
      fetchPriceData()
    }, 60000) // Refresh every minute

    return () => clearInterval(intervalId)
  }, [timeRange])

  const formatPrice = (price: number) => {
    return `$${price.toFixed(8)}`
  }

  const formatVolume = (volume: number) => {
    return `$${(volume).toLocaleString()}`
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)

    if (timeRange === "1h") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (timeRange === "24h") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
          />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={formatPrice}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <CustomTooltip className="bg-black/90 border-indigo-500/30">
                    <div className="font-medium text-white">{formatTimestamp(payload[0].payload.timestamp)}</div>
                    <div className="flex items-center justify-between gap-8 mt-2">
                      <div className="text-gray-400 text-sm">Price</div>
                      <div className="text-white font-medium">{formatPrice(payload[0].payload.price)}</div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <div className="text-gray-400 text-sm">Volume</div>
                      <div className="text-white font-medium">{formatVolume(payload[0].payload.volume)}</div>
                    </div>
                  </CustomTooltip>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}