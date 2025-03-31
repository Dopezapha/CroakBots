"use client"

import { useEffect, useRef } from "react"

interface TradingViewWidgetProps {
  symbol: string
  theme?: "light" | "dark"
  chartType?: "candlestick" | "line" | "depth"
  interval?: string
  width?: string | number
  height?: string | number
}

export default function TradingViewWidget({
  symbol = "BTCUSDT",
  theme = "dark",
  chartType = "candlestick",
  interval = "1h",
  width = "100%",
  height = "100%",
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up any existing scripts
    const existingScript = document.getElementById("tradingview-widget-script")
    if (existingScript) {
      existingScript.remove()
    }

    // Create a new script element
    const script = document.createElement("script")
    script.id = "tradingview-widget-script"
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true

    script.onload = () => {
      if (typeof window.TradingView !== "undefined" && container.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BITGET:${symbol}`,
          interval: interval,
          timezone: "Etc/UTC",
          theme: theme,
          style: chartType === "candlestick" ? "1" : chartType === "line" ? "2" : "3",
          locale: "en",
          toolbar_bg: "#0f172a",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          hide_side_toolbar: false,
          studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies", "MACD@tv-basicstudies"],
          disabled_features: ["header_symbol_search", "header_compare"],
          enabled_features: ["use_localstorage_for_settings", "save_chart_properties_to_local_storage"],
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [symbol, theme, chartType, interval])

  return (
    <div id={`tradingview_${Math.random().toString(36).substring(2, 9)}`} ref={container} style={{ width, height }} />
  )
}

// Add TradingView to Window interface
declare global {
  interface Window {
    TradingView: any
  }
}