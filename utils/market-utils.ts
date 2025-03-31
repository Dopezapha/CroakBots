/**
 * Market utilities for cryptocurrency data using CoinMarketCap API
 */

// Types for market data
export interface MarketData {
    price: number
    marketCap: number
    volume24h: number
    priceChangePercentage24h: number
    priceChangePercentage7d: number
    priceChangePercentage30d: number
    volumeChangePercentage24h: number
    marketCapRank?: number
    rsi: number
    macd: number
    movingAverage50d: number
    movingAverage200d: number
    supportLevel: number
    supportLevel2: number
    resistanceLevel: number
    resistanceLevel2: number
    btcCorrelation: number
    volatility: number
    supportTest?: boolean
    resistanceTest?: boolean
  }
  
  // Type for market insights
  export interface MarketInsight {
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
    priceChangePercentage24h: number
    sentiment: string
    additionalInfo: string
    rsi: number
    supportLevel: number
    resistanceLevel: number
    movingAverage50d: number
    movingAverage200d: number
  }
  
  // CoinMarketCap API base URL
  const CMC_API_BASE_URL = "https://pro-api.coinmarketcap.com/v1"
  
  /**
   * Fetches current price for a token using CoinMarketCap API
   * @param symbol Token symbol
   * @returns Current price in USD
   */
  export async function getTokenPrice(symbol: string): Promise<number> {
    try {
      const data = await fetchCoinMarketCapData(symbol)
      return data.price
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)
      throw new Error(`Failed to fetch price data for ${symbol}`)
    }
  }
  
  /**
   * Fetches comprehensive market data for a token using CoinMarketCap API
   * @param symbol Token symbol
   * @returns Object containing various market metrics
   */
  export async function getMarketData(symbol: string): Promise<MarketData> {
    try {
      const cmcData = await fetchCoinMarketCapData(symbol)
  
      // Calculate technical indicators (in a real implementation, you might use another API for this)
      const rsi = calculateSimulatedRSI(cmcData.priceChangePercentage24h)
      const volatility = (Math.abs(cmcData.priceChangePercentage24h) / 100) * 5 // Simple volatility estimate
  
      // Estimate support and resistance levels based on current price
      const price = cmcData.price
      const supportLevel = price * (1 - volatility * 2)
      const supportLevel2 = price * (1 - volatility * 3)
      const resistanceLevel = price * (1 + volatility * 2)
      const resistanceLevel2 = price * (1 + volatility * 3)
  
      // Estimate moving averages (in a real implementation, you would fetch historical data)
      const movingAverage50d = price * (1 + cmcData.priceChangePercentage7d / 200)
      const movingAverage200d = price * (1 + cmcData.priceChangePercentage30d / 400)
  
      return {
        ...cmcData,
        rsi,
        macd: ((cmcData.priceChangePercentage24h - cmcData.priceChangePercentage7d) / 100) * price, // Simple MACD estimate
        movingAverage50d,
        movingAverage200d,
        supportLevel,
        supportLevel2,
        resistanceLevel,
        resistanceLevel2,
        btcCorrelation: 0.7, // Default correlation, would need historical data to calculate
        volatility,
        supportTest: cmcData.priceChangePercentage24h < -3,
        resistanceTest: cmcData.priceChangePercentage24h > 3,
      }
    } catch (error) {
      console.error(`Error fetching market data for ${symbol}:`, error)
      throw new Error(`Failed to fetch market data for ${symbol}`)
    }
  }
  
  /**
   * Fetches market insights for a token
   * @param symbol Token symbol
   * @returns Market insights including sentiment and additional info
   */
  export async function fetchMarketInsights(symbol?: string): Promise<MarketInsight> {
    try {
      if (symbol) {
        // Fetch insights for a specific token
        const marketData = await getMarketData(symbol)
  
        // Generate sentiment based on market data
        let sentiment = ""
        if (marketData.rsi > 70) {
          sentiment = `The market sentiment for ${symbol} appears to be overbought with an RSI of ${marketData.rsi.toFixed(2)}.`
        } else if (marketData.rsi < 30) {
          sentiment = `The market sentiment for ${symbol} appears to be oversold with an RSI of ${marketData.rsi.toFixed(2)}.`
        } else if (marketData.priceChangePercentage24h > 5) {
          sentiment = `${symbol} is showing strong bullish momentum with a significant price increase in the last 24 hours.`
        } else if (marketData.priceChangePercentage24h < -5) {
          sentiment = `${symbol} is showing bearish pressure with a notable price decrease in the last 24 hours.`
        } else {
          sentiment = `${symbol} is currently showing relatively stable price action.`
        }
  
        // Generate additional insights
        const additionalInfo = `Technical indicators show support levels around $${formatPrice(marketData.supportLevel)} and resistance at $${formatPrice(marketData.resistanceLevel)}.`
  
        return {
          overview: `Market overview for ${symbol}`,
          topMovers: [{ symbol, name: symbol, change: `${marketData.priceChangePercentage24h.toFixed(2)}%` }],
          supportResistance: {
            [symbol]: {
              current: formatPrice(marketData.price),
              resistance1: formatPrice(marketData.resistanceLevel),
              resistance2: formatPrice(marketData.resistanceLevel2),
              support1: formatPrice(marketData.supportLevel),
              support2: formatPrice(marketData.supportLevel2),
            },
          },
          priceChangePercentage24h: marketData.priceChangePercentage24h,
          sentiment,
          additionalInfo,
          rsi: marketData.rsi,
          supportLevel: marketData.supportLevel,
          resistanceLevel: marketData.resistanceLevel,
          movingAverage50d: marketData.movingAverage50d,
          movingAverage200d: marketData.movingAverage200d,
        }
      } else {
        // Fetch general market insights
        const topCryptos = await fetchTopCryptos(5)
  
        return {
          overview: "Cryptocurrency markets overview based on CoinMarketCap data.",
          topMovers: topCryptos.map((crypto) => ({
            symbol: crypto.symbol,
            name: crypto.name,
            change: `${crypto.priceChangePercentage24h.toFixed(2)}%`,
          })),
          supportResistance: topCryptos.reduce(
            (acc, crypto) => {
              const price = crypto.price
              const volatility = (Math.abs(crypto.priceChangePercentage24h) / 100) * 5
  
              acc[crypto.symbol] = {
                current: formatPrice(price),
                resistance1: formatPrice(price * (1 + volatility * 2)),
                resistance2: formatPrice(price * (1 + volatility * 3)),
                support1: formatPrice(price * (1 - volatility * 2)),
                support2: formatPrice(price * (1 - volatility * 3)),
              }
  
              return acc
            },
            {} as Record<string, any>,
          ),
          priceChangePercentage24h: topCryptos[0]?.priceChangePercentage24h || 0,
          sentiment: "The overall market sentiment is based on CoinMarketCap data.",
          additionalInfo: `Global crypto market data provided by CoinMarketCap as of ${new Date().toISOString().split("T")[0]}.`,
          rsi: 50, // Default value
          supportLevel: 0,
          resistanceLevel: 0,
          movingAverage50d: 0,
          movingAverage200d: 0,
        }
      }
    } catch (error) {
      console.error(`Error fetching market insights:`, error)
      throw new Error(`Failed to fetch market insights`)
    }
  }
  
  /**
   * Fetches data from CoinMarketCap API for a specific token
   * @param symbol Token symbol
   * @returns Processed market data
   */
  async function fetchCoinMarketCapData(symbol: string): Promise<{
    price: number
    marketCap: number
    volume24h: number
    priceChangePercentage24h: number
    priceChangePercentage7d: number
    priceChangePercentage30d: number
    volumeChangePercentage24h: number
    marketCapRank?: number
  }> {
    try {
      // CoinMarketCap API requires the API key in the headers
      const headers = {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
        Accept: "application/json",
      }
  
      // Make the API call to get latest quotes
      const response = await fetch(`${CMC_API_BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbol}`, { headers })
  
      if (!response.ok) {
        throw new Error(`CoinMarketCap API error: ${response.status}`)
      }
  
      const data = await response.json()
  
      // CoinMarketCap API returns data in a specific structure
      const tokenData = data.data[symbol]
      if (!tokenData) {
        throw new Error(`Token ${symbol} not found in CoinMarketCap data`)
      }
  
      const quote = tokenData.quote.USD
  
      return {
        price: quote.price,
        marketCap: quote.market_cap,
        volume24h: quote.volume_24h,
        priceChangePercentage24h: quote.percent_change_24h,
        priceChangePercentage7d: quote.percent_change_7d,
        priceChangePercentage30d: quote.percent_change_30d,
        volumeChangePercentage24h: quote.volume_change_24h || 0,
        marketCapRank: tokenData.cmc_rank,
      }
    } catch (error) {
      console.error(`Error fetching CoinMarketCap data for ${symbol}:`, error)
  
      // Fallback to simulated data if API call fails
      console.warn(`Falling back to simulated data for ${symbol}`)
      return simulateMarketData(symbol)
    }
  }
  
  /**
   * Fetches top cryptocurrencies by market cap
   * @param limit Number of cryptocurrencies to fetch
   * @returns Array of top cryptocurrencies with market data
   */
  async function fetchTopCryptos(limit = 10): Promise<
    Array<{
      symbol: string
      name: string
      price: number
      priceChangePercentage24h: number
    }>
  > {
    try {
      // CoinMarketCap API requires the API key in the headers
      const headers = {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
        Accept: "application/json",
      }
  
      // Make the API call to get latest listings
      const response = await fetch(`${CMC_API_BASE_URL}/cryptocurrency/listings/latest?limit=${limit}&convert=USD`, {
        headers,
      })
  
      if (!response.ok) {
        throw new Error(`CoinMarketCap API error: ${response.status}`)
      }
  
      const data = await response.json()
  
      // Process the response data
      return data.data.map((crypto: any) => ({
        symbol: crypto.symbol,
        name: crypto.name,
        price: crypto.quote.USD.price,
        priceChangePercentage24h: crypto.quote.USD.percent_change_24h,
      }))
    } catch (error) {
      console.error(`Error fetching top cryptocurrencies:`, error)
  
      // Fallback to simulated data
      console.warn("Falling back to simulated top cryptocurrencies")
      return [
        { symbol: "BTC", name: "Bitcoin", price: 65000, priceChangePercentage24h: 2.3 },
        { symbol: "ETH", name: "Ethereum", price: 3500, priceChangePercentage24h: 1.7 },
        { symbol: "USDT", name: "Tether", price: 1, priceChangePercentage24h: 0.1 },
        { symbol: "BNB", name: "Binance Coin", price: 580, priceChangePercentage24h: 0.8 },
        { symbol: "SOL", name: "Solana", price: 150, priceChangePercentage24h: 5.2 },
      ].slice(0, limit)
    }
  }
  
  /**
   * Calculate a simulated RSI value based on price change
   * @param priceChange24h 24-hour price change percentage
   * @returns Simulated RSI value (0-100)
   */
  function calculateSimulatedRSI(priceChange24h: number): number {
    // This is a very simplified RSI calculation for demonstration
    // In a real implementation, you would use historical price data
    const baseRSI = 50 // Neutral RSI
    const impact = priceChange24h * 1.5 // Price change impact on RSI
  
    let rsi = baseRSI + impact
  
    // Ensure RSI is within 0-100 range
    rsi = Math.max(0, Math.min(100, rsi))
  
    return rsi
  }
  
  /**
   * Format price based on its value
   * @param price The price to format
   * @returns Formatted price string
   */
  export function formatPrice(price: number): string {
    if (price < 0.00001) {
      return price.toExponential(4)
    }
    if (price < 0.001) {
      return price.toFixed(6)
    }
    if (price < 1) {
      return price.toFixed(4)
    }
    if (price < 100) {
      return price.toFixed(2)
    }
    return price.toFixed(0)
  }
  
  /**
   * Format large numbers with K, M, B suffixes
   * @param num Number to format
   * @returns Formatted string with appropriate suffix
   */
  export function formatLargeNumber(num: number): string {
    if (num >= 1e12) {
      return `$${(num / 1e12).toFixed(2)}T`
    }
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`
    }
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`
    }
    if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(2)}K`
    }
    return `$${num.toFixed(2)}`
  }
  
  /**
   * Simulated market data for fallback when API calls fail
   * @param symbol Token symbol
   * @returns Simulated market data
   */
  function simulateMarketData(symbol: string): {
    price: number
    marketCap: number
    volume24h: number
    priceChangePercentage24h: number
    priceChangePercentage7d: number
    priceChangePercentage30d: number
    volumeChangePercentage24h: number
  } {
    // This is just a placeholder - used as fallback when API calls fail
    const basePrice =
      {
        BTC: 65000,
        ETH: 3500,
        USDT: 1,
        USDC: 1,
        BNB: 580,
        XRP: 0.5,
        ADA: 0.45,
        SOL: 150,
        DOGE: 0.14,
        DOT: 7.5,
        AVAX: 35,
        MATIC: 0.7,
        SHIB: 0.000024,
        LTC: 80,
        LINK: 18,
        UNI: 10,
        ATOM: 9,
        XLM: 0.12,
        ALGO: 0.18,
        NEAR: 5.5,
        CROAK: 0.00005,
        PEPE: 0.000002,
        FLOKI: 0.0002,
        BONK: 0.00003,
        WIF: 0.55,
      }[symbol] || 0.1
  
    // Add some randomness
    const variance = 0.05 // 5% variance
    const randomFactor = 1 + (Math.random() * variance * 2 - variance)
    const price = basePrice * randomFactor
  
    const isMajor = ["BTC", "ETH", "USDT", "BNB", "SOL"].includes(symbol)
    const isMemecoin = ["DOGE", "SHIB", "PEPE", "CROAK", "BONK", "FLOKI", "WIF"].includes(symbol)
  
    // Generate plausible market data
    const marketCap = isMajor
      ? price * (Math.random() * 900 + 100) * 1e9
      : isMemecoin
        ? price * (Math.random() * 90 + 10) * 1e9
        : price * (Math.random() * 9 + 1) * 1e9
  
    const volume24h = marketCap * (Math.random() * 0.3 + 0.05)
  
    return {
      price,
      marketCap,
      volume24h,
      priceChangePercentage24h: Math.random() * 20 - 10,
      priceChangePercentage7d: Math.random() * 40 - 20,
      priceChangePercentage30d: Math.random() * 60 - 30,
      volumeChangePercentage24h: Math.random() * 30 - 15,
    }
  }
  
  /**
   * Fetches market data for a token - with the full interface needed by token-utils
   * @param symbol Token symbol
   * @returns Market data in the format needed by token-utils
   */
  export async function fetchMarketData(symbol: string): Promise<{
    price: number
    marketCap: number
    volume24h: number
  }> {
    try {
      const data = await fetchCoinMarketCapData(symbol)
      return {
        price: data.price,
        marketCap: data.marketCap,
        volume24h: data.volume24h,
      }
    } catch (error) {
      console.error(`Error in fetchMarketData for ${symbol}:`, error)
      // Fallback to simulated data
      const simData = simulateMarketData(symbol)
      return {
        price: simData.price,
        marketCap: simData.marketCap,
        volume24h: simData.volume24h,
      }
    }
  }
  
  