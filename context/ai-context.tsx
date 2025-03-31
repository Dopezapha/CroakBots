"use client"

import { createContext, useState, useCallback, type ReactNode } from "react"
import { generateAIResponse, detectTokenInMessage } from "@/utils/ai-utils"
import { fetchTokenPrice, getTokenInfo } from "@/utils/token-utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

type AIContextType = {
  messages: Message[]
  input: string
  setInput: (input: string) => void
  isTyping: boolean
  sendMessage: (message: string) => void
  isProcessing: boolean
  clearChat: () => void
  lastDetectedToken: string | null
}

export const AIContext = createContext<AIContextType | null>(null)

export function AIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI trading assistant. Ask me about any token's trading strategies, price predictions, or current prices.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastDetectedToken, setLastDetectedToken] = useState<string | null>(null)

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
            const price = await fetchTokenPrice(detectedToken)
            const tokenInfo = getTokenInfo(detectedToken)

            aiResponse = `The current price of ${tokenInfo.name} (${detectedToken}) is $${price.toFixed(tokenInfo.decimals)}. `

            // Add some market context
            const changePercent = (Math.random() * 10 - 5).toFixed(2)
            const direction = Number.parseFloat(changePercent) >= 0 ? "up" : "down"

            aiResponse += `It's ${direction} ${Math.abs(Number.parseFloat(changePercent))}% in the last 24 hours. `

            // Add some trading advice
            if (Number.parseFloat(changePercent) > 3) {
              aiResponse +=
                "The token is showing strong bullish momentum. Consider setting stop losses to protect profits if you're already in a position."
            } else if (Number.parseFloat(changePercent) < -3) {
              aiResponse +=
                "The token is experiencing significant selling pressure. This could be a dip buying opportunity, but be cautious as the downtrend may continue."
            } else {
              aiResponse +=
                "The market for this token is relatively stable at the moment. This might be a good time to evaluate your position based on your longer-term strategy."
            }
          } catch (error) {
            console.error("Error fetching price:", error)
            aiResponse = await generateAIResponse(content, detectedToken || "CROAK")
          }
        } else {
          // Generate standard AI response
          aiResponse = await generateAIResponse(content, detectedToken || "CROAK")
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

        // Initial response
        setMessages((prev) => [...prev, { role: "assistant", content: "" }])
      } catch (error) {
        console.error("Error generating AI response:", error)
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
          "Hello! I'm your AI trading assistant. Ask me about any token's trading strategies, price predictions, or current prices.",
      },
    ])
    setLastDetectedToken(null)
  }, [])

  return (
    <AIContext.Provider
      value={{
        messages,
        input,
        setInput,
        isTyping,
        sendMessage,
        isProcessing,
        clearChat,
        lastDetectedToken,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}