"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Web3ContextType {
  isConnected: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  isClient: boolean
}

const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  connect: async () => {},
  disconnect: async () => {},
  isClient: false,
})

export function useWeb3() {
  return useContext(Web3Context)
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            setIsConnected(true)
          }
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }

    checkConnection()

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
        } else {
          setAddress(null)
          setIsConnected(false)
        }
      })
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [])

  const connect = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      } else {
        throw new Error("No Ethereum provider found")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnect = async () => {
    setAddress(null)
    setIsConnected(false)
  }

  return (
    <Web3Context.Provider value={{ isConnected, address, connect, disconnect, isClient }}>
      {children}
    </Web3Context.Provider>
  )
}