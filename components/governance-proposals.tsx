"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

type Proposal = {
  id: string
  title: string
  description: string
  forVotes: number
  againstVotes: number
  status: "active" | "passed" | "rejected"
  endTime: string
  aiAnalysis: {
    impact: "positive" | "neutral" | "negative"
    confidence: number
    summary: string
  }
}

export function GovernanceProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "1",
      title: "Increase staking rewards by 5%",
      description: "Proposal to increase the staking rewards from 10% to 15% APY to incentivize long-term holding.",
      forVotes: 1250000,
      againstVotes: 320000,
      status: "active",
      endTime: "2d 5h",
      aiAnalysis: {
        impact: "positive",
        confidence: 0.9,
        summary:
          "Likely to increase token retention and reduce selling pressure. Historical data shows similar increases led to 20% reduction in circulating supply.",
      },
    },
    {
      id: "2",
      title: "Add CROAK/ETH liquidity mining",
      description: "Allocate 500,000 CROAK tokens to incentivize liquidity providers on the CROAK/ETH pair.",
      forVotes: 980000,
      againstVotes: 450000,
      status: "active",
      endTime: "1d 12h",
      aiAnalysis: {
        impact: "positive",
        confidence: 0.9,
        summary:
          "Will likely improve trading depth and reduce slippage. Similar programs have increased liquidity by an average of 35%.",
      },
    },
    {
      id: "3",
      title: "Reduce transaction fee from 1% to 0.5%",
      description: "Proposal to reduce the transaction fee to make CROAK more attractive for frequent traders.",
      forVotes: 1500000,
      againstVotes: 1200000,
      status: "passed",
      endTime: "Ended",
      aiAnalysis: {
        impact: "neutral",
        confidence: 0.9,
        summary:
          "May increase transaction volume but reduce fee revenue. Net effect likely neutral based on elasticity analysis.",
      },
    },
  ])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <AlertCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        )
      case "passed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Passed
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
    }
  }

  const getImpactBadge = (impact: Proposal["aiAnalysis"]["impact"]) => {
    switch (impact) {
      case "positive":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Positive Impact</Badge>
      case "negative":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Negative Impact</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Neutral Impact</Badge>
    }
  }

  return (
    <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Governance Proposals</span>
          <Badge variant="outline" className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
            <Brain className="h-3 w-3 mr-1" /> AI Impact Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {proposals.map((proposal) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-lg bg-gray-800/40 border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{proposal.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{proposal.description}</p>
              </div>
              {getStatusBadge(proposal.status)}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <div>Votes: {formatNumber(proposal.forVotes + proposal.againstVotes)}</div>
                <div>{proposal.status === "active" ? `Ends in ${proposal.endTime}` : "Voting ended"}</div>
              </div>
              <Progress
                value={(proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100}
                className="h-2 bg-gray-700"
              />
              <div className="flex justify-between text-xs mt-1">
                <div className="text-emerald-400">
                  For: {formatNumber(proposal.forVotes)} (
                  {Math.round((proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100)}%)
                </div>
                <div className="text-red-400">
                  Against: {formatNumber(proposal.againstVotes)} (
                  {Math.round((proposal.againstVotes / (proposal.forVotes + proposal.againstVotes)) * 100)}%)
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-indigo-900/20 rounded border border-indigo-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-indigo-400" />
                  <span className="text-sm font-medium">AI Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  {getImpactBadge(proposal.aiAnalysis.impact)}
                  <Badge className="bg-emerald-500/20 text-emerald-400">
                    {Math.round(proposal.aiAnalysis.confidence * 100)}% Confidence
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-gray-300">{proposal.aiAnalysis.summary}</p>
            </div>

            {proposal.status === "active" && (
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Vote For</Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700">Vote Against</Button>
              </div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}