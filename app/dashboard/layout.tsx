import type React from "react"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container p-4">{children}</div>
}