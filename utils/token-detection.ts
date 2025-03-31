/**
 * Token detection utilities for cryptocurrency-related messages
 */

import { TOKEN_DATABASE, KNOWN_TOKENS, TokenInfo } from './token-database';

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
  
  // Create a mapping of token names to symbols (done once and cached)
  const tokenNameMap = getTokenNameMap();
  
  // Check for token names in message
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
 * Get mapping of token names to symbols (with variations)
 * This is extracted to a separate function so it can be cached if needed
 */
function getTokenNameMap(): Record<string, string> {
  const tokenNameMap: Record<string, string> = {};
  
  // Add all basic names from database
  for (const [symbol, info] of Object.entries(TOKEN_DATABASE)) {
    tokenNameMap[info.name.toLowerCase()] = symbol;
  }
  
  // Add common variations and aliases
  // Bitcoin
  tokenNameMap["bitcoin"] = "BTC";
  
  // Ethereum
  tokenNameMap["ethereum"] = "ETH";
  tokenNameMap["ether"] = "ETH";
  
  // Stablecoins
  tokenNameMap["tether"] = "USDT";
  tokenNameMap["usd coin"] = "USDC";
  tokenNameMap["circle"] = "USDC";
  
  // Exchange tokens
  tokenNameMap["binance coin"] = "BNB";
  tokenNameMap["binance"] = "BNB";
  
  // Major altcoins
  tokenNameMap["ripple"] = "XRP";
  tokenNameMap["cardano"] = "ADA";
  tokenNameMap["solana"] = "SOL";
  tokenNameMap["dogecoin"] = "DOGE";
  tokenNameMap["polkadot"] = "DOT";
  tokenNameMap["avalanche"] = "AVAX";
  tokenNameMap["polygon"] = "MATIC";
  tokenNameMap["chainlink"] = "LINK";
  tokenNameMap["litecoin"] = "LTC";
  tokenNameMap["cosmos"] = "ATOM";
  tokenNameMap["stellar"] = "XLM";
  tokenNameMap["algorand"] = "ALGO";
  tokenNameMap["near protocol"] = "NEAR";
  
  // Memecoins
  tokenNameMap["shiba"] = "SHIB";
  tokenNameMap["shiba inu"] = "SHIB";
  tokenNameMap["croak"] = "CROAK";
  tokenNameMap["efrog"] = "CROAK";
  tokenNameMap["pepe coin"] = "PEPE";
  tokenNameMap["pepe"] = "PEPE";
  tokenNameMap["dogwifhat"] = "WIF";
  tokenNameMap["dog with hat"] = "WIF";
  tokenNameMap["floki inu"] = "FLOKI";
  tokenNameMap["floki"] = "FLOKI";
  tokenNameMap["bonk inu"] = "BONK";
  tokenNameMap["bonk"] = "BONK";
  
  return tokenNameMap;
}

/**
 * Categories of cryptocurrency questions
 */
export type QuestionCategory = 
  | 'price_prediction'
  | 'trading_strategy'
  | 'timing_advice'
  | 'risk_assessment'
  | 'chart_analysis'
  | 'news_update'
  | 'general_info'
  | 'unknown';

/**
 * Detects the category of question being asked about a token
 * @param prompt The user's message
 * @returns The detected question category
 */
export function detectQuestionCategory(prompt: string): QuestionCategory {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('price prediction') || lowerPrompt.includes('price target') || 
      lowerPrompt.includes('will price') || lowerPrompt.includes('future price') ||
      lowerPrompt.includes('price increase') || lowerPrompt.includes('price decrease') ||
      lowerPrompt.includes('go up') || lowerPrompt.includes('go down')) {
    return 'price_prediction';
  }
  
  if (lowerPrompt.includes('trading strategy') || lowerPrompt.includes('how to trade') || 
      lowerPrompt.includes('trade setup') || lowerPrompt.includes('trading setup') ||
      lowerPrompt.includes('strategy for') || lowerPrompt.includes('trade plan')) {
    return 'trading_strategy';
  }
  
  if (lowerPrompt.includes('best time') || lowerPrompt.includes('when to buy') || 
      lowerPrompt.includes('when to sell') || lowerPrompt.includes('entry point') ||
      lowerPrompt.includes('exit point') || lowerPrompt.includes('good time to')) {
    return 'timing_advice';
  }
  
  if (lowerPrompt.includes('risk') || lowerPrompt.includes('safe') || 
      lowerPrompt.includes('dangerous') || lowerPrompt.includes('risky') ||
      lowerPrompt.includes('volatility') || lowerPrompt.includes('downside')) {
    return 'risk_assessment';
  }
  
  if (lowerPrompt.includes('chart') || lowerPrompt.includes('pattern') || 
      lowerPrompt.includes('technical analysis') || lowerPrompt.includes('indicators') ||
      lowerPrompt.includes('support') || lowerPrompt.includes('resistance') ||
      lowerPrompt.includes('trend') || lowerPrompt.includes('moving average')) {
    return 'chart_analysis';
  }
  
  if (lowerPrompt.includes('news') || lowerPrompt.includes('announcement') || 
      lowerPrompt.includes('recent development') || lowerPrompt.includes('update') ||
      lowerPrompt.includes('latest') || lowerPrompt.includes('happening')) {
    return 'news_update';
  }
  
  if (lowerPrompt.includes('what is') || lowerPrompt.includes('tell me about') || 
      lowerPrompt.includes('information about') || lowerPrompt.includes('overview') ||
      lowerPrompt.includes('explain') || lowerPrompt.includes('describe')) {
    return 'general_info';
  }
  
  return 'unknown';
}