"use client"

import { createContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { fetchTokenPrice } from "@/utils/token-utils"

type TokenContextType = {
  currentToken: string
  tokens: string[]
  selectToken: (token: string) => void
  tokenPrices: Record<string, number>
  isLoadingPrices: boolean
  refreshPrices: () => Promise<void>
}

export const TokenContext = createContext<TokenContextType | null>(null)

export function TokenProvider({ children }: { children: ReactNode }) {
  const [currentToken, setCurrentToken] = useState("CROAK")
  const [tokens, setTokens] = useState(["CROAK", "ETH", "BTC", "PEPE", "DOGE", "SHIB"])
  const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({})
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const selectToken = useCallback((token: string) => {
    setCurrentToken(token)
  }, [])

  const refreshPrices = useCallback(async () => {
    setIsLoadingPrices(true)
    try {
      const prices: Record<string, number> = {}

      // Fetch prices for all tokens in parallel
      await Promise.all(
        tokens.map(async (token) => {
          const price = await fetchTokenPrice(token)
          prices[token] = price
        }),
      )

      setTokenPrices(prices)
    } catch (error) {
      console.error("Error fetching token prices:", error)
    } finally {
      setIsLoadingPrices(false)
    }
  }, [tokens])

  // Initial price fetch
  useEffect(() => {
    refreshPrices()

    // Set up interval to refresh prices
    const interval = setInterval(() => {
      refreshPrices()
    }, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [refreshPrices])

  return (
    <TokenContext.Provider
      value={{
        currentToken,
        tokens,
        selectToken,
        tokenPrices,
        isLoadingPrices,
        refreshPrices,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}