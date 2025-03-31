"use client"

import { useContext } from "react"
import { TokenContext } from "@/context/token-context"

export function useToken() {
  const context = useContext(TokenContext)

  if (!context) {
    throw new Error("useToken must be used within a TokenProvider")
  }

  return context
}