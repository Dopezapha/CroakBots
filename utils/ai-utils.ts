import { detectTokenInMessage as detectToken } from "./token-utils"
import { getTokenInfo } from "./token-utils"
import { fetchMarketInsights } from "./market-utils"

/**
 * Detects if a cryptocurrency token is mentioned in a message
 * @param message The user message to analyze
 * @returns The detected token symbol or null if none found
 */
export function detectTokenInMessage(message: string): string | null {
  return detectToken(message)
}

/**
 * Generates an AI response about a cryptocurrency token using OpenAI
 * @param prompt The user's original query
 * @param token The detected token symbol
 * @returns A response with market data and insights
 */
export async function generateAIResponse(prompt: string, token: string): Promise<string> {
  try {
    // Get token information and market data
    const tokenInfo = await getTokenInfo(token)
    const marketInsights = await fetchMarketInsights(token)

    // Determine the type of query to help guide the AI response
    const queryType = determineQueryType(prompt)

    // Call our server-side API route instead of directly using OpenAI
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "ai", // Indicate this is an AI request
        prompt,
        token,
        queryType,
        tokenInfo,
        marketInsights,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate AI response")
    }

    const data = await response.json()
    return data.text || "I couldn't generate a response. Please try again."
  } catch (error) {
    console.error(`Error generating response for ${token}:`, error)
    return `I couldn't retrieve the latest data for ${token}. Please try again later or check if the token symbol is correct.`
  }
}

/**
 * Determines the type of query being asked
 * @param prompt The user's query
 * @returns The query category
 */
function determineQueryType(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()

  if (
    lowerPrompt.includes("price") ||
    lowerPrompt.includes("worth") ||
    lowerPrompt.includes("value") ||
    lowerPrompt.includes("cost")
  ) {
    return "price information"
  }

  if (
    lowerPrompt.includes("trading") ||
    lowerPrompt.includes("strategy") ||
    lowerPrompt.includes("buy") ||
    lowerPrompt.includes("sell") ||
    lowerPrompt.includes("invest")
  ) {
    return "trading strategy"
  }

  if (
    lowerPrompt.includes("chart") ||
    lowerPrompt.includes("technical") ||
    lowerPrompt.includes("analysis") ||
    lowerPrompt.includes("pattern")
  ) {
    return "technical analysis"
  }

  if (lowerPrompt.includes("what is") || lowerPrompt.includes("tell me about") || lowerPrompt.includes("explain")) {
    return "general information"
  }

  if (
    lowerPrompt.includes("news") ||
    lowerPrompt.includes("recent") ||
    lowerPrompt.includes("development") ||
    lowerPrompt.includes("update")
  ) {
    return "recent news and developments"
  }

  return "general information"
}

/**
 * Generates a response focused on price information
 */
export function generatePriceResponse(token: string, tokenInfo: any, marketInsights: any): string {
  const priceChange =
    marketInsights.priceChangePercentage24h > 0
      ? `up ${marketInsights.priceChangePercentage24h.toFixed(2)}%`
      : `down ${Math.abs(marketInsights.priceChangePercentage24h).toFixed(2)}%`

  return `${tokenInfo.name} (${token}) is currently trading at $${tokenInfo.priceFormatted}. The price has gone ${priceChange} in the last 24 hours.

Market Cap: ${tokenInfo.marketCapFormatted}
24h Trading Volume: ${tokenInfo.volume24hFormatted}

${marketInsights.sentiment}`
}

/**
 * Generates a response focused on general token information
 */
export function generateInfoResponse(token: string, tokenInfo: any, marketInsights: any): string {
  return `${tokenInfo.name} (${token}) is a ${tokenInfo.category} cryptocurrency currently trading at $${tokenInfo.priceFormatted}.

${tokenInfo.description}

Market Cap: ${tokenInfo.marketCapFormatted}
24h Trading Volume: ${tokenInfo.volume24hFormatted}
24h Price Change: ${marketInsights.priceChangePercentage24h > 0 ? "+" : ""}${marketInsights.priceChangePercentage24h.toFixed(2)}%

${marketInsights.additionalInfo}`
}

/**
 * Generates a response focused on trading strategies
 */
export function generateTradingResponse(token: string, tokenInfo: any, marketInsights: any): string {
  return `For trading ${tokenInfo.name} (${token}), which is currently priced at $${tokenInfo.priceFormatted}, consider the following:

Market cap: ${tokenInfo.marketCapFormatted}
24h volume: ${tokenInfo.volume24hFormatted}
24h change: ${marketInsights.priceChangePercentage24h.toFixed(2)}%

When developing a trading strategy for ${token}, consider:

1. Position sizing: Risk no more than 1-2% of your portfolio on a single trade
2. Entry points: Current support levels are around $${marketInsights.supportLevel}
3. Exit points: Consider taking profits near resistance at $${marketInsights.resistanceLevel}
4. Stop losses: Place 5-10% below your entry depending on market volatility

This information is for educational purposes only and should not be considered financial advice.`
}

/**
 * Generates a response focused on chart analysis
 */
export function generateChartResponse(token: string, tokenInfo: any, marketInsights: any): string {
  return `Technical analysis for ${tokenInfo.name} (${token}) at $${tokenInfo.priceFormatted}:

Key indicators:
- RSI: ${marketInsights.rsi.toFixed(2)} (${getRsiInterpretation(marketInsights.rsi)})
- 50-day MA: $${marketInsights.movingAverage50d.toFixed(2)}
- 200-day MA: $${marketInsights.movingAverage200d.toFixed(2)}

Support levels: $${marketInsights.supportLevel.toFixed(2)}, $${marketInsights.supportLevel2.toFixed(2)}
Resistance levels: $${marketInsights.resistanceLevel.toFixed(2)}, $${marketInsights.resistanceLevel2.toFixed(2)}

This analysis is based on current market data and should not be considered financial advice.`
}

/**
 * Generates a general response about the token
 */
export function generateGeneralResponse(token: string, tokenInfo: any, marketInsights: any): string {
  return `${tokenInfo.name} (${token}) is currently trading at $${tokenInfo.priceFormatted}.

Category: ${tokenInfo.category}
Market Cap: ${tokenInfo.marketCapFormatted}
24h Trading Volume: ${tokenInfo.volume24hFormatted}
24h Price Change: ${marketInsights.priceChangePercentage24h > 0 ? "+" : ""}${marketInsights.priceChangePercentage24h.toFixed(2)}%

${marketInsights.sentiment}

${marketInsights.additionalInfo}`
}

/**
 * Get interpretation of RSI value
 */
export function getRsiInterpretation(rsi: number): string {
  if (rsi > 70) return "overbought conditions"
  if (rsi < 30) return "oversold conditions"
  if (rsi > 60) return "bullish momentum"
  if (rsi < 40) return "bearish momentum"
  return "neutral territory"
}

