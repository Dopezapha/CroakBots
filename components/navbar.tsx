"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Brain } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  // Don't render navbar on landing page
  if (pathname === "/") {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-500/20 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 animate-pulse" />
              <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
                <Brain className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
              CROAK
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <NavItem href="/dashboard" label="Dashboard" active={pathname === "/dashboard"} />
          <NavItem href="/trading" label="Trading" active={pathname === "/trading"} />
          <NavItem href="/staking" label="Staking" active={pathname === "/staking"} />
          <NavItem href="/community" label="Community" active={pathname === "/community"} />
          <NavItem href="/analytics/tokens" label="Analytics" active={pathname.startsWith("/analytics")} />
        </div>

        <div className="flex items-center gap-2">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  )
}

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`${active ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
      >
        {label}
      </Button>
    </Link>
  )
}