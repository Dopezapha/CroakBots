"use client"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "./providers/web3-provider"
import { useToast } from "@/components/ui/use-toast"

export function WalletConnector() {
  const { toast } = useToast()
  const { isConnected, connect, disconnect, address, isClient } = useWeb3()

  const handleConnect = async () => {
    try {
      await connect()
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      })
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
      })
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Disconnection error:", error)
      toast({
        variant: "destructive",
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
      })
    }
  }

  // Don't render anything during SSR
  if (!isClient) {
    return (
      <Button variant="outline" className="w-full">
        Connect Wallet
      </Button>
    )
  }

  return (
    <>
      {isConnected ? (
        <Button variant="outline" onClick={handleDisconnect} className="w-full">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Disconnect"}
        </Button>
      ) : (
        <Button variant="outline" onClick={handleConnect} className="w-full">
          Connect Wallet
        </Button>
      )}
    </>
  )
}