"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  LineChart,
  PieChart,
  BarChart,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Coins,
  Users,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const [mainExpanded, setMainExpanded] = useState(true)
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false)
  const [otherExpanded, setOtherExpanded] = useState(false)

  // Don't render sidebar on landing page
  if (pathname === "/") {
    return null
  }

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 pt-16 bg-black/80 border-r border-indigo-500/20 backdrop-blur-sm">
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 px-4">
        <nav className="flex-1 space-y-1">
          {/* Main Section */}
          <div>
            <button
              onClick={() => setMainExpanded(!mainExpanded)}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
            >
              {mainExpanded ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
              Main
            </button>

            {mainExpanded && (
              <div className="ml-4 space-y-1 mt-1">
                <NavItem
                  href="/dashboard"
                  label="Dashboard"
                  icon={<LayoutDashboard className="h-4 w-4" />}
                  active={pathname === "/dashboard"}
                />
                <NavItem
                  href="/trading"
                  label="Trading"
                  icon={<LineChart className="h-4 w-4" />}
                  active={pathname === "/trading"}
                />
                <NavItem
                  href="/staking"
                  label="Staking"
                  icon={<Coins className="h-4 w-4" />}
                  active={pathname === "/staking"}
                />
                <NavItem
                  href="/community"
                  label="Community"
                  icon={<Users className="h-4 w-4" />}
                  active={pathname === "/community"}
                />
              </div>
            )}
          </div>

          {/* Analytics Section */}
          <div>
            <button
              onClick={() => setAnalyticsExpanded(!analyticsExpanded)}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
            >
              {analyticsExpanded ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
              Analytics
            </button>

            {analyticsExpanded && (
              <div className="ml-4 space-y-1 mt-1">
                <NavItem
                  href="/analytics/tokens"
                  label="Tokens"
                  icon={<Coins className="h-4 w-4" />}
                  active={pathname === "/analytics/tokens"}
                />
                <NavItem
                  href="/analytics/volume"
                  label="Volume"
                  icon={<BarChart className="h-4 w-4" />}
                  active={pathname === "/analytics/volume"}
                />
                <NavItem
                  href="/analytics/market"
                  label="Market"
                  icon={<PieChart className="h-4 w-4" />}
                  active={pathname === "/analytics/market"}
                />
              </div>
            )}
          </div>

          {/* Other Section */}
          <div>
            <button
              onClick={() => setOtherExpanded(!otherExpanded)}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
            >
              {otherExpanded ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
              Other
            </button>

            {otherExpanded && (
              <div className="ml-4 space-y-1 mt-1">
                <NavItem
                  href="/settings"
                  label="Settings"
                  icon={<Settings className="h-4 w-4" />}
                  active={pathname === "/settings"}
                />
                <NavItem
                  href="/help"
                  label="Help"
                  icon={<HelpCircle className="h-4 w-4" />}
                  active={pathname === "/help"}
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string
  label: string
  icon: React.ReactNode
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  )
}