import { NextResponse } from "next/server"
import crypto from "crypto"
import { OpenAI } from "openai"

// Initialize the OpenAI client server-side
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// This would be your Bitget API credentials from environment variables
const API_KEY = process.env.BITGET_API_KEY || ""
const API_SECRET = process.env.BITGET_API_SECRET || ""
const API_PASSPHRASE = process.env.BITGET_API_PASSPHRASE || ""

// Base URL for Bitget API
const BASE_URL = "https://api.bitget.com"

// Helper function to generate signature for Bitget API
function generateSignature(timestamp: string, method: string, requestPath: string, body = "") {
  const message = timestamp + method + requestPath + body
  return crypto.createHmac("sha256", API_SECRET).update(message).digest("base64")
}

// Helper function to make authenticated requests to Bitget API
async function makeRequest(method: string, endpoint: string, params: any = {}) {
  const timestamp = Date.now().toString()
  const requestPath = `/api/v2${endpoint}`

  // Convert params to query string for GET requests or stringify for POST
  let queryString = ""
  let body = ""

  if (method === "GET" && Object.keys(params).length > 0) {
    queryString = "?" + new URLSearchParams(params).toString()
  } else if (method !== "GET" && Object.keys(params).length > 0) {
    body = JSON.stringify(params)
  }

  const signature = generateSignature(timestamp, method, requestPath + queryString, body)

  const headers = {
    "ACCESS-KEY": API_KEY,
    "ACCESS-SIGN": signature,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-PASSPHRASE": API_PASSPHRASE,
    "Content-Type": "application/json",
  }

  try {
    const response = await fetch(`${BASE_URL}${requestPath}${queryString}`, {
      method,
      headers,
      body: body || undefined,
    })

    if (!response.ok) {
      throw new Error(`Bitget API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error making request to Bitget API:", error)
    throw error
  }
}

// API route handler for getting market data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint parameter is required" }, { status: 400 })
  }

  try {
    // Extract additional parameters from the request
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        params[key] = value
      }
    })

    // Make the request to Bitget API
    const data = await makeRequest("GET", endpoint, params)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in Bitget API route:", error)
    return NextResponse.json({ error: "Failed to fetch data from Bitget API" }, { status: 500 })
  }
}

// API route handler for placing orders and handling AI requests
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Check if this is an AI request
    if (body.type === "ai") {
      const { prompt, token, queryType, tokenInfo, marketInsights } = body

      // Create context with token and market data for the AI
      const context = `
        Token: ${tokenInfo?.name || token} (${token})
        Current Price: $${tokenInfo?.priceFormatted || "Unknown"}
        Market Cap: ${tokenInfo?.marketCapFormatted || "Unknown"}
        24h Volume: ${tokenInfo?.volume24hFormatted || "Unknown"}
        24h Change: ${marketInsights?.priceChangePercentage24h?.toFixed(2) || "Unknown"}%
        Category: ${tokenInfo?.category || "Unknown"}
        Description: ${tokenInfo?.description || "Unknown"}
      `

      // Generate response using OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a cryptocurrency trading assistant. Provide helpful, accurate information about cryptocurrencies based on the market data provided.
            
            Important guidelines:
            - Never make specific price predictions or give financial advice
            - Always include disclaimers when discussing trading strategies
            - Keep responses concise and focused on the data provided
            - For price queries, emphasize current price, recent changes, and market context
            - For trading strategy queries, focus on risk management and technical indicators
            - For general information queries, provide factual information about the token
            - Current date: ${new Date().toISOString().split("T")[0]}`,
          },
          {
            role: "user",
            content: `Based on this market data: ${context}\n\nThe user is asking about ${queryType} for ${token}. Their query is: "${prompt}"`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      return NextResponse.json({
        text: completion.choices[0].message.content || "I couldn't generate a response. Please try again.",
      })
    } else {
      // Handle regular Bitget API requests
      const { endpoint, ...params } = body

      if (!endpoint) {
        return NextResponse.json({ error: "Endpoint parameter is required" }, { status: 400 })
      }

      // Make the request to Bitget API
      const data = await makeRequest("POST", endpoint, params)

      return NextResponse.json(data)
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

