"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TokenList } from "@/components/token-list"
import { PriceChart } from "@/components/price-chart"
import { AIChatBot } from "@/components/ai-chat-bot"
import { SearchBar } from "@/components/search-bar"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, BarChart2, Zap, Loader2 } from "lucide-react"

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [marketData, setMarketData] = useState({
    totalMarketCap: "Loading...",
    volume24h: "Loading...",
    btcDominance: "Loading...",
    fearGreedIndex: "Loading...",
    fearGreedText: "Loading...",
    marketCapChange: 0,
    volumeChange: 0,
    btcDominanceChange: 0,
  })

  useEffect(() => {
    setIsClient(true)

    const fetchMarketData = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll simulate loading real data
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate real market data
        setMarketData({
          totalMarketCap: "$2.1T",
          volume24h: "$84.5B",
          btcDominance: "48.2%",
          fearGreedIndex: "72",
          fearGreedText: "Greed",
          marketCapChange: 2.4,
          volumeChange: 5.7,
          btcDominanceChange: -1.3,
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching market data:", error)
        setIsLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
        <p className="text-indigo-400 animate-pulse">Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">AI-powered insights and real-time market data</p>
        </div>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-xl font-bold">Market Overview</CardTitle>
                <div className="flex bg-black/20 rounded-md p-0.5">
                  <button className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white">1H</button>
                  <button className="px-3 py-1 text-sm rounded-md text-gray-400 hover:text-white">24H</button>
                  <button className="px-3 py-1 text-sm rounded-md text-gray-400 hover:text-white">7D</button>
                  <button className="px-3 py-1 text-sm rounded-md text-gray-400 hover:text-white">30D</button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <Card className="bg-gray-800/40 border-indigo-500/30">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm font-medium text-gray-400">Total Market Cap</div>
                      <div className="text-lg md:text-2xl font-bold mt-1">{marketData.totalMarketCap}</div>
                      <div className="flex items-center mt-1">
                        <Badge
                          className={`${marketData.marketCapChange >= 0 ? "bg-emerald-600" : "bg-red-600"} text-white text-xs`}
                        >
                          {marketData.marketCapChange >= 0 ? "+" : ""}
                          {marketData.marketCapChange}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/40 border-indigo-500/30">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm font-medium text-gray-400">24h Volume</div>
                      <div className="text-lg md:text-2xl font-bold mt-1">{marketData.volume24h}</div>
                      <div className="flex items-center mt-1">
                        <Badge
                          className={`${marketData.volumeChange >= 0 ? "bg-emerald-600" : "bg-red-600"} text-white text-xs`}
                        >
                          {marketData.volumeChange >= 0 ? "+" : ""}
                          {marketData.volumeChange}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/40 border-indigo-500/30">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm font-medium text-gray-400">BTC Dominance</div>
                      <div className="text-lg md:text-2xl font-bold mt-1">{marketData.btcDominance}</div>
                      <div className="flex items-center mt-1">
                        <Badge
                          className={`${marketData.btcDominanceChange >= 0 ? "bg-emerald-600" : "bg-red-600"} text-white text-xs`}
                        >
                          {marketData.btcDominanceChange >= 0 ? "+" : ""}
                          {marketData.btcDominanceChange}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/40 border-indigo-500/30">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm font-medium text-gray-400">Fear & Greed</div>
                      <div className="text-lg md:text-2xl font-bold mt-1">{marketData.fearGreedIndex}</div>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-emerald-600 text-white text-xs">{marketData.fearGreedText}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <PriceChart />
              </div>
            </CardContent>
          </Card>

          <TokenList />
        </div>

        <div className="space-y-6">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-400" />
                  AI Insights
                </CardTitle>
                <Badge className="bg-emerald-600">90% Accuracy</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-800/40 p-3 rounded-lg border border-indigo-500/30">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-emerald-400 shrink-0" />
                    <div className="text-sm font-medium">Price Prediction</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-base md:text-lg font-bold">
                      CROAK is likely to increase by 15% in the next 24 hours
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Based on trading volume and market sentiment</div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-3 rounded-lg border border-indigo-500/30">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-indigo-400 shrink-0" />
                    <div className="text-sm font-medium">Market Analysis</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-base md:text-lg font-bold">Altcoin season probability: 78%</div>
                    <div className="text-xs text-gray-400 mt-1">Memecoins showing increased momentum</div>
                  </div>
                </div>

                <div className="bg-gray-800/40 p-3 rounded-lg border border-indigo-500/30">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-yellow-400 shrink-0" />
                    <div className="text-sm font-medium">Trading Opportunity</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-base md:text-lg font-bold">CROAK/ETH pair showing bullish divergence</div>
                    <div className="text-xs text-gray-400 mt-1">Consider increasing position size</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-400" />
                  AI Trading Bot
                </CardTitle>
                <Badge className="bg-purple-600">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-800/40 p-3 rounded-lg border border-indigo-500/30">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Trading Status</div>
                    <Badge className="bg-emerald-600">Online</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-400">Win Rate</div>
                    <div className="text-sm font-bold text-emerald-400">90%</div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-xs text-gray-400">Trades (24h)</div>
                    <div className="text-sm font-bold">12</div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-xs text-gray-400">Profit (24h)</div>
                    <div className="text-sm font-bold text-emerald-400">+5.8%</div>
                  </div>
                </div>

                <div className="bg-indigo-600/20 p-3 rounded-lg border border-indigo-500/50 flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-indigo-400 animate-pulse" />
                    <div>
                      <div className="text-sm font-medium">AI Assistant</div>
                      <div className="text-xs text-gray-400">Ask me anything about trading</div>
                    </div>
                  </div>
                  <Badge
                    className="bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                    onClick={() => {
                      // This would normally toggle the AI Chat Bot, but it's already visible by default
                      // We'll just make sure it's not minimized
                      const chatBotElement = document.querySelector("[data-ai-chatbot]")
                      if (chatBotElement) {
                        chatBotElement.dispatchEvent(new Event("maximize"))
                      }
                    }}
                  >
                    Chat Now
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {        /* AI Chat Bot */}
      <AIChatBot />
    </div>
  )
}