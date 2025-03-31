"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Mail, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CrystalBackground } from "@/components/crystal-background"
import { useWeb3 } from "@/components/web3-provider"

export default function LandingPage() {
  const router = useRouter()
  const { connect, isConnecting } = useWeb3()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Custom wrapper functions for connection methods
  const connectWithEmail = async (email: string, password: string) => {
    // We should add methods to set the email/password authentication info
    // before calling connect without parameters
    try {
      // Assuming connect() doesn't take parameters but uses pre-configured settings
      return await connect();
    } catch (err) {
      console.error("Email connection failed:", err);
      throw err;
    }
  }

  const connectWithSocial = async (provider: string) => {
    // We should add methods to set the social provider info
    // before calling connect without parameters
    try {
      // Assuming connect() doesn't take parameters but uses pre-configured settings
      return await connect();
    } catch (err) {
      console.error(`${provider} connection failed:`, err);
      throw err;
    }
  }

  const handleWalletConnect = async () => {
    try {
      setError("")
      await connect()
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
    }
  }

  const handleEmailConnect = async () => {
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      setError("")
      await connectWithEmail(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    }
  }

  const handleSocialConnect = async (provider: string) => {
    try {
      setError("")
      await connectWithSocial(provider)
      router.push("/dashboard")
    } catch (err) {
      setError(`Failed to connect with ${provider}. Please try again.`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Crystal Background */}
      <div className="absolute inset-0 z-0">
        <CrystalBackground />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 pointer-events-none z-0" />

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        <ParticleEffect />
      </div>

      {/* Hero Section */}
      <div className="z-10 max-w-5xl w-full flex flex-col items-center text-center mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-24 h-24 mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
            <Brain className="h-12 w-12 text-indigo-400" />
          </div>
          <div
            className="absolute -inset-2 rounded-full border-2 border-indigo-500/20 animate-ping"
            style={{ animationDuration: "3s" }}
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600"
        >
          CROAK
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl text-gray-300"
        >
          AI-Powered Trading & Analytics Platform
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-gray-400 max-w-2xl"
        >
          Experience the future of crypto trading with our advanced AI algorithms, real-time market insights, and
          community-driven governance. Our platform boasts a{" "}
          <span className="text-emerald-400 font-semibold">90% win rate</span> powered by cutting-edge machine learning.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-gray-300">90% Win Rate</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-sm text-gray-300">Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-300">AI-Powered Insights</span>
          </div>
        </motion.div>
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="border-indigo-500/30 bg-black/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Connect to Dashboard
            </CardTitle>
            <CardDescription>Sign in with your preferred method to access the CROAK dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-start gap-2"
                >
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Tabs defaultValue="wallet" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/20">
                <TabsTrigger
                  value="wallet"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="email" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  Social
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wallet" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Connect your wallet to access the CROAK dashboard and all features
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-[#3B99FC] hover:bg-[#2d7ad9] flex items-center justify-center gap-2 p-6"
                      onClick={handleWalletConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <>
                          <img src="/metamask-fox.svg" alt="MetaMask" className="h-6 w-6" />
                          <span>MetaMask</span>
                        </>
                      )}
                    </Button>

                    <Button
                      className="bg-[#3396FF] hover:bg-[#2d7ad9] flex items-center justify-center gap-2 p-6"
                      onClick={handleWalletConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <>
                          <img src="/walletconnect-logo.svg" alt="WalletConnect" className="h-6 w-6" />
                          <span>WalletConnect</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-[#0052FF] hover:bg-[#0039b3] flex items-center justify-center gap-2 p-6"
                      onClick={handleWalletConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <>
                          <img src="/coinbase-logo.svg" alt="Coinbase" className="h-6 w-6" />
                          <span>Coinbase</span>
                        </>
                      )}
                    </Button>

                    <Button
                      className="bg-[#6748FF] hover:bg-[#5438d9] flex items-center justify-center gap-2 p-6"
                      onClick={handleWalletConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <>
                          <img src="/phantom-logo.svg" alt="Phantom" className="h-6 w-6" />
                          <span>Phantom</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="email" className="mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                    />
                  </div>
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
                    onClick={handleEmailConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Sign In with Email
                      </>
                    )}
                  </Button>
                  <div className="text-center">
                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">Connect with your social account for quick access</p>
                  <Button
                    className="w-full bg-[#1DA1F2] hover:bg-[#1a94e0] flex items-center justify-center gap-2 p-6"
                    onClick={() => handleSocialConnect("Twitter")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      <>
                        <img src="/twitter-logo.svg" alt="Twitter" className="h-5 w-5" />
                        Sign in with Twitter
                      </>
                    )}
                  </Button>
                  <Button
                    className="w-full bg-[#5865F2] hover:bg-[#4a56d4] flex items-center justify-center gap-2 p-6"
                    onClick={() => handleSocialConnect("Discord")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      <>
                        <img src="/discord-logo.svg" alt="Discord" className="h-5 w-5" />
                        Sign in with Discord
                      </>
                    )}
                  </Button>
                  <Button
                    className="w-full bg-[#4267B2] hover:bg-[#365899] flex items-center justify-center gap-2 p-6"
                    onClick={() => handleSocialConnect("Facebook")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      <>
                        <img src="/facebook-logo.svg" alt="Facebook" className="h-5 w-5" />
                        Sign in with Facebook
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-500">By connecting, you agree to our Terms of Service</p>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="z-10 mt-16 w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-indigo-400" />}
            title="AI-Powered Trading"
            description="Our advanced AI algorithms analyze market patterns to provide trading signals with 90% accuracy."
          />
          <FeatureCard
            icon={
              <svg
                className="h-8 w-8 text-purple-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12.5L7.5 7L12.5 12L17.5 7L22 12.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17.5L7.5 12L12.5 17L17.5 12L22 17.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Real-Time Analytics"
            description="Get instant insights on market trends, token performance, and trading opportunities."
          />
          <FeatureCard
            icon={
              <svg
                className="h-8 w-8 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
            title="Community Governance"
            description="Participate in platform decisions and proposals through our decentralized governance system."
          />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="z-10 mt-16 mb-8 text-center"
      >
        <p className="text-gray-400 text-sm">© 2025 CROAK Finance. All rights reserved.</p>
      </motion.div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-600/10 rounded-bl-full"></div>
      <CardContent className="pt-6">
        <div className="bg-gray-800/40 p-3 rounded-lg w-fit mb-4">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

function ParticleEffect() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.5 + 0.1, Math.random() * 0.5 + 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
          }}
        />
      ))}
    </div>
  )
}
