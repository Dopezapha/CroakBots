import { fetchMarketData } from './market-utils';

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  category: string;
  description: string;
  logoUrl?: string;
  price?: number;
  priceFormatted?: string;
  marketCap?: number;
  marketCapFormatted?: string;
  volume24h?: number;
  volume24hFormatted?: string;
}

// Token database with information about various tokens
export const TOKEN_DATABASE: Record<string, TokenInfo> = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    category: "Layer 1",
    description: "The original cryptocurrency and largest by market capitalization.",
    logoUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png"
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    category: "Layer 1",
    description: "A decentralized platform that enables smart contracts and dApps.",
    logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
  },
  USDT: {
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
    category: "Stablecoin",
    description: "A stablecoin pegged to the US dollar.",
    logoUrl: "https://assets.coingecko.com/coins/images/325/small/Tether.png"
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    category: "Stablecoin",
    description: "A fully collateralized US dollar stablecoin.",
    logoUrl: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"
  },
  BNB: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
    category: "Exchange Token",
    description: "The native token of the Binance exchange and BNB Chain.",
    logoUrl: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"
  },
  XRP: {
    name: "XRP",
    symbol: "XRP",
    decimals: 6,
    category: "Payment",
    description: "Digital asset designed for payments and financial institutions.",
    logoUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png"
  },
  ADA: {
    name: "Cardano",
    symbol: "ADA",
    decimals: 6,
    category: "Layer 1",
    description: "Proof-of-stake blockchain platform with a focus on security and sustainability.",
    logoUrl: "https://assets.coingecko.com/coins/images/975/small/cardano.png"
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
    category: "Layer 1",
    description: "High-performance blockchain supporting smart contracts and dApps.",
    logoUrl: "https://assets.coingecko.com/coins/images/4128/small/solana.png"
  },
  DOGE: {
    name: "Dogecoin",
    symbol: "DOGE",
    decimals: 8,
    category: "Memecoin",
    description: "Originally created as a joke, now one of the most popular memecoins.",
    logoUrl: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png"
  },
  DOT: {
    name: "Polkadot",
    symbol: "DOT",
    decimals: 10,
    category: "Layer 1",
    description: "Multi-chain network enabling cross-blockchain transfers of any data or asset.",
    logoUrl: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png"
  },
  // Add more tokens as needed...
  CROAK: {
    name: "Croak",
    symbol: "CROAK",
    decimals: 18,
    category: "Memecoin",
    description: "Premier memecoin on the Linea network with a strong community focus.",
  },
  PEPE: {
    name: "Pepe",
    symbol: "PEPE",
    decimals: 18,
    category: "Memecoin",
    description: "Ethereum-based memecoin inspired by the Pepe the Frog meme.",
    logoUrl: "https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg"
  },
  FLOKI: {
    name: "Floki",
    symbol: "FLOKI",
    decimals: 9,
    category: "Memecoin",
    description: "Multi-chain memecoin with utility and ecosystem development.",
    logoUrl: "https://assets.coingecko.com/coins/images/16746/small/FLOKI.png"
  },
  BONK: {
    name: "Bonk",
    symbol: "BONK",
    decimals: 5,
    category: "Memecoin",
    description: "Solana-based dog-themed memecoin with community focus.",
    logoUrl: "https://assets.coingecko.com/coins/images/28600/small/bonk.jpg"
  },
  WIF: {
    name: "Dogwifhat",
    symbol: "WIF",
    decimals: 9,
    category: "Memecoin",
    description: "Solana-based memecoin featuring a dog wearing a hat.",
    logoUrl: "https://assets.coingecko.com/coins/images/33969/small/wif.png"
  }
};

// Comprehensive list of token symbols
export const KNOWN_TOKENS = Object.keys(TOKEN_DATABASE);

/**
 * Detect token mention in a message
 * @param message User message to analyze
 * @returns Detected token symbol or null if no token found
 */
