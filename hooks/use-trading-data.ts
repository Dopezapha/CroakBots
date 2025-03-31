"use client"

import { useState, useEffect, useCallback } from "react"

// Types for trading data
type MarketData = {
  lastPrice: string
  bidPrice: string
  askPrice: string
  high24h: string
  low24h: string
  volume24h: number
  priceChange: number
  priceChangePercent: string
  marketCap: number
  fundingRate: string
}

type OrderbookEntry = {
  price: string
  amount: string
  total: string
}

type Orderbook = {
  asks: OrderbookEntry[]
  bids: OrderbookEntry[]
}

type Trade = {
  price: string
  amount: string
  value: string
  side: "buy" | "sell"
  time: string
}

type TradingPair = {
  symbol: string
  price: string
  change: string
  volume: string
}

// Hook for trading data
export function useTradingData(pair: string) {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [orderbook, setOrderbook] = useState<Orderbook | null>(null)
  const [recentTrades, setRecentTrades] = useState<Trade[] | null>(null)
  const [topPairs, setTopPairs] = useState<TradingPair[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to fetch market data from Bitget API
  const fetchMarketData = useCallback(async (symbol: string) => {
    try {
      // Format symbol for API (e.g., BTC/USDT -> BTCUSDT)
      const formattedSymbol = symbol.replace("/", "")

      // Fetch ticker data
      const response = await fetch(`/api/bitget?endpoint=/spot/v1/market/ticker&symbol=${formattedSymbol}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.status}`)
      }

      const data = await response.json()

      if (data.code === "00000" && data.data) {
        const ticker = data.data

        // Calculate price change
        const priceChange = Number.parseFloat(ticker.close) - Number.parseFloat(ticker.open)
        const priceChangePercent = ((priceChange / Number.parseFloat(ticker.open)) * 100).toFixed(2)

        setMarketData({
          lastPrice: ticker.close,
          bidPrice: ticker.bestBid,
          askPrice: ticker.bestAsk,
          high24h: ticker.high24h,
          low24h: ticker.low24h,
          volume24h: Number.parseFloat(ticker.baseVolume),
          priceChange,
          priceChangePercent,
          marketCap: Number.parseFloat(ticker.quoteVolume) * 20, // Estimated market cap
          fundingRate: (Math.random() * 0.1 - 0.05).toFixed(4), // Placeholder for funding rate
        })
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
    }
  }, [])

  // Function to fetch orderbook data
  const fetchOrderbook = useCallback(async (symbol: string) => {
    try {
      // Format symbol for API
      const formattedSymbol = symbol.replace("/", "")

      // Fetch orderbook data
      const response = await fetch(`/api/bitget?endpoint=/spot/v1/market/depth&symbol=${formattedSymbol}&limit=10`)

      if (!response.ok) {
        throw new Error(`Failed to fetch orderbook: ${response.status}`)
      }

      const data = await response.json()

      if (data.code === "00000" && data.data) {
        const book = data.data

        // Process asks and bids
        const asks: OrderbookEntry[] = book.asks.map((ask: string[]) => {
          const price = Number.parseFloat(ask[0])
          const amount = Number.parseFloat(ask[1])
          return {
            price: price.toFixed(2),
            amount: amount.toFixed(4),
            total: (price * amount).toFixed(2),
          }
        })

        const bids: OrderbookEntry[] = book.bids.map((bid: string[]) => {
          const price = Number.parseFloat(bid[0])
          const amount = Number.parseFloat(bid[1])
          return {
            price: price.toFixed(2),
            amount: amount.toFixed(4),
            total: (price * amount).toFixed(2),
          }
        })

        setOrderbook({ asks, bids })
      }
    } catch (error) {
      console.error("Error fetching orderbook:", error)
    }
  }, [])

  // Function to fetch recent trades
  const fetchRecentTrades = useCallback(async (symbol: string) => {
    try {
      // Format symbol for API
      const formattedSymbol = symbol.replace("/", "")

      // Fetch recent trades
      const response = await fetch(`/api/bitget?endpoint=/spot/v1/market/fills&symbol=${formattedSymbol}&limit=20`)

      if (!response.ok) {
        throw new Error(`Failed to fetch trades: ${response.status}`)
      }

      const data = await response.json()

      if (data.code === "00000" && data.data) {
        const trades = data.data.map((trade: any) => {
          const price = Number.parseFloat(trade.price)
          const amount = Number.parseFloat(trade.size)
          return {
            price: price.toFixed(2),
            amount: amount.toFixed(4),
            value: (price * amount).toFixed(2),
            side: trade.side.toLowerCase(),
            time: new Date(Number.parseInt(trade.timestamp)).toLocaleTimeString(),
          }
        })

        setRecentTrades(trades)
      }
    } catch (error) {
      console.error("Error fetching recent trades:", error)
    }
  }, [])

  // Function to fetch top trading pairs
  const fetchTopPairs = useCallback(async () => {
    try {
      // Fetch top trading pairs
      const response = await fetch(`/api/bitget?endpoint=/spot/v1/market/tickers`)

      if (!response.ok) {
        throw new Error(`Failed to fetch top pairs: ${response.status}`)
      }

      const data = await response.json()

      if (data.code === "00000" && data.data) {
        // Sort by volume and take top 10
        const sortedPairs = data.data
          .sort((a: any, b: any) => Number.parseFloat(b.baseVolume) - Number.parseFloat(a.baseVolume))
          .slice(0, 10)
          .map((pair: any) => {
            const price = Number.parseFloat(pair.close)
            const priceChange = Number.parseFloat(pair.close) - Number.parseFloat(pair.open)
            const priceChangePercent = ((priceChange / Number.parseFloat(pair.open)) * 100).toFixed(2)
            const volume = Number.parseFloat(pair.baseVolume)

            return {
              symbol: pair.symbol,
              price: price.toFixed(price < 1 ? 4 : 2),
              change: `${priceChangePercent}%`,
              volume: `$${(volume * price).toFixed(0)}`,
            }
          })

        setTopPairs(sortedPairs)
      }
    } catch (error) {
      console.error("Error fetching top pairs:", error)
    }
  }, [])

  // Function to refresh all data
  const refreshData = useCallback(() => {
    setIsLoading(true)

    Promise.all([fetchMarketData(pair), fetchOrderbook(pair), fetchRecentTrades(pair), fetchTopPairs()]).finally(() => {
      setIsLoading(false)
    })
  }, [pair, fetchMarketData, fetchOrderbook, fetchRecentTrades, fetchTopPairs])

  // Initial data load
  useEffect(() => {
    refreshData()

    // Set up interval to refresh data every 10 seconds
    const interval = setInterval(refreshData, 10000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [refreshData])

  return {
    marketData,
    orderbook,
    recentTrades,
    topPairs,
    isLoading,
    refreshData,
  }
}