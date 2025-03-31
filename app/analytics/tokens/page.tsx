import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CrystalBackground } from "@/components/crystal-background"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react"

export const metadata: Metadata = {
  title: "CROAK | Token Analytics",
  description: "Detailed analytics for CROAK and related tokens",
}

export default function TokenAnalyticsPage() {
  return (
    <main className="flex-1 overflow-auto">
      <CrystalBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            Token Analytics
          </h1>
          <p className="text-gray-400 mt-2">Detailed analytics and insights for CROAK and related tokens</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>CROAK Price</span>
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5.2%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view price chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Trading Volume</span>
                <Badge className="bg-red-500/20 text-red-400">
                  <TrendingDown className="h-3 w-3 mr-1" /> -2.8%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view volume chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>AI Price Prediction</span>
                <Badge className="bg-indigo-500/20 text-indigo-400">
                  <Brain className="h-3 w-3 mr-1" /> 90% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <Brain className="h-10 w-10 mx-auto text-indigo-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view AI predictions</p>
                  <p className="text-xs text-indigo-400 mt-2">90% prediction accuracy based on historical data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Token Distribution</span>
                <Badge variant="outline" className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                  <Brain className="h-3 w-3 mr-1" /> AI Analysis
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <PieChart className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view token distribution</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Holder Analytics</span>
                <Badge variant="outline" className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                  <Brain className="h-3 w-3 mr-1" /> AI Insights
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">Connect your wallet to view holder analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}