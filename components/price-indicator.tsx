"use client"

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface PriceIndicatorProps {
  value: number | string
  showIcon?: boolean
  showPlus?: boolean
  className?: string
  iconClassName?: string
}

export function PriceIndicator({
  value,
  showIcon = true,
  showPlus = true,
  className = "",
  iconClassName = "h-4 w-4 mr-1",
}: PriceIndicatorProps) {
  // Convert value to number if it's a string
  const numValue = typeof value === "string" ? Number.parseFloat(value) : value

  // Determine if the value is positive, negative, or zero
  const isPositive = numValue > 0
  const isNegative = numValue < 0
  const isZero = numValue === 0

  // Format the value as a string with a plus sign for positive values if showPlus is true
  const formattedValue =
    isPositive && showPlus
      ? `+${numValue.toFixed(2)}%`
      : isNegative
        ? `${numValue.toFixed(2)}%`
        : `${numValue.toFixed(2)}%`

  // Determine the color class based on the value
  const colorClass = isPositive ? "text-emerald-500" : isNegative ? "text-red-500" : "text-white/70"

  return (
    <div className={`flex items-center ${colorClass} ${className}`}>
      {showIcon &&
        (isPositive ? (
          <ArrowUpRight className={iconClassName} />
        ) : isNegative ? (
          <ArrowDownRight className={iconClassName} />
        ) : (
          <Minus className={iconClassName} />
        ))}
      <span>{formattedValue}</span>
    </div>
  )
}