"use client"

import * as React from "react"
import type { TooltipProps } from "recharts"

import { cn } from "@/lib/utils"

// Chart components
const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
Chart.displayName = "Chart"

// Chart tooltip
const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border bg-background p-2 shadow-sm rounded-lg", className)} {...props} />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("grid gap-2", className)} {...props} />,
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltipHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("font-medium", className)} {...props} />,
)
ChartTooltipHeader.displayName = "ChartTooltipHeader"

const ChartTooltipItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between gap-8", className)} {...props} />
  ),
)
ChartTooltipItem.displayName = "ChartTooltipItem"

const ChartTooltipLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
ChartTooltipLabel.displayName = "ChartTooltipLabel"

const ChartTooltipValue = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-medium", className)} {...props} />,
)
ChartTooltipValue.displayName = "ChartTooltipValue"

// Chart legend
const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap items-center gap-4", className)} {...props} />
  ),
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-1", className)} {...props} />,
)
ChartLegendItem.displayName = "ChartLegendItem"

const ChartLegendColor = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("h-2 w-2", className)} {...props} />,
)
ChartLegendColor.displayName = "ChartLegendColor"

const ChartLegendLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-medium", className)} {...props} />,
)
ChartLegendLabel.displayName = "ChartLegendLabel"

// Custom tooltip component for recharts
interface CustomTooltipProps extends React.PropsWithChildren<TooltipProps<number, string>> {
  className?: string
  formatter?: (value: number, name: string) => React.ReactNode
  labelFormatter?: (label: string) => React.ReactNode
}

const CustomTooltip = ({
  active,
  payload,
  label,
  className,
  formatter,
  labelFormatter,
  ...props
}: CustomTooltipProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <ChartTooltip className={className}>
      <ChartTooltipContent>
        {labelFormatter ? labelFormatter(label) : <ChartTooltipHeader>{label}</ChartTooltipHeader>}
        {payload.map(({ name, value, color }) => (
          <ChartTooltipItem key={name}>
            <ChartTooltipLabel>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {name}
              </div>
            </ChartTooltipLabel>
            <ChartTooltipValue>{formatter && value !== undefined ? formatter(Number(value), name ?? '') : value || 'N/A'}</ChartTooltipValue>
          </ChartTooltipItem>
        ))}
      </ChartTooltipContent>
    </ChartTooltip>
  )
}

export {
  Chart,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipHeader,
  ChartTooltipItem,
  ChartTooltipLabel,
  ChartTooltipValue,
  ChartLegend,
  ChartLegendItem,
  ChartLegendColor,
  ChartLegendLabel,
  CustomTooltip,
}