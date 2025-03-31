"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AIConfidenceIndicatorProps {
  confidence?: number
  label?: string
  showBadge?: boolean
  showIcon?: boolean
  className?: string
}

export function AIConfidenceIndicator({
  confidence = 90,
  label = "Confidence",
  showBadge = true,
  showIcon = true,
  className = "",
}: AIConfidenceIndicatorProps) {
  // Determine color based on confidence level
  const getColorClass = (confidence: number) => {
    if (confidence >= 80) return "from-emerald-500 to-emerald-400"
    if (confidence >= 60) return "from-indigo-500 to-purple-500"
    if (confidence >= 40) return "from-yellow-500 to-amber-400"
    return "from-red-500 to-red-400"
  }

  const getBadgeColorClass = (confidence: number) => {
    if (confidence >= 80) return "bg-emerald-500/20 text-emerald-500"
    if (confidence >= 60) return "bg-indigo-500/20 text-indigo-400"
    if (confidence >= 40) return "bg-yellow-500/20 text-yellow-400"
    return "bg-red-500/20 text-red-400"
  }

  const colorClass = getColorClass(confidence)
  const badgeColorClass = getBadgeColorClass(confidence)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <Brain className="h-4 w-4 text-indigo-400" />}

      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        ></motion.div>
      </div>

      {showBadge && (
        <Badge className={`${badgeColorClass} whitespace-nowrap`}>
          {confidence}% {label}
        </Badge>
      )}
    </div>
  )
}