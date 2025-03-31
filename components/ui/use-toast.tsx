"use client"

import React from "react"

import { useState, createContext, useContext } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type ToastContextType = {
  toast: (props: ToastProps) => void
  dismissToast: (id: string) => void
  toasts: (ToastProps & { id: string })[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])

    // Auto dismiss after duration
    if (props.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        dismissToast(id)
      }, props.duration || 5000)
    }
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast, dismissToast, toasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Export a direct toast function for easier usage
export const toast = (props: ToastProps) => {
  // This is a helper for direct usage outside of React components
  // It will show a warning in the console but provide the function
  console.warn("Using toast() directly is not recommended. Use useToast() hook inside React components instead.")

  // Create a temporary element to render the toast
  const div = document.createElement("div")
  document.body.appendChild(div)

  // Create a simple toast
  const toastElement = document.createElement("div")
  toastElement.className = `fixed bottom-4 right-4 z-50 rounded-lg border p-4 shadow-md
    ${
      props.variant === "destructive"
        ? "bg-red-600 border-red-800 text-white"
        : "bg-[#0f172a]/95 backdrop-blur-xl border-[#6366f1]/20 text-white"
    }`

  if (props.title) {
    const title = document.createElement("div")
    title.className = "font-semibold"
    title.textContent = props.title
    toastElement.appendChild(title)
  }

  if (props.description) {
    const description = document.createElement("div")
    description.className = "text-sm opacity-90 mt-1"
    description.textContent = props.description
    toastElement.appendChild(description)
  }

  document.body.appendChild(toastElement)

  // Auto dismiss
  setTimeout(() => {
    toastElement.remove()
  }, props.duration || 5000)
}

function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border p-4 shadow-md transition-all animate-in slide-in-from-right-full 
            ${
              toast.variant === "destructive"
                ? "bg-red-600 border-red-800 text-white"
                : "bg-[#0f172a]/95 backdrop-blur-xl border-[#6366f1]/20 text-white"
            }`}
        >
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && <div className="text-sm opacity-90 mt-1">{toast.description}</div>}
          <button
            onClick={() => dismissToast(toast.id)}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}