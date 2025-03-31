"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Activity, Zap } from "lucide-react"

export function StatsGrid() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        className={`bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:translate-y-[-5px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">Current Price</p>
              <h3 className="text-2xl font-bold text-white">$0.0245</h3>
              <p className="text-sm font-medium text-indigo-400 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5.67% (24h)
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:translate-y-[-5px] delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">Holders</p>
              <h3 className="text-2xl font-bold text-white">12,458</h3>
              <p className="text-sm font-medium text-indigo-400 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +124 (24h)
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:translate-y-[-5px] delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">Liquidity</p>
              <h3 className="text-2xl font-bold text-white">$2.45M</h3>
              <p className="text-sm font-medium text-indigo-400 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2.3% (24h)
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:translate-y-[-5px] delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">Network</p>
              <h3 className="text-2xl font-bold text-white">Linea</h3>
              <p className="text-sm font-medium text-white/70 flex items-center mt-1">
                <Zap className="h-4 w-4 mr-1 text-indigo-400" />
                Fast & Secure
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}