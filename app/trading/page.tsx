"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Brain, Zap, TrendingUp, TrendingDown, Info, RotateCcw, Wallet, Percent } from "lucide-react"
import { NeuralNetworkBackground } from "@/components/neural-network-background"
import { MotionWrapper, HoverMotionWrapper, FloatMotionWrapper } from "@/components/motion-wrapper"
import { PriceIndicator } from "@/components/price-indicator"
import { EmptyState } from "@/components/empty-state"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AIConfidenceIndicator } from "@/components/ai-confidence-indicator"

export default function TradingPage() {
  // State for trading data
  const [tradingData, setTradingData] = useState<any>(null)
  const [openOrders, setOpenOrders] = useState<any[]>([])
  const [recentTrades, setRecentTrades] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [aiSignal, setAiSignal] = useState<string | null>(null)
  const [aiDirection, setAiDirection] = useState<"buy" | "sell" | null>(null)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real implementation, this would fetch actual data from an API
        // For now, we'll just simulate loading
        setTimeout(() => {
          setIsLoading(false)
          setTradingData(null)
          setOpenOrders([])
          setRecentTrades([])
          setAiSignal(null)
          setAiDirection(null)
        }, 1500)
      } catch (error) {
        console.error("Error fetching trading data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Neural network animated background */}
      <NeuralNetworkBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col gap-8">
          <MotionWrapper>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">AI-Powered Trading</h1>
                <Badge className="bg-indigo-500/20 text-indigo-400 px-2 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Powered by AI
                </Badge>
              </div>
              <p className="text-white/70">Advanced trading with AI-driven insights and signals</p>
            </div>
          </MotionWrapper>

          {/* AI Trading Signal Banner */}
          <MotionWrapper delay={0.2}>
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
                      <h3 className="text-lg font-bold text-white">AI Trading Signal</h3>
                      <p className="text-white/70">Real-time analysis and prediction</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-black/20 rounded-lg p-3 border border-indigo-500/20">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="relative h-5 w-5">
                          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                        </div>
                        <p className="text-white/70">Analyzing market conditions...</p>
                      </div>
                    ) : aiSignal ? (
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2">
                          {aiDirection === "buy" ? (
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-500" />
                          )}
                          <p className="text-white font-medium">
                            Signal:{" "}
                            <span className={aiDirection === "buy" ? "text-emerald-500" : "text-red-500"}>
                              {aiSignal}
                            </span>
                          </p>
                        </div>

                        <AIConfidenceIndicator confidence={90} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-white/70" />
                        <p className="text-white/70">No active trading signals at this time</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white/70">AI Win Rate:</span>
                    <span className="text-emerald-500 font-medium">90%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MotionWrapper className="lg:col-span-2" delay={0.3}>
              <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white">CROAK/USDT</CardTitle>
                      {tradingData?.priceChange && <PriceIndicator value={tradingData.priceChange} />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-indigo-500/20 text-white/70 hover:bg-indigo-500/10 hover:text-white"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Refresh
                      </Button>
                      <Select defaultValue="1h">
                        <SelectTrigger className="w-[80px] h-8 border-indigo-500/20 bg-white/5 text-white">
                          <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f172a] border-indigo-500/20 text-white">
                          <SelectItem value="5m">5m</SelectItem>
                          <SelectItem value="15m">15m</SelectItem>
                          <SelectItem value="1h">1h</SelectItem>
                          <SelectItem value="4h">4h</SelectItem>
                          <SelectItem value="1d">1d</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {tradingData && (
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div>
                        <p className="text-white/50 text-xs">Price</p>
                        <p className="text-white font-medium">${tradingData.price}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">24h High</p>
                        <p className="text-white font-medium">${tradingData.high24h}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">24h Low</p>
                        <p className="text-white font-medium">${tradingData.low24h}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">24h Volume</p>
                        <p className="text-white font-medium">${tradingData.volume24h}</p>
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : tradingData ? (
                    <div className="relative aspect-video bg-black/20 rounded-lg border border-indigo-500/20 overflow-hidden">
                      {/* Chart would go here in a real implementation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white/50">Chart visualization would appear here</p>
                      </div>

                      {/* AI Signal Overlay */}
                      {aiSignal && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/30">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-indigo-400" />
                            <span className="text-white text-sm font-medium">AI Signal: {aiSignal}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <EmptyState message="Chart data not available" />
                  )}
                </CardContent>
              </Card>
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
              <div className="space-y-6">
                <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <CardHeader>
                    <CardTitle className="text-white">Trade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="limit" className="w-full">
                      <TabsList className="bg-[#0f172a]/80 border border-indigo-500/20 mb-4">
                        <TabsTrigger
                          value="limit"
                          className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/70"
                        >
                          Limit
                        </TabsTrigger>
                        <TabsTrigger
                          value="market"
                          className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/70"
                        >
                          Market
                        </TabsTrigger>
                        <TabsTrigger
                          value="stop"
                          className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/70"
                        >
                          Stop
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="limit" className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Buy</Button>
                          <Button className="bg-red-500 hover:bg-red-600 text-white">Sell</Button>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Price (USDT)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-white/50">USDT</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Amount (CROAK)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                <span className="text-white/50">CROAK</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-indigo-400 hover:bg-indigo-500/10 px-2"
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Total (USDT)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-white/50">USDT</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            25%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            50%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            75%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            100%
                          </Button>
                        </div>

                        <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="h-4 w-4 text-indigo-400" />
                            <h4 className="text-white font-medium">AI Trading Insight</h4>
                          </div>
                          <p className="text-white/80 text-sm">
                            Based on current market analysis, our AI suggests a limit buy at $0.0245 with a take profit
                            at $0.0275.
                          </p>
                          <AIConfidenceIndicator className="mt-2" />
                        </div>

                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                          <Zap className="mr-2 h-4 w-4" />
                          Place Order
                        </Button>
                      </TabsContent>

                      <TabsContent value="market" className="space-y-4">
                        {/* Market order form - similar structure to limit */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Buy</Button>
                          <Button className="bg-red-500 hover:bg-red-600 text-white">Sell</Button>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Amount (CROAK)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                <span className="text-white/50">CROAK</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-indigo-400 hover:bg-indigo-500/10 px-2"
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Total (USDT)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-white/50">USDT</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            25%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            50%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            75%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-500/20 text-white/70 hover:bg-indigo-500/10"
                          >
                            100%
                          </Button>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                          <Zap className="mr-2 h-4 w-4" />
                          Place Market Order
                        </Button>
                      </TabsContent>

                      <TabsContent value="stop" className="space-y-4">
                        {/* Stop order form */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Buy</Button>
                          <Button className="bg-red-500 hover:bg-red-600 text-white">Sell</Button>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Stop Price (USDT)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-white/50">USDT</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Limit Price (USDT)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-white/50">USDT</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-white/70">Amount (CROAK)</label>
                            <div className="relative">
                              <Input
                                type="text"
                                className="bg-white/5 border-indigo-500/20 text-white"
                                placeholder="0.00"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                <span className="text-white/50">CROAK</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-indigo-400 hover:bg-indigo-500/10 px-2"
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                          <Zap className="mr-2 h-4 w-4" />
                          Place Stop Order
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <CardHeader>
                    <CardTitle className="text-white">Wallet Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-white/70 text-sm">Available USDT</p>
                            <p className="text-white font-bold text-xl">0.00</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                            <Percent className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-white/70 text-sm">Available CROAK</p>
                            <p className="text-white font-bold text-xl">0.00</p>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                          Deposit
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </MotionWrapper>
          </div>

          {/* Open Orders and Recent Trades */}
          <MotionWrapper delay={0.5}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <CardHeader>
                  <CardTitle className="text-white">Open Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : openOrders.length > 0 ? (
                    <div className="space-y-3">
                      {openOrders.map((order, index) => (
                        <HoverMotionWrapper key={index}>
                          <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    className={
                                      order.side === "buy"
                                        ? "bg-emerald-500/20 text-emerald-500"
                                        : "bg-red-500/20 text-red-500"
                                    }
                                  >
                                    {order.side === "buy" ? "Buy" : "Sell"}
                                  </Badge>
                                  <span className="text-white">{order.symbol}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-white/50 text-xs">{order.type}</span>
                                  <span className="text-white/50 text-xs">•</span>
                                  <span className="text-white/50 text-xs">{order.time}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-white">{order.price} USDT</p>
                                <p className="text-white/70 text-sm">{order.amount} CROAK</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/50 hover:text-red-500 hover:bg-red-500/10"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </HoverMotionWrapper>
                      ))}
                    </div>
                  ) : (
                    <EmptyState message="No open orders" />
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <CardHeader>
                  <CardTitle className="text-white">Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : recentTrades.length > 0 ? (
                    <div className="space-y-3">
                      {recentTrades.map((trade, index) => (
                        <HoverMotionWrapper key={index}>
                          <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    className={
                                      trade.side === "buy"
                                        ? "bg-emerald-500/20 text-emerald-500"
                                        : "bg-red-500/20 text-red-500"
                                    }
                                  >
                                    {trade.side === "buy" ? "Buy" : "Sell"}
                                  </Badge>
                                  <span className="text-white">{trade.symbol}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-white/50 text-xs">{trade.time}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-white">{trade.price} USDT</p>
                                <p className="text-white/70 text-sm">{trade.amount} CROAK</p>
                              </div>
                              <div
                                className={
                                  trade.pnl > 0 ? "text-emerald-500" : trade.pnl < 0 ? "text-red-500" : "text-white/50"
                                }
                              >
                                {trade.pnl > 0 ? "+" : ""}
                                {trade.pnl}%
                              </div>
                            </div>
                          </div>
                        </HoverMotionWrapper>
                      ))}
                    </div>
                  ) : (
                    <EmptyState message="No recent trades" />
                  )}
                </CardContent>
              </Card>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  )
}