"use client"

import { useState } from "react"
import { Bot, X } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AiTradingAssistant } from "./ai-trading-assistant"
import { Button } from "@/components/ui/button"

export function AiAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {!isOpen && (
            <div className="absolute -top-12 -left-36 bg-[#0f172a]/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-[#00ffaa]/20 text-sm animate-bounce">
              Ask AI about any token! 🚀
              <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-4 h-4 bg-[#0f172a]/90 border-r border-b border-[#00ffaa]/20"></div>
            </div>
          )}

          <DialogTrigger asChild>
            <Button
              className={`h-14 w-14 rounded-full bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] hover:from-[#00ffaa]/90 hover:to-[#00a3ff]/90 text-black shadow-lg shadow-[#00ffaa]/20 transition-all hover:shadow-xl hover:shadow-[#00ffaa]/30 ${isOpen ? "hidden" : "flex"}`}
              onClick={() => setIsOpen(true)}
            >
              <Bot className="h-6 w-6" />
            </Button>
          </DialogTrigger>

          {isOpen && (
            <Button
              className="h-14 w-14 rounded-full bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] hover:from-[#00ffaa]/90 hover:to-[#00a3ff]/90 text-black shadow-lg shadow-[#00ffaa]/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>

      <DialogContent className="sm:max-w-[450px] bg-[#0f172a]/95 backdrop-blur-xl border border-[#00ffaa]/20 text-white p-0">
        <AiTradingAssistant />
      </DialogContent>
    </Dialog>
  )
}