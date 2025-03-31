"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Zap, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AiTradingAssistant } from "./ai-trading-assistant"
import { useToken } from "@/hooks/use-token"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { currentToken, tokenPrices } = useToken()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>$CROAK up 24.5% this week</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              The Premier{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                AI-Powered
              </span>{" "}
              Trading Platform
            </h1>

            <p className="text-lg text-white/70 max-w-xl">
              Join the $CROAK community and experience the future of trading with our advanced AI assistant. Trade,
              stake, and earn with intelligent insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium text-lg px-8 py-6 h-auto shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30">
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 text-lg px-8 py-6 h-auto transition-all"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    AI Trading
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-[#0f172a]/95 backdrop-blur-xl border border-indigo-500/20 text-white p-0">
                  <AiTradingAssistant />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                <span className="text-white/70">12,458 Holders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-white/70">$2.45M Liquidity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-white/70">Linea Network</span>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative z-10 bg-[#0f172a]/40 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 shadow-xl shadow-indigo-500/5">
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-3 shadow-lg shadow-purple-500/20">
                <Zap className="h-6 w-6 text-white" />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">$CROAK Token</h3>
                  <span className="text-indigo-400 font-bold">${tokenPrices.CROAK?.toFixed(4) || "0.0245"}</span>
                </div>

                <div className="h-40 w-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Animated chart line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path
                      d="M0,150 C50,120 100,180 150,140 C200,100 250,160 300,120 C350,80 400,100 400,70"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                      className="animate-draw-line"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="relative z-10">
                    <TrendingUp className="h-12 w-12 text-indigo-400 mx-auto mb-2" />
                    <p className="text-white text-center">Live Price Chart</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <p className="text-white/70 text-sm">Market Cap</p>
                    <p className="text-white font-bold">$12.45M</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <p className="text-white/70 text-sm">24h Volume</p>
                    <p className="text-white font-bold">$1.24M</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <p className="text-white/70 text-sm">Circulating Supply</p>
                    <p className="text-white font-bold">124.5M</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                    <p className="text-white/70 text-sm">Total Supply</p>
                    <p className="text-white font-bold">200M</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/10">
                  Buy $CROAK
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-2xl animate-pulse"></div>
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-2xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}