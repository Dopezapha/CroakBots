"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet, ChevronDown, ExternalLink, Copy, LogOut } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

export function WalletConnectButton() {
  const { account, chainId, connect, disconnect, isConnecting, isConnected, error } = useWeb3()
  const [mounted, setMounted] = useState(false)
  const [autoConnectAttempted, setAutoConnectAttempted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-connect on page load
  useEffect(() => {
    if (mounted && !isConnected && !isConnecting && !autoConnectAttempted) {
      connect()
      setAutoConnectAttempted(true)
    }
  }, [mounted, isConnected, isConnecting, autoConnectAttempted, connect])

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Wallet Connection Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error])

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  // View on explorer
  const viewOnExplorer = () => {
    if (account && chainId) {
      let explorerUrl = ""

      // Determine explorer URL based on chain ID
      switch (chainId) {
        case 1: // Ethereum Mainnet
          explorerUrl = `https://etherscan.io/address/${account}`
          break
        case 56: // Binance Smart Chain
          explorerUrl = `https://bscscan.com/address/${account}`
          break
        case 137: // Polygon
          explorerUrl = `https://polygonscan.com/address/${account}`
          break
        case 42161: // Arbitrum
          explorerUrl = `https://arbiscan.io/address/${account}`
          break
        default:
          explorerUrl = `https://etherscan.io/address/${account}`
      }

      window.open(explorerUrl, "_blank")
    }
  }

  // Handle disconnect
  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Don't render anything on the server
  if (!mounted) {
    return null
  }

  // If connected, show dropdown with account info
  if (isConnected && account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-indigo-500/30 bg-black/40 hover:bg-black/60">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              <span>{formatAddress(account)}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-black/90 border-indigo-500/30 backdrop-blur-sm">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Connected Wallet</span>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1" />
              <span className="text-xs text-emerald-500">Connected</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={copyAddress}>
            <span>{formatAddress(account)}</span>
            <Copy className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={viewOnExplorer}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleDisconnect}>
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // If not connected, show connect button
  return (
    <Button onClick={connect} disabled={isConnecting} className="bg-indigo-600 hover:bg-indigo-700">
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}

