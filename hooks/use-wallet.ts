"use client"

import { useState, useEffect, useCallback } from "react"

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("0")
  const [chainId, setChainId] = useState<string | null>(null)

  // Simulate wallet connection
  const connect = useCallback(async () => {
    try {
      // In a real implementation, this would connect to MetaMask or another wallet
      console.log("Connecting wallet...")

      // Simulate a delay for the connection
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Generate a random wallet address
      const addr = `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
      setAddress(addr)

      // Generate a random balance
      const bal = (1000 + Math.random() * 9000).toFixed(0)
      setBalance(bal)

      // Set chain ID to Linea (0xe708)
      setChainId("0xe708")

      setIsConnected(true)

      return true
    } catch (error) {
      console.error("Error connecting wallet:", error)
      return false
    }
  }, [])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setAddress("")
    setBalance("0")
    setChainId(null)
  }, [])

  const copyAddress = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address)
      // In a real app, you would show a toast notification
      console.log("Address copied to clipboard")
    }
  }, [address])

  // Listen for account changes (would be implemented with real wallet providers)
  useEffect(() => {
    // This would be replaced with actual wallet event listeners
    const interval = setInterval(() => {
      if (isConnected) {
        // Occasionally update the balance to simulate real-time changes
        if (Math.random() > 0.7) {
          const newBalance = (
            Number.parseInt(balance) +
            (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10)
          ).toString()
          setBalance(newBalance)
        }
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isConnected, balance])

  return {
    isConnected,
    address,
    balance,
    chainId,
    connect,
    disconnect,
    copyAddress,
  }
}