"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  BarChart3,
  RefreshCw,
  LineChart,
  CandlestickChart,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import { useAI } from "@/hooks/use-ai"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AiTradingAssistant() {
  const {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    isProcessing,
    clearChat,
    lastDetectedToken,
    marketInsights,
  } = useAI()

  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return
    sendMessage(input)
  }

  return (
    <div className="h-[600px] flex flex-col">
      <CardHeader className="pb-2 border-b border-[#00ffaa]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-[#00ffaa] to-[#00a3ff] rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-black" />
            </div>
            <CardTitle className="text-white">AI Trading Assistant</CardTitle>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-[#0f172a]/80 border border-[#00ffaa]/20 h-8">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70 h-6 px-3 text-xs"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70 h-6 px-3 text-xs"
              >
                Market Insights
              </TabsTrigger>
              <TabsTrigger
                value="signals"
                className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70 h-6 px-3 text-xs"
              >
                Signals
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {lastDetectedToken && (
          <div className="flex justify-between items-center mt-2">
            <Badge variant="outline" className="bg-[#00ffaa]/10 text-[#00ffaa] border-[#00ffaa]/20">
              Last mentioned: ${lastDetectedToken}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-white/50 hover:text-white hover:bg-white/10"
              onClick={clearChat}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              New Conversation
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-0">
        <TabsContent value="chat" className="flex-1 flex flex-col h-full mt-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2 custom-scrollbar">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "user" ? "bg-[#00ffaa]/20 text-white" : "bg-white/5 text-white"
                  } p-3 rounded-lg`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-[#00ffaa] to-[#00a3ff] text-black text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    <p className={message.role === "user" ? "text-[#00ffaa]" : "text-white/90"}>{message.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%] bg-white/5 p-3 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-[#00ffaa] to-[#00a3ff] text-black text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-[#00ffaa] rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-[#00ffaa] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-[#00ffaa] rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[#00ffaa]/10 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any token trading, price, or strategy..."
                  className="w-full p-3 bg-white/5 border border-[#00ffaa]/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#00ffaa]/30 pr-10"
                  disabled={isTyping}
                />
                <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#00ffaa]" />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] hover:from-[#00ffaa]/90 hover:to-[#00a3ff]/90 text-black"
                disabled={isTyping || !input.trim() || isProcessing}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="px-4 pb-4 space-y-2">
            <p className="text-white/50 text-xs">Suggested prompts:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#00ffaa]/20 text-[#00ffaa] hover:bg-[#00ffaa]/10 hover:text-[#00ffaa] text-xs"
                onClick={() => setInput("What's the current price of Bitcoin?")}
                disabled={isTyping}
              >
                <DollarSign className="h-3 w-3 mr-1" />
                BTC Price
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#00ffaa]/20 text-[#00ffaa] hover:bg-[#00ffaa]/10 hover:text-[#00ffaa] text-xs"
                onClick={() => setInput("Analyze ETH/USDT chart patterns")}
                disabled={isTyping}
              >
                <CandlestickChart className="h-3 w-3 mr-1" />
                ETH Analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#00ffaa]/20 text-[#00ffaa] hover:bg-[#00ffaa]/10 hover:text-[#00ffaa] text-xs"
                onClick={() => setInput("What's your price prediction for SOL?")}
                disabled={isTyping}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                SOL Prediction
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#00ffaa]/20 text-[#00ffaa] hover:bg-[#00ffaa]/10 hover:text-[#00ffaa] text-xs"
                onClick={() => setInput("Suggest a trading strategy for CROAK")}
                disabled={isTyping}
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                CROAK Strategy
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="flex-1 h-full mt-0 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-[#00ffaa]/20">
              <h3 className="text-white font-medium flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-[#00ffaa]" />
                Market Overview
              </h3>
              <p className="text-white/80 text-sm mb-3">
                {marketInsights?.overview ||
                  "Bitcoin is showing strong momentum with increased volume. Ethereum is consolidating after recent gains, while altcoins show mixed performance. Overall market sentiment is cautiously bullish."}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-md p-2">
                  <p className="text-white/60 text-xs">BTC Dominance</p>
                  <p className="text-white font-medium">52.4%</p>
                </div>
                <div className="bg-white/5 rounded-md p-2">
                  <p className="text-white/60 text-xs">Market Sentiment</p>
                  <p className="text-[#00ffaa] font-medium">Bullish</p>
                </div>
                <div className="bg-white/5 rounded-md p-2">
                  <p className="text-white/60 text-xs">Fear & Greed Index</p>
                  <p className="text-white font-medium">72 (Greed)</p>
                </div>
                <div className="bg-white/5 rounded-md p-2">
                  <p className="text-white/60 text-xs">24h Market Change</p>
                  <p className="text-[#00ffaa] font-medium">+2.8%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-[#00ffaa]/20">
              <h3 className="text-white font-medium flex items-center gap-2 mb-3">
                <CandlestickChart className="h-5 w-5 text-[#00ffaa]" />
                Top Movers (24h)
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#00ffaa]/20 text-[#00ffaa]">SOL</Badge>
                    <span className="text-white">Solana</span>
                  </div>
                  <div className="text-[#00ffaa] font-medium">+12.4%</div>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#00ffaa]/20 text-[#00ffaa]">AVAX</Badge>
                    <span className="text-white">Avalanche</span>
                  </div>
                  <div className="text-[#00ffaa] font-medium">+8.7%</div>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500/20 text-red-500">DOGE</Badge>
                    <span className="text-white">Dogecoin</span>
                  </div>
                  <div className="text-red-500 font-medium">-5.2%</div>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#00ffaa]/20 text-[#00ffaa]">CROAK</Badge>
                    <span className="text-white">Croak</span>
                  </div>
                  <div className="text-[#00ffaa] font-medium">+15.8%</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-[#00ffaa]/20">
              <h3 className="text-white font-medium flex items-center gap-2 mb-3">
                <LineChart className="h-5 w-5 text-[#00ffaa]" />
                Key Support/Resistance Levels
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">BTC/USDT</span>
                    <span className="text-white/60 text-sm">Current: $64,237.83</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Resistance 2</span>
                      <span className="text-white">$68,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Resistance 1</span>
                      <span className="text-white">$65,800</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Support 1</span>
                      <span className="text-white">$62,400</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Support 2</span>
                      <span className="text-white">$60,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">ETH/USDT</span>
                    <span className="text-white/60 text-sm">Current: $3,482.15</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Resistance 2</span>
                      <span className="text-white">$3,800</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Resistance 1</span>
                      <span className="text-white">$3,600</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Support 1</span>
                      <span className="text-white">$3,300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Support 2</span>
                      <span className="text-white">$3,100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="signals" className="flex-1 h-full mt-0 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-[#00ffaa]/20">
              <h3 className="text-white font-medium flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-[#00ffaa]" />
                AI Trading Signals
              </h3>
              <p className="text-white/80 text-sm mb-3">
                Our AI analyzes market patterns, volume, and sentiment to generate trading signals. These are not
                financial advice - always do your own research.
              </p>

              <div className="space-y-3">
                <div className="bg-[#00ffaa]/10 rounded-lg p-3 border border-[#00ffaa]/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#00ffaa]/20 text-[#00ffaa]">BUY</Badge>
                      <span className="text-white font-medium">BTC/USDT</span>
                    </div>
                    <span className="text-white/60 text-xs">15 min ago</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Bitcoin showing bullish divergence on 4h chart with increasing volume. Consider entry at $64,200
                    with stop loss at $62,400.
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-white/60">Target 1: $65,800</span>
                    <span className="text-white/60">Target 2: $68,500</span>
                  </div>
                </div>

                <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/20 text-red-500">SELL</Badge>
                      <span className="text-white font-medium">DOGE/USDT</span>
                    </div>
                    <span className="text-white/60 text-xs">1 hour ago</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    DOGE forming a double top pattern with decreasing volume. Consider taking profits or setting tight
                    stop loss.
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-white/60">Target 1: $0.115</span>
                    <span className="text-white/60">Target 2: $0.105</span>
                  </div>
                </div>

                <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500/20 text-yellow-500">WATCH</Badge>
                      <span className="text-white font-medium">ETH/USDT</span>
                    </div>
                    <span className="text-white/60 text-xs">3 hours ago</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    ETH approaching key resistance at $3,600. Wait for confirmation of breakout before entering. Volume
                    increasing but RSI showing potential divergence.
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-white/60">Resistance: $3,600</span>
                    <span className="text-white/60">Support: $3,300</span>
                  </div>
                </div>

                <div className="bg-[#00ffaa]/10 rounded-lg p-3 border border-[#00ffaa]/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#00ffaa]/20 text-[#00ffaa]">BUY</Badge>
                      <span className="text-white font-medium">CROAK/USDT</span>
                    </div>
                    <span className="text-white/60 text-xs">Just now</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    CROAK breaking out of consolidation pattern with 3x normal volume. Strong buy signal with potential
                    for significant upside.
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-white/60">Target 1: $0.0280</span>
                    <span className="text-white/60">Target 2: $0.0320</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-[#00ffaa]/20">
              <h3 className="text-white font-medium flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Risk Management
              </h3>
              <p className="text-white/80 text-sm mb-3">
                Always implement proper risk management strategies. Here are our current recommendations:
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <span className="text-white">Position Size</span>
                  <span className="text-white/80">1-2% of portfolio per trade</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <span className="text-white">Stop Loss</span>
                  <span className="text-white/80">Always use 2-5% from entry</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <span className="text-white">Take Profit</span>
                  <span className="text-white/80">Set multiple targets (1:2, 1:3 risk/reward)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                  <span className="text-white">Market Volatility</span>
                  <span className="text-yellow-500">High - Use caution</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </div>
  )
}