import type { Metadata } from "next"
import { CrystalBackground } from "@/components/crystal-background"
import { CommunityFeed } from "@/components/community-feed"
import { GovernanceProposals } from "@/components/governance-proposals"
import { AIChatBot } from "@/components/ai-chat-bot"

export const metadata: Metadata = {
  title: "CROAK | Community",
  description: "Connect with the CROAK community and participate in governance",
}

export default function CommunityPage() {
  return (
    <main className="flex-1 overflow-auto">
      <CrystalBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            CROAK Community
          </h1>
          <p className="text-gray-400 mt-2">
            Connect with fellow CROAK holders and participate in governance decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CommunityFeed />
            <GovernanceProposals />
          </div>

          <div className="space-y-6">
            <AIChatBot />
          </div>
        </div>
      </div>
    </main>
  )
}