import type React from "react"
import { AlertCircle } from "lucide-react"

interface EmptyStateProps {
  message?: string
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({
  message = "No data available",
  icon = <AlertCircle className="h-6 w-6 text-white/30" />,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="mb-3">{icon}</div>
      <p className="text-white/50 text-center">{message}</p>
    </div>
  )
}