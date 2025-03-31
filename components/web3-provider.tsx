"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"

// Define the shape of our Web3 context
type Web3ContextType = {
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  account: string | null
  chainId: number | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
  isConnected: boolean
  error: string | null
}

// Create the context with default values
const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  isConnected: false,
  error: null,
})

export function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize provider on client-side only
  useEffect(() => {
    if (typeof window === "undefined") return

    const initProvider = async () => {
      try {
        if (window.ethereum) {
          console.log("Ethereum object found, initializing provider")
          const web3Provider = new ethers.BrowserProvider(window.ethereum)
          setProvider(web3Provider)

          // Check if already connected
          const accounts = await web3Provider.listAccounts()
          if (accounts.length > 0) {
            console.log("Found connected account:", accounts[0])
            setAccount(accounts[0].address)
            setSigner(await web3Provider.getSigner())
            setIsConnected(true)
          }

          // Get current chain ID
          const network = await web3Provider.getNetwork()
          setChainId(Number(network.chainId))
        } else {
          console.log("No Ethereum object found")
        }
      } catch (err) {
        console.error("Failed to initialize Web3Provider:", err)
        setError("Failed to initialize wallet connection")
      }
    }

    initProvider()
  }, [])

  // Handle account changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Accounts changed:", accounts)
      if (accounts.length === 0) {
        // User disconnected
        setAccount(null)
        setSigner(null)
        setIsConnected(false)
      } else if (accounts[0] !== account) {
        setAccount(accounts[0])
        if (provider) {
          provider.getSigner().then(signer => setSigner(signer))
          setIsConnected(true)
        }
      }
    }

    const handleChainChanged = (chainIdHex: string) => {
      console.log("Chain changed:", chainIdHex)
      const newChainId = Number.parseInt(chainIdHex, 16)
      setChainId(newChainId)

      // Refresh provider on chain change
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(web3Provider)
        if (account) {
          web3Provider.getSigner().then(signer => setSigner(signer))
        }
      }
    }

    const handleDisconnect = (error: { code: number; message: string }) => {
      console.log("Wallet disconnected:", error)
      setAccount(null)
      setSigner(null)
      setIsConnected(false)
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)
    window.ethereum.on("disconnect", handleDisconnect)

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
        window.ethereum.removeListener("disconnect", handleDisconnect)
      }
    }
  }, [provider, account])

  const connect = async () => {
    setError(null)

    if (!window.ethereum) {
      setError("No wallet found. Please install MetaMask or another Web3 wallet.")
      console.error("No Ethereum object found")
      return
    }

    setIsConnecting(true)

    try {
      // Initialize provider if not already done
      if (!provider) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(web3Provider)
      }

      // Request accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      console.log("Connected accounts:", accounts)

      if (accounts.length > 0) {
        setAccount(accounts[0])
        if (provider) {
          const signerObj = await provider.getSigner()
          setSigner(signerObj)

          // Get current chain ID
          const network = await provider.getNetwork()
          setChainId(Number(network.chainId))

          setIsConnected(true)
        }
      }
    } catch (err: any) {
      console.error("Failed to connect wallet:", err)
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setSigner(null)
    setIsConnected(false)
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        chainId,
        connect,
        disconnect,
        isConnecting,
        isConnected,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}