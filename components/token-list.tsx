"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowUp, ArrowDown, Loader2 } from "lucide-react"

type Token = {
  id: string
  name: string
  symbol: string
  price: string
  change24h: number
  volume24h: string
  marketCap: string
  sparkline: number[]
}

export function TokenList() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll simulate loading real data
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulate real token data
        setTokens([
          {
            id: "croak",
            name: "CROAK",
            symbol: "CROAK",
            price: "$0.00039",
            change24h: 5.2,
            volume24h: "$1.2M",
            marketCap: "$12.5M",
            sparkline: [0.00035, 0.00037, 0.00036, 0.00038, 0.00039, 0.00038, 0.00039],
          },
          {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "BTC",
            price: "$63,450",
            change24h: 2.1,
            volume24h: "$28.5B",
            marketCap: "$1.2T",
            sparkline: [62100, 62500, 63000, 62800, 63200, 63450],
          },
          {
            id: "ethereum",
            name: "Ethereum",
            symbol: "ETH",
            price: "$3,120",
            change24h: 3.5,
            volume24h: "$15.7B",
            marketCap: "$375.2B",
            sparkline: [3050, 3080, 3100, 3090, 3110, 3120],
          },
          {
            id: "solana",
            name: "Solana",
            symbol: "SOL",
            price: "$142.75",
            change24h: 4.8,
            volume24h: "$3.2B",
            marketCap: "$62.1B",
            sparkline: [136.5, 138.2, 139.5, 140.8, 141.2, 142.75],
          },
          {
            id: "dogecoin",
            name: "Dogecoin",
            symbol: "DOGE",
            price: "$0.1235",
            change24h: -1.8,
            volume24h: "$1.5B",
            marketCap: "$16.8B",
            sparkline: [0.126, 0.1255, 0.124, 0.123, 0.1235],
          },
          {
            id: "shiba-inu",
            name: "Shiba Inu",
            symbol: "SHIB",
            price: "$0.00001823",
            change24h: 7.2,
            volume24h: "$850M",
            marketCap: "$10.7B",
            sparkline: [0.00001701, 0.0000175, 0.0000178, 0.0000181, 0.00001823],
          },
        ])

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching tokens:", error)
        setIsLoading(false)
      }
    }

    fetchTokens()
  }, [])

  const renderSparkline = (data: number[]) => {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min
    const width = 100
    const height = 30

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width
        const y = height - ((value - min) / range) * height
        return `${x},${y}`
      })
      .join(" ")

    const startColor = data[0] < data[data.length - 1] ? "#10b981" : "#ef4444"
    const endColor = data[0] < data[data.length - 1] ? "#10b981" : "#ef4444"

    return (
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${data.join("-")}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={endColor} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={data[0] < data[data.length - 1] ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M0,${height} L0,${height - ((data[0] - min) / range) * height} ${points} L${width},${height}`}
          fill={`url(#gradient-${data.join("-")})`}
          opacity="0.2"
        />
      </svg>
    )
  }

  return (
    <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Top Tokens</CardTitle>
          <Badge className="bg-indigo-600 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400 text-right">Price</TableHead>
                <TableHead className="text-gray-400 text-right">24h Change</TableHead>
                <TableHead className="text-gray-400 text-right hidden md:table-cell">24h Volume</TableHead>
                <TableHead className="text-gray-400 text-right hidden md:table-cell">Market Cap</TableHead>
                <TableHead className="text-gray-400 hidden lg:table-cell">Last 24h</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id} className="border-gray-800">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                        {token.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div>{token.name}</div>
                        <div className="text-gray-500 text-xs">{token.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{token.price}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end ${token.change24h >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {token.change24h >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(token.change24h)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">{token.volume24h}</TableCell>
                  <TableCell className="text-right hidden md:table-cell">{token.marketCap}</TableCell>
                  <TableCell className="hidden lg:table-cell">{renderSparkline(token.sparkline)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}