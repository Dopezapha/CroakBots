"use client"

import type { ReactNode } from "react"
import { Web3Provider } from "./web3-provider"
import { ThemeProvider } from "../theme-provider"
import { Toaster } from "@/components/ui/toaster"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Web3Provider>
        {children}
        <Toaster />
      </Web3Provider>
    </ThemeProvider>
  )
}