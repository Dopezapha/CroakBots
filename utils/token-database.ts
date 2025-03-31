/**
 * token-database.ts
 * Centralized database of cryptocurrency token information
 */

export type TokenInfo = {
    name: string;
    symbol: string;
    decimals: number;
    category: string;
    description: string;
    logoUrl?: string;
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
    AVAX: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      category: "Layer 1",
      description: "Platform for launching decentralized applications and enterprise blockchain deployments.",
      logoUrl: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png"
    },
    MATIC: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
      category: "Layer 2",
      description: "Ethereum scaling solution offering faster and cheaper transactions.",
      logoUrl: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"
    },
    SHIB: {
      name: "Shiba Inu",
      symbol: "SHIB",
      decimals: 18,
      category: "Memecoin",
      description: "Ethereum-based memecoin inspired by Dogecoin.",
      logoUrl: "https://assets.coingecko.com/coins/images/11939/small/shiba.png"
    },
    LTC: {
      name: "Litecoin",
      symbol: "LTC",
      decimals: 8,
      category: "Payment",
      description: "Peer-to-peer cryptocurrency inspired by and technically similar to Bitcoin.",
      logoUrl: "https://assets.coingecko.com/coins/images/2/small/litecoin.png"
    },
    LINK: {
      name: "Chainlink",
      symbol: "LINK",
      decimals: 18,
      category: "Oracle",
      description: "Decentralized oracle network providing real-world data to smart contracts.",
      logoUrl: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png"
    },
    UNI: {
      name: "Uniswap",
      symbol: "UNI",
      decimals: 18,
      category: "DeFi",
      description: "Governance token for the Uniswap decentralized exchange protocol.",
      logoUrl: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png"
    },
    ATOM: {
      name: "Cosmos",
      symbol: "ATOM",
      decimals: 6,
      category: "Layer 1",
      description: "Ecosystem of interoperable and independent parallel blockchains.",
      logoUrl: "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png"
    },
    XLM: {
      name: "Stellar",
      symbol: "XLM",
      decimals: 7,
      category: "Payment",
      description: "Platform connecting banks, payment systems, and people for low-cost financial services.",
      logoUrl: "https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png"
    },
    ALGO: {
      name: "Algorand",
      symbol: "ALGO",
      decimals: 6,
      category: "Layer 1",
      description: "Pure proof-of-stake blockchain with focus on security and scalability.",
      logoUrl: "https://assets.coingecko.com/coins/images/4380/small/download.png"
    },
    NEAR: {
      name: "NEAR Protocol",
      symbol: "NEAR",
      decimals: 24,
      category: "Layer 1",
      description: "Sharded, developer-friendly, proof-of-stake blockchain platform.",
      logoUrl: "https://assets.coingecko.com/coins/images/10365/small/near.jpg"
    },
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
    },
    // Additional tokens from the extended list
    AAVE: {
      name: "Aave",
      symbol: "AAVE",
      decimals: 18,
      category: "DeFi",
      description: "Decentralized lending platform that allows users to lend and borrow cryptocurrency.",
      logoUrl: "https://assets.coingecko.com/coins/images/12645/small/AAVE.png"
    },
    MKR: {
      name: "Maker",
      symbol: "MKR",
      decimals: 18,
      category: "DeFi",
      description: "Governance token of the MakerDAO and Maker Protocol, facilitating the creation of DAI stablecoin.",
      logoUrl: "https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png"
    },
    CRV: {
      name: "Curve DAO Token",
      symbol: "CRV",
      decimals: 18,
      category: "DeFi",
      description: "Governance token for the Curve Finance platform, an exchange for stablecoin trading.",
      logoUrl: "https://assets.coingecko.com/coins/images/12124/small/Curve.png"
    },
    SNX: {
      name: "Synthetix",
      symbol: "SNX",
      decimals: 18,
      category: "DeFi",
      description: "Decentralized synthetic asset platform providing on-chain exposure to various assets.",
      logoUrl: "https://assets.coingecko.com/coins/images/3406/small/SNX.png"
    },
    COMP: {
      name: "Compound",
      symbol: "COMP",
      decimals: 18,
      category: "DeFi",
      description: "Governance token for the Compound protocol, an algorithmic money market protocol.",
      logoUrl: "https://assets.coingecko.com/coins/images/10775/small/COMP.png"
    },
    YFI: {
      name: "yearn.finance",
      symbol: "YFI",
      decimals: 18,
      category: "DeFi",
      description: "Decentralized ecosystem of aggregators that optimize yield farming.",
      logoUrl: "https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png"
    },
    SUSHI: {
      name: "SushiSwap",
      symbol: "SUSHI",
      decimals: 18,
      category: "DeFi",
      description: "Decentralized exchange (DEX) and automated market maker (AMM) platform.",
      logoUrl: "https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png"
    },
    MANA: {
      name: "Decentraland",
      symbol: "MANA",
      decimals: 18,
      category: "Metaverse",
      description: "Virtual reality platform powered by the Ethereum blockchain.",
      logoUrl: "https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png"
    },
    FTM: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18, 
      category: "Layer 1",
      description: "Directed Acyclic Graph (DAG) based smart contract platform providing DeFi services.",
      logoUrl: "https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png"
    },
    SAND: {
      name: "The Sandbox",
      symbol: "SAND",
      decimals: 18,
      category: "Metaverse",
      description: "Virtual world where players can build, own, and monetize their gaming experiences.",
      logoUrl: "https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg"
    }
  };
  
  // Comprehensive list of token symbols
  export const KNOWN_TOKENS = Object.keys(TOKEN_DATABASE);
  
  // Create a mapping of token names to symbols for easier lookup
  export const TOKEN_NAMES_MAP: Record<string, string> = {};
  
  // Initialize name mapping
  (() => {
    for (const [symbol, info] of Object.entries(TOKEN_DATABASE)) {
      TOKEN_NAMES_MAP[info.name.toLowerCase()] = symbol;
      
      // Add common variations
      switch (symbol) {
        case "BTC":
          TOKEN_NAMES_MAP["bitcoin"] = symbol;
          break;
        case "ETH":
          TOKEN_NAMES_MAP["ethereum"] = symbol;
          TOKEN_NAMES_MAP["ether"] = symbol;
          break;
        case "USDT":
          TOKEN_NAMES_MAP["tether"] = symbol;
          break;
        case "USDC":
          TOKEN_NAMES_MAP["usd coin"] = symbol;
          TOKEN_NAMES_MAP["circle"] = symbol;
          break;
        case "BNB":
          TOKEN_NAMES_MAP["binance coin"] = symbol;
          TOKEN_NAMES_MAP["binance"] = symbol;
          break;
        case "XRP":
          TOKEN_NAMES_MAP["ripple"] = symbol;
          break;
        case "ADA":
          TOKEN_NAMES_MAP["cardano"] = symbol;
          break;
        case "SOL":
          TOKEN_NAMES_MAP["solana"] = symbol;
          break;
        case "DOGE":
          TOKEN_NAMES_MAP["dogecoin"] = symbol;
          break;
        case "SHIB":
          TOKEN_NAMES_MAP["shiba"] = symbol;
          TOKEN_NAMES_MAP["shiba inu"] = symbol;
          break;
        case "MATIC":
          TOKEN_NAMES_MAP["polygon"] = symbol;
          break;
        case "AVAX":
          TOKEN_NAMES_MAP["avalanche"] = symbol;
          break;
        case "LINK":
          TOKEN_NAMES_MAP["chainlink"] = symbol;
          break;
        case "DOT":
          TOKEN_NAMES_MAP["polkadot"] = symbol;
          break;
        case "UNI":
          TOKEN_NAMES_MAP["uniswap"] = symbol;
          break;
        case "LTC":
          TOKEN_NAMES_MAP["litecoin"] = symbol;
          break;
        case "CROAK":
          TOKEN_NAMES_MAP["croak"] = symbol;
          TOKEN_NAMES_MAP["efrog"] = symbol;
          break;
        case "PEPE":
          TOKEN_NAMES_MAP["pepe coin"] = symbol;
          TOKEN_NAMES_MAP["pepe"] = symbol;
          break;
        case "WIF":
          TOKEN_NAMES_MAP["dogwifhat"] = symbol;
          break;
        case "BONK":
          TOKEN_NAMES_MAP["bonk inu"] = symbol;
          break;
        case "FLOKI":
          TOKEN_NAMES_MAP["floki inu"] = symbol;
          break;
        case "AAVE":
          TOKEN_NAMES_MAP["aave protocol"] = symbol;
          break;
        case "MKR":
          TOKEN_NAMES_MAP["maker dao"] = symbol;
          break;
        case "ATOM":
          TOKEN_NAMES_MAP["cosmos"] = symbol;
          break;
        case "XLM":
          TOKEN_NAMES_MAP["stellar"] = symbol;
          break;
        case "ALGO":
          TOKEN_NAMES_MAP["algorand"] = symbol;
          break;
        case "NEAR":
          TOKEN_NAMES_MAP["near protocol"] = symbol;
          break;
      }
    }
  })();
  
  /**
   * Get default logo URL if token doesn't have one
   * @param symbol Token symbol
   * @returns URL to logo image
   */
  export function getDefaultLogoUrl(symbol: string): string {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000000000000000000000000000000000/logo.png`;
  }