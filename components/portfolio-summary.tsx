"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"
import { PriceIndicator } from "@/components/price-indicator"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"

interface PortfolioSummaryProps {
  isLoading?: boolean
  totalValue?: number
  totalChange?: number
  tokens?: Array<{
    symbol: string
    name: string
    amount: number
    value: number
    change: number
    logo?: string
  }>
}

export function PortfolioSummary({
  isLoading = false,
  totalValue = 0,
  totalChange = 0,
  tokens = [],
}: PortfolioSummaryProps) {
  return (
    <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-indigo-400" />
            <CardTitle className="text-white">Portfolio Summary</CardTitle>
          </div>
          {!isLoading && <Badge className="bg-indigo-500/20 text-indigo-400">{tokens.length} Assets</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Value</p>
                <p className="text-white text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
              <PriceIndicator value={totalChange} className="text-lg" />
            </div>

            {tokens.length > 0 ? (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 py-2 px-3 text-white/50 text-xs">
                  <div>Asset</div>
                  <div className="text-right">Amount</div>
                  <div className="text-right">Value</div>
                  <div className="text-right">Change</div>
                </div>

                {tokens.map((token, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 py-2 px-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-indigo-500/20 rounded-full flex items-center justify-center text-white text-xs">
                        {token.logo ? (
                          <img
                            src={token.logo || "/placeholder.svg"}
                            alt={token.symbol}
                            className="h-4 w-4 rounded-full"
                          />
                        ) : (
                          token.symbol.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm">{token.symbol}</p>
                        <p className="text-white/50 text-xs">{token.name}</p>
                      </div>
                    </div>

                    <div className="text-right text-white text-sm self-center">{token.amount.toFixed(4)}</div>

                    <div className="text-right text-white text-sm self-center">${token.value.toFixed(2)}</div>

                    <div className="text-right self-center">
                      <PriceIndicator value={token.change} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No assets in portfolio" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}