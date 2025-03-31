"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Lock, Clock, Wallet, Percent, Sparkles, Brain, AlertTriangle, Info, Zap } from "lucide-react"
import { NeuralNetworkBackground } from "@/components/neural-network-background"
import {
  MotionWrapper,
  StaggeredMotionWrapper,
  HoverMotionWrapper,
  FloatMotionWrapper,
} from "@/components/motion-wrapper"
import { motion } from "framer-motion"
import { PriceIndicator } from "@/components/price-indicator"
import { EmptyState } from "@/components/empty-state"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AIConfidenceIndicator } from "@/components/ai-confidence-indicator"

export default function StakingPage() {
  const [activePool, setActivePool] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null)
  const [stakingPools, setStakingPools] = useState<any[]>([])
  const [userPositions, setUserPositions] = useState<any[]>([])

  // Simulate loading but don't add mock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real implementation, this would fetch actual data
        setTimeout(() => {
          setIsLoading(false)
          setAiRecommendation("90-day lock period with auto-compound")
          setStakingPools([])
          setUserPositions([])
        }, 1500)
      } catch (error) {
        console.error("Error fetching staking data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Neural network animated background */}
      <NeuralNetworkBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col gap-8">
          <MotionWrapper>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">AI-Powered Staking Platform</h1>
                <Badge className="bg-indigo-500/20 text-indigo-400 px-2 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New
                </Badge>
              </div>
              <p className="text-white/70">
                Stake your CROAK tokens to earn rewards with intelligent AI-optimized yields
              </p>
            </div>
          </MotionWrapper>

          {/* AI Recommendation Banner */}
          <MotionWrapper delay={0.2}>
            <Card className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/30 shadow-lg shadow-indigo-500/5">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <FloatMotionWrapper yOffset={5} duration={2}>
                      <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <Brain className="h-6 w-6 text-indigo-400" />
                      </div>
                    </FloatMotionWrapper>
                    <div>
                      <h3 className="text-lg font-bold text-white">AI Staking Recommendation</h3>
                      <p className="text-white/70">Our AI analyzed market conditions and your portfolio</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-black/20 rounded-lg p-3 border border-indigo-500/20">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="relative h-5 w-5">
                          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                        </div>
                        <p className="text-white/70">Analyzing optimal staking strategy...</p>
                      </div>
                    ) : aiRecommendation ? (
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-indigo-400" />
                          <p className="text-white font-medium">
                            Recommended Strategy: <span className="text-indigo-400">{aiRecommendation}</span>
                          </p>
                        </div>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden hidden md:block">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "90%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          ></motion.div>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-500 whitespace-nowrap">90% Confidence</Badge>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-white/70" />
                        <p className="text-white/70">No staking recommendations available</p>
                      </div>
                    )}
                  </div>

                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium whitespace-nowrap">
                    Apply Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          <StaggeredMotionWrapper staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full">
                    <ArrowUpRight className="h-4 w-4 text-indigo-400" />
                    <span className="text-indigo-400 text-sm font-medium">Active</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Total Staked</h3>
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white mb-4">0 CROAK</p>
                    <div className="flex justify-between text-white/70 text-sm">
                      <span>Total Value Locked</span>
                      <span>$0.00</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Percent className="h-6 w-6 text-indigo-400" />
                  </div>
                  <PriceIndicator value={0} className="bg-indigo-500/10 px-3 py-1 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Average APY</h3>
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white mb-4">0.0%</p>
                    <div className="flex justify-between text-white/70 text-sm">
                      <span>Rewards Distributed</span>
                      <span>Daily</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full">
                    <span className="text-indigo-400 text-sm font-medium">Flexible</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Lock Periods</h3>
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white mb-4">7-90 Days</p>
                    <div className="flex justify-between text-white/70 text-sm">
                      <span>Longer locks = Higher APY</span>
                      <span>+5-20%</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </StaggeredMotionWrapper>

          <MotionWrapper delay={0.4}>
            <Tabs defaultValue="stake" className="w-full">
              <TabsList className="bg-[#0f172a]/80 border border-indigo-500/20">
                <TabsTrigger
                  value="stake"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/70"
                >
                  Stake
                </TabsTrigger>
                <TabsTrigger
                  value="unstake"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/70"
                >
                  Unstake
                </TabsTrigger>
                <TabsTrigger
                  value="rewards"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/70"
                >
                  Rewards
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stake" className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Staking Pools */}
                  <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                    <CardHeader>
                      <CardTitle className="text-white">Staking Pools</CardTitle>
                      <CardDescription className="text-white/70">Select a staking pool to earn rewards</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : stakingPools.length > 0 ? (
                        <StaggeredMotionWrapper staggerDelay={0.1}>
                          {stakingPools.map((pool) => (
                            <HoverMotionWrapper key={pool.id}>
                              <div
                                className={`p-4 rounded-lg border ${activePool === pool.id ? "bg-indigo-500/10 border-indigo-500/40" : "bg-white/5 border-white/10 hover:border-indigo-500/20"} cursor-pointer transition-colors`}
                                onClick={() => setActivePool(pool.id)}
                              >
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-white font-medium">{pool.name}</h3>
                                      {pool.recommended && (
                                        <Badge className="bg-indigo-500/20 text-indigo-400">
                                          <Sparkles className="h-3 w-3 mr-1" />
                                          AI Recommended
                                        </Badge>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                      <div>
                                        <p className="text-white/50 text-xs">APY</p>
                                        <p className="text-indigo-400 font-bold text-lg">{pool.apy}</p>
                                      </div>
                                      <div>
                                        <p className="text-white/50 text-xs">Lock Period</p>
                                        <p className="text-white font-medium">{pool.lockPeriod}</p>
                                      </div>
                                      <div>
                                        <p className="text-white/50 text-xs">Min Stake</p>
                                        <p className="text-white font-medium">{pool.minStake}</p>
                                      </div>
                                      <div>
                                        <p className="text-white/50 text-xs">Total Staked</p>
                                        <p className="text-white font-medium">{pool.totalStaked}</p>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                      {pool.features.map((feature, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="bg-white/5 text-white/70 border-white/10"
                                        >
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex items-center">
                                    <Button
                                      className={`${activePool === pool.id ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600" : "bg-white/10 hover:bg-white/20"} text-white font-medium px-6`}
                                    >
                                      Select
                                    </Button>
                                  </div>
                                </div>

                                {activePool === pool.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 pt-4 border-t border-indigo-500/20"
                                  >
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <label className="text-sm text-white/70">Amount to Stake</label>
                                        <div className="relative">
                                          <input
                                            type="text"
                                            className="w-full p-3 bg-white/5 border border-indigo-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 pr-20"
                                            placeholder="0.00"
                                          />
                                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                            <span className="text-white/50">CROAK</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 text-indigo-400 hover:bg-indigo-500/10 px-2"
                                            >
                                              MAX
                                            </Button>
                                          </div>
                                        </div>
                                        <div className="flex justify-between text-xs text-white/50">
                                          <span>Balance: 0 CROAK</span>
                                          <span>Min: {pool.minStake}</span>
                                        </div>
                                      </div>

                                      {pool.id === "long" && (
                                        <div className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <label className="text-sm text-white/70">Auto-compound Rewards</label>
                                            <Badge className="bg-indigo-500/20 text-indigo-400">
                                              <Zap className="h-3 w-3 mr-1" />
                                              +5% APY
                                            </Badge>
                                          </div>
                                          <div className="flex items-center gap-4">
                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-3/4"></div>
                                            </div>
                                            <span className="text-white font-medium">Yes</span>
                                          </div>
                                        </div>
                                      )}

                                      <div className="p-4 bg-white/5 rounded-lg space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-white/70">Base APY</span>
                                          <span className="text-indigo-400 font-medium">{pool.apy}</span>
                                        </div>
                                        {pool.id === "long" && (
                                          <div className="flex justify-between text-sm">
                                            <span className="text-white/70">Auto-compound Bonus</span>
                                            <span className="text-indigo-400 font-medium">+5.0%</span>
                                          </div>
                                        )}
                                        <div className="flex justify-between text-sm">
                                          <span className="text-white/70">Total APY</span>
                                          <span className="text-indigo-400 font-medium">
                                            {pool.id === "long" ? "37.5%" : pool.apy}
                                          </span>
                                        </div>
                                      </div>

                                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Stake CROAK
                                      </Button>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </HoverMotionWrapper>
                          ))}
                        </StaggeredMotionWrapper>
                      ) : (
                        <EmptyState message="No staking pools available" />
                      )}
                    </CardContent>
                  </Card>

                  {/* AI Staking Insights */}
                  <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-indigo-400" />
                        <CardTitle className="text-white">AI Staking Insights</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-indigo-400" />
                            <h4 className="text-white font-medium">Optimal Staking Strategy</h4>
                          </div>
                          <p className="text-white/80 text-sm mb-3">
                            Based on current market conditions and your portfolio, our AI recommends the 90-day staking
                            pool with auto-compounding enabled for maximum returns.
                          </p>
                          <AIConfidenceIndicator />
                        </div>

                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <ArrowUpRight className="h-4 w-4 text-indigo-400" />
                            <h4 className="text-white font-medium">APY Forecast</h4>
                          </div>
                          <p className="text-white/80 text-sm mb-3">
                            Our AI predicts APY rates will increase by approximately 2-3% over the next 30 days based on
                            token performance and market trends.
                          </p>
                          <div className="h-12 w-full bg-white/5 rounded-lg relative overflow-hidden">
                            {/* Simulated chart line */}
                            <svg
                              className="absolute inset-0 w-full h-full"
                              viewBox="0 0 100 40"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0,30 C10,28 20,25 30,20 C40,15 50,12 60,10 C70,8 80,7 90,5 L100,5"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                              />
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#6366f1" />
                                  <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/80 text-sm">
                            Remember that staking involves locking your tokens for a period of time. Early unstaking may
                            result in fees and loss of rewards.
                          </p>
                          <div className="flex items-center mt-1">
                            <Info className="h-3 w-3 text-white/50 mr-1" />
                            <p className="text-white/50 text-xs">
                              Always consider your liquidity needs before staking.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="unstake" className="mt-6">
                <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <CardHeader>
                    <CardTitle className="text-white">Your Staked Positions</CardTitle>
                    <CardDescription className="text-white/70">Manage your staked tokens and rewards</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : userPositions.length > 0 ? (
                      <StaggeredMotionWrapper staggerDelay={0.1}>
                        {userPositions.map((position) => (
                          <HoverMotionWrapper key={position.id}>
                            <div
                              className={`p-4 rounded-lg border ${position.status === "locked" ? "border-indigo-500/20 bg-indigo-500/5" : "border-emerald-500/20 bg-emerald-500/5"}`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-white font-medium">{position.amount}</h3>
                                    <Badge
                                      className={
                                        position.status === "locked"
                                          ? "bg-indigo-500/20 text-indigo-400"
                                          : "bg-emerald-500/20 text-emerald-500"
                                      }
                                    >
                                      {position.status === "locked" ? (
                                        <>
                                          <Lock className="h-3 w-3 mr-1" />
                                          Locked
                                        </>
                                      ) : (
                                        <>
                                          <ArrowUpRight className="h-3 w-3 mr-1" />
                                          Unlocked
                                        </>
                                      )}
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                    <div>
                                      <p className="text-white/50 text-xs">Value</p>
                                      <p className="text-white font-medium">{position.value}</p>
                                    </div>
                                    <div>
                                      <p className="text-white/50 text-xs">APY</p>
                                      <p className="text-indigo-400 font-medium">{position.apy}</p>
                                    </div>
                                    <div>
                                      <p className="text-white/50 text-xs">Lock Period</p>
                                      <p className="text-white font-medium">{position.lockPeriod}</p>
                                    </div>
                                    <div>
                                      <p className="text-white/50 text-xs">Rewards Earned</p>
                                      <p className="text-emerald-500 font-medium">{position.rewards}</p>
                                    </div>
                                  </div>

                                  {position.status === "locked" && (
                                    <div className="mb-3">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-white/70 text-xs">Lock Progress</span>
                                        <span className="text-white/70 text-xs">{position.daysLeft} days left</span>
                                      </div>
                                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                          style={{ width: `${((30 - position.daysLeft) / 30) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center">
                                  <Button
                                    className={
                                      position.status === "locked"
                                        ? "bg-white/10 text-white/70 hover:bg-white/20 cursor-not-allowed"
                                        : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                                    }
                                    disabled={position.status === "locked"}
                                  >
                                    {position.status === "locked"
                                      ? `Locked for ${position.daysLeft} days`
                                      : "Unstake Now"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </HoverMotionWrapper>
                        ))}
                      </StaggeredMotionWrapper>
                    ) : (
                      <EmptyState message="No staked positions" />
                    )}

                    {userPositions.length > 0 && (
                      <>
                        <div className="p-4 bg-white/5 rounded-lg space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Total Staked</span>
                            <span className="text-white font-medium">0 CROAK</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Available to Unstake</span>
                            <span className="text-white font-medium">0 CROAK</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Locked</span>
                            <span className="text-white font-medium">0 CROAK</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Total Rewards</span>
                            <span className="text-emerald-500 font-medium">0 CROAK</span>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="h-4 w-4 text-indigo-400" />
                            <h4 className="text-white font-medium">AI Unstaking Recommendation</h4>
                          </div>
                          <p className="text-white/80 text-sm mb-3">
                            Based on current market conditions and your portfolio, our AI recommends keeping your tokens
                            staked until the lock period ends to maximize returns.
                          </p>
                          <AIConfidenceIndicator />
                        </div>
                      </>
                    )}

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400 text-sm">
                        <strong>Note:</strong> Unstaking before the lock period ends will result in forfeiting any
                        pending rewards and may incur early withdrawal fees.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="mt-6">
                <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <CardHeader>
                    <CardTitle className="text-white">Staking Rewards</CardTitle>
                    <CardDescription className="text-white/70">Track and claim your earned rewards</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <StaggeredMotionWrapper staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <HoverMotionWrapper>
                            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                              <p className="text-white/70 text-sm mb-1">Pending Rewards</p>
                              <p className="text-2xl font-bold text-white">0 CROAK</p>
                              <p className="text-indigo-400 text-sm">≈ $0.00</p>
                              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: "0%" }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                ></motion.div>
                              </div>
                            </div>
                          </HoverMotionWrapper>

                          <HoverMotionWrapper>
                            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                              <p className="text-white/70 text-sm mb-1">Claimed Rewards</p>
                              <p className="text-2xl font-bold text-white">0 CROAK</p>
                              <p className="text-indigo-400 text-sm">≈ $0.00</p>
                              <div className="mt-2 flex items-center gap-2">
                                <PriceIndicator value={0} iconClassName="h-4 w-4" />
                                <span className="text-white/50 text-xs">this week</span>
                              </div>
                            </div>
                          </HoverMotionWrapper>

                          <HoverMotionWrapper>
                            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                              <p className="text-white/70 text-sm mb-1">Next Reward</p>
                              <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-white">--:--</p>
                                <Badge className="bg-indigo-500/20 text-indigo-400">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Countdown
                                </Badge>
                              </div>
                              <p className="text-indigo-400 text-sm">≈ 0 CROAK</p>
                            </div>
                          </HoverMotionWrapper>
                        </StaggeredMotionWrapper>

                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium">
                          Claim All Rewards
                        </Button>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">Reward History</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-indigo-500/20 text-white/70 hover:bg-indigo-500/10 hover:text-white"
                            >
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                          </div>

                          <EmptyState message="No reward history" />

                          <Button
                            variant="outline"
                            className="w-full border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10"
                          >
                            View All History
                          </Button>
                        </div>

                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Brain className="h-5 w-5 text-indigo-400" />
                            <h4 className="text-white font-medium">AI Reward Optimization</h4>
                          </div>

                          <p className="text-white/80 text-sm mb-3">
                            Our AI analysis suggests you could increase your rewards by 15% by moving your tokens to the
                            90-day staking pool with auto-compounding enabled.
                          </p>

                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="text-white/50 text-xs">Current Monthly Rewards</p>
                              <p className="text-white font-medium">0 CROAK</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="text-white/50 text-xs">Optimized Monthly Rewards</p>
                              <p className="text-emerald-500 font-medium">0 CROAK</p>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Apply Optimization
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </MotionWrapper>
        </div>
      </div>
    </div>
  )
}