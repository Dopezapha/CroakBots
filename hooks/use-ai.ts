"use client"

import { useState, useEffect, useCallback } from "react"
import { detectTokenInMessage, generateAIResponse } from "@/utils/ai-utils"
import { fetchTokenPrice, getTokenInfo, getTokenPriceChange } from "@/utils/token-utils"
import { fetchMarketInsights } from "@/utils/market-utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

type MarketInsight = {
  overview: string
  topMovers: Array<{ symbol: string; name: string; change: string }>
  supportResistance: Record<
    string,
    {
      current: string
      resistance1: string
      resistance2: string
      support1: string
      support2: string
    }
  >
}

export function useAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI trading assistant. Ask me about any token's price, trading strategies, or market analysis. I can provide real-time data and insights to help with your trading decisions.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastDetectedToken, setLastDetectedToken] = useState<string | null>(null)
  const [marketInsights, setMarketInsights] = useState<MarketInsight | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch market insights on component mount and refresh periodically
  useEffect(() => {
    const fetchAndSetMarketInsights = async () => {
      try {
        const insights = await fetchMarketInsights()
        setMarketInsights(insights)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch market insights:", err)
        setError("Unable to load market data. Please try again later.")
      }
    }

    // Initial fetch
    fetchAndSetMarketInsights()

    // Refresh every 5 minutes
    const intervalId = setInterval(fetchAndSetMarketInsights, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isTyping) return

      // Add user message
      const userMessage: Message = { role: "user", content }
      setMessages((prev) => [...prev, userMessage])
      setInput("")

      // Start typing indicator
      setIsTyping(true)
      setIsProcessing(true)

      try {
        // Detect token in message
        const detectedToken = detectTokenInMessage(content)
        if (detectedToken) {
          setLastDetectedToken(detectedToken)
        }

        // Check if asking for price
        const isPriceQuery =
          content.toLowerCase().includes("price") ||
          content.toLowerCase().includes("worth") ||
          content.toLowerCase().includes("value") ||
          content.toLowerCase().includes("cost") ||
          content.toLowerCase().includes("how much")

        let aiResponse = ""

        // If asking for price and we detected a token, get real price
        if (isPriceQuery && detectedToken) {
          try {
            const [price, tokenInfo, priceChange] = await Promise.all([
              fetchTokenPrice(detectedToken),
              getTokenInfo(detectedToken),
              getTokenPriceChange(detectedToken)
            ])

            aiResponse = `The current price of ${tokenInfo.name} (${detectedToken}) is $${formatPrice(price, tokenInfo.decimals)}. `

            // Add market context with real data
            const direction = priceChange >= 0 ? "up" : "down"
            aiResponse += `It's ${direction} ${Math.abs(priceChange).toFixed(2)}% in the last 24 hours. `

            // Add some trading advice based on actual price movement
            if (priceChange > 3) {
              aiResponse +=
                "The token is showing strong bullish momentum. Consider setting stop losses to protect profits if you're already in a position."
            } else if (priceChange < -3) {
              aiResponse +=
                "The token is experiencing significant selling pressure. This could be a dip buying opportunity, but be cautious as the downtrend may continue."
            } else {
              aiResponse +=
                "The market for this token is relatively stable at the moment. This might be a good time to evaluate your position based on your longer-term strategy."
            }
          } catch (error) {
            console.error("Error fetching token data:", error)
            // Fall back to AI-generated response
            aiResponse = await generateAIResponse(content, detectedToken || "CRYPTO")
          }
        } else {
          // Generate AI response for non-price queries
          aiResponse = await generateAIResponse(content, detectedToken || "CRYPTO")
        }

        // Add AI response with typing effect
        let displayedResponse = ""
        const fullResponse = aiResponse

        const typingInterval = setInterval(() => {
          if (displayedResponse.length < fullResponse.length) {
            displayedResponse = fullResponse.substring(0, displayedResponse.length + 3)
            setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: displayedResponse }])
          } else {
            clearInterval(typingInterval)
            setIsTyping(false)
            setIsProcessing(false)
          }
        }, 30)

        // Initial empty response that will be filled by the typing effect
        setMessages((prev) => [...prev, { role: "assistant", content: "" }])
      } catch (error) {
        console.error("Error processing message:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error processing your request. Please try again.",
          },
        ])
        setIsTyping(false)
        setIsProcessing(false)
      }
    },
    [isTyping],
  )

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI trading assistant. Ask me about any token's price, trading strategies, or market analysis. I can provide real-time data and insights to help with your trading decisions.",
      },
    ])
    setLastDetectedToken(null)
  }, [])

  // Add function to refresh market data manually
  const refreshMarketData = useCallback(async () => {
    setIsProcessing(true)
    try {
      const insights = await fetchMarketInsights()
      setMarketInsights(insights)
      setError(null)
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I've refreshed the market data with the latest information." 
        },
      ])
    } catch (err) {
      console.error("Failed to refresh market insights:", err)
      setError("Unable to refresh market data. Please try again later.")
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I couldn't refresh the market data right now. Please try again later." 
        },
      ])
    } finally {
      setIsProcessing(false)
    }
  }, [])

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    isProcessing,
    clearChat,
    lastDetectedToken,
    marketInsights,
    error,
    refreshMarketData,
  }
}

// Helper function for formatting prices
function formatPrice(price: number, decimals: number = 18): string {
  if (price < 0.00001) {
    return price.toExponential(4);
  }
  if (price < 0.001) {
    return price.toFixed(6);
  }
  if (price < 1) {
    return price.toFixed(4);
  }
  if (price < 100) {
    return price.toFixed(2);
  }
  return price.toFixed(0);
}
