import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CrystalBackground } from "@/components/crystal-background"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react"

export const metadata: Metadata = {
  title: "CROAK | Market Analytics",
  description: "Market analytics and insights for CROAK token",
}

export default function MarketAnalyticsPage() {
  return (
    <main className="flex-1 overflow-auto">
      <CrystalBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            Market Analytics
          </h1>
          <p className="text-gray-400 mt-2">Comprehensive market analytics and AI insights for CROAK</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">$--,---,---</div>
                <div className="ml-2 text-sm text-emerald-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> --.--%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Liquidity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">$--,---,---</div>
                <div className="ml-2 text-sm text-emerald-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> --.--%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Holders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">--,---</div>
                <div className="ml-2 text-sm text-emerald-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> --.--%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">--,---</div>
                <div className="ml-2 text-sm text-red-400 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" /> --.--%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Market Sentiment</span>
                <Badge variant="outline" className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                  <Brain className="h-3 w-3 mr-1" /> AI Analysis
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <Brain className="h-10 w-10 mx-auto text-indigo-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view market sentiment</p>
                  <p className="text-xs text-indigo-400 mt-2">AI analysis with 90% confidence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Price Correlation</span>
                <Badge className="bg-indigo-500/20 text-indigo-400">
                  <Activity className="h-3 w-3 mr-1" /> Live Data
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view price correlation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Market Prediction</span>
                <Badge className="bg-indigo-500/20 text-indigo-400">
                  <Brain className="h-3 w-3 mr-1" /> 90% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <Brain className="h-10 w-10 mx-auto text-indigo-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view AI market predictions</p>
                  <p className="text-xs text-indigo-400 mt-2">90% prediction accuracy based on historical data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}