export function detectTokenInMessage(message: string): string | null {
  if (!message || typeof message !== 'string') {
    return null;
  }

  // Convert message to uppercase for case-insensitive matching
  const upperMessage = message.toUpperCase();
  
  // Check for token symbols with $ prefix (highest priority)
  const dollarMatches = upperMessage.match(/\$([A-Z]{2,10})/g);
  if (dollarMatches) {
    for (const match of dollarMatches) {
      const symbol = match.substring(1); // Remove $
      if (KNOWN_TOKENS.includes(symbol)) {
        return symbol;
      }
    }
  }
  
  // Create a mapping of token names to symbols
  const tokenNameMap: Record<string, string> = {};
  for (const [symbol, info] of Object.entries(TOKEN_DATABASE)) {
    tokenNameMap[info.name.toLowerCase()] = symbol;
    
    // Add common variations
    switch (symbol) {
      case "BTC":
        tokenNameMap["bitcoin"] = symbol;
        break;
      case "ETH":
        tokenNameMap["ethereum"] = symbol;
        tokenNameMap["ether"] = symbol;
        break;
      // Add more variations as needed...
    }
  }
  
  // Check for token names
  const lowerMessage = message.toLowerCase();
  for (const [name, symbol] of Object.entries(tokenNameMap)) {
    if (lowerMessage.includes(name)) {
      return symbol;
    }
  }
  
  // Check for standalone token symbols (lowest priority)
  for (const token of KNOWN_TOKENS) {
    const regex = new RegExp(`\\b${token}\\b`, "i");
    if (regex.test(message)) {
      return token;
    }
  }
  
  return null;
}

/**
 * Get token information
 * @param token Token symbol
 * @returns Token information
 */
export async function getTokenInfo(token: string): Promise<TokenInfo> {
  if (!token) {
    throw new Error("Token symbol is required");
  }
  
  const upperToken = token.toUpperCase();
  
  // Get basic token info
  const tokenInfo = TOKEN_DATABASE[upperToken] || {
    name: upperToken,
    symbol: upperToken,
    decimals: 18,
    category: "Unknown",
    description: "Information not available for this token.",
  };
  
  // Fetch market data
  const { price, marketCap, volume24h } = await fetchMarketData(upperToken);
  
  return {
    ...tokenInfo,
    price,
    priceFormatted: formatPrice(price, tokenInfo.decimals),
    marketCap,
    marketCapFormatted: formatLargeNumber(marketCap),
    volume24h,
    volume24hFormatted: formatLargeNumber(volume24h)
  };
}

/**
 * Fetch token price
 * @param token Token symbol
 * @returns Current price in USD
 */
export async function fetchTokenPrice(token: string): Promise<number> {
  const { price } = await fetchMarketData(token);
  return price;
}

/**
 * Get token price change over a period
 * @param token Token symbol
 * @param period Time period (24h, 7d, 30d)
 * @returns Price change percentage
 */
export async function getTokenPriceChange(token: string, period: '24h' | '7d' | '30d' = '24h'): Promise<number> {
  // This would normally fetch from an API, but we'll simulate it
  const marketData = await fetchMarketData(token);
  
  // Simulate different periods
  switch(period) {
    case '24h':
      return Math.random() * 20 - 10; // -10% to +10%
    case '7d':
      return Math.random() * 40 - 20; // -20% to +20%
    case '30d':
      return Math.random() * 60 - 30; // -30% to +30%
    default:
      return 0;
  }
}

/**
 * Format price based on value and decimals
 * @param price Token price in USD
 * @param decimals Token decimals
 * @returns Formatted price string
 */
export function formatPrice(price: number, decimals: number = 18): string {
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

/**
 * Format large numbers with K, M, B suffixes
 * @param num Number to format
 * @returns Formatted string with appropriate suffix
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T";
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  }
  return num.toFixed(2);
}

/**
 * Get token logo URL
 * @param token Token symbol
 * @returns Logo URL or default image URL
 */
export function getTokenLogo(token: string): string {
  const upperToken = token.toUpperCase();
  const tokenInfo = TOKEN_DATABASE[upperToken];
  
  if (tokenInfo && tokenInfo.logoUrl) {
    return tokenInfo.logoUrl;
  }
  
  // Return default logo URL
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000000000000000000000000000000000/logo.png`;
}
