"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
import { PriceIndicator } from "@/components/price-indicator"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"

interface MarketActivityProps {
  isLoading?: boolean
  activities?: Array<{
    type: "buy" | "sell" | "swap"
    token: string
    amount: number
    price: number
    time: string
    change?: number
  }>
}

export function MarketActivity({ isLoading = false, activities = [] }: MarketActivityProps) {
  return (
    <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-400" />
          <CardTitle className="text-white">Market Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : activities.length > 0 ? (
          <div className="space-y-2">
            {activities.map((activity, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        activity.type === "buy"
                          ? "bg-emerald-500/20 text-emerald-500"
                          : activity.type === "sell"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-blue-500/20 text-blue-400"
                      }
                    >
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Badge>
                    <span className="text-white">{activity.token}</span>
                  </div>
                  <span className="text-white/50 text-sm">{activity.time}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-white/70 text-sm">Amount</p>
                    <p className="text-white">{activity.amount.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Price</p>
                    <p className="text-white">${activity.price.toFixed(4)}</p>
                  </div>
                  {activity.change !== undefined && (
                    <div>
                      <p className="text-white/70 text-sm">Change</p>
                      <PriceIndicator value={activity.change} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No recent market activity" />
        )}
      </CardContent>
    </Card>
  )
}