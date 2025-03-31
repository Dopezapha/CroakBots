"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Menu, X, TrendingUp, Users, Activity, Zap, Heart, MessageSquare, Share2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function CroakDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const posts = [
    {
      id: 1,
      author: "CroakMaster",
      avatar: "CM",
      time: "2h ago",
      content: "Just added more $CROAK to my bag! This community is amazing. Who else is bullish? 🐸🚀",
      likes: 42,
      comments: 12,
      shares: 5,
    },
    {
      id: 2,
      author: "EfrogEnthusiast",
      avatar: "EE",
      time: "5h ago",
      content:
        "New Efroglets NFT drop coming next week! Get ready to mint these cute little guys. Here's a sneak peek of the rarest one in the collection. 🐸✨",
      likes: 78,
      comments: 24,
      shares: 15,
    },
    {
      id: 3,
      author: "LinealLeaper",
      avatar: "LL",
      time: "1d ago",
      content:
        "The Linea ecosystem is growing fast! $CROAK is positioned perfectly to be the memecoin of choice. What other Linea projects are you all excited about?",
      likes: 36,
      comments: 18,
      shares: 7,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-950 to-green-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-green-800 bg-green-950/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-full">
                <span className="text-xl">🐸</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">CROAK</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
              Swap
            </a>
            <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
              Staking
            </a>
            <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
              Community
            </a>
            <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
              Docs
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-green-300 hover:text-white hover:bg-green-900">
              <Bell className="h-5 w-5" />
            </Button>

            <Button className="hidden md:flex bg-green-500 hover:bg-green-600 text-white">Connect Wallet</Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-green-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden container py-4 bg-green-950 border-b border-green-800">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
                Dashboard
              </a>
              <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
                Swap
              </a>
              <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
                Staking
              </a>
              <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
                Community
              </a>
              <a href="#" className="text-sm font-medium text-green-300 hover:text-white">
                Docs
              </a>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Connect Wallet</Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 container mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">$CROAK Dashboard</h1>
            <p className="text-green-300">The premier community hub for Efrogs and $CROAK enthusiasts</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Connect Wallet</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-green-950/50 border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Current Price</p>
                  <h3 className="text-2xl font-bold text-white">$0.0245</h3>
                  <p className="text-sm font-medium text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +5.67% (24h)
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-950/50 border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Holders</p>
                  <h3 className="text-2xl font-bold text-white">12,458</h3>
                  <p className="text-sm font-medium text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +124 (24h)
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-950/50 border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Liquidity</p>
                  <h3 className="text-2xl font-bold text-white">$2.45M</h3>
                  <p className="text-sm font-medium text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +2.3% (24h)
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-950/50 border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-300">Network</p>
                  <h3 className="text-2xl font-bold text-white">Linea</h3>
                  <p className="text-sm font-medium text-green-300 flex items-center mt-1">
                    <Zap className="h-4 w-4 mr-1" />
                    Fast & Secure
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-green-950/50 border-green-800 text-white">
            <CardHeader>
              <CardTitle>$CROAK Price</CardTitle>
              <CardDescription className="text-green-300">Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-green-500 text-lg">📈 Price trending up: $0.0245 (+5.67%)</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-950/50 border-green-800 text-white">
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription className="text-green-300">Weekly breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-green-500 text-lg">📊 Weekly volume: $1,245,678</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="community" className="w-full">
          <TabsList className="bg-green-950/50 text-green-300">
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="holders">Holders</TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="mt-4">
            <div className="space-y-4">
              <Card className="bg-green-950/50 border-green-800 text-white">
                <CardHeader>
                  <CardTitle>Community Feed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <Avatar>
                      <AvatarFallback className="bg-green-700">ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea
                        className="w-full p-3 bg-green-900/50 border border-green-800 rounded-lg text-white placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Share something with the $CROAK community..."
                        rows={3}
                      />
                      <div className="flex justify-end mt-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white">Post</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-green-800 my-4"></div>

                  {posts.map((post) => (
                    <div key={post.id} className="p-4 bg-green-900/30 rounded-lg">
                      <div className="flex gap-3 items-start">
                        <Avatar>
                          <AvatarFallback className="bg-green-700">{post.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium">{post.author}</span>
                              <span className="text-green-400 text-sm ml-2">{post.time}</span>
                            </div>
                          </div>
                          <p className="mt-2 text-green-100">{post.content}</p>
                          <div className="flex gap-4 mt-4">
                            <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                              <Heart className="h-4 w-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                              <Share2 className="h-4 w-4" />
                              <span className="text-sm">{post.shares}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-4">
                    <Button
                      variant="outline"
                      className="border-green-700 text-green-300 hover:bg-green-900 hover:text-green-200"
                    >
                      Load More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-950/50 border-green-800 text-white">
                <CardHeader>
                  <CardTitle>Token Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-green-500 text-lg">
                      🍰 Community: 50%, Team: 15%, Treasury: 20%, Liquidity: 10%, Marketing: 5%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-950/50 border-green-800 text-white">
                <CardHeader>
                  <CardTitle>Market Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-green-300">Market Cap</span>
                    <span className="font-bold">$12,450,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">24h Volume</span>
                    <span className="font-bold">$1,245,678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Circulating Supply</span>
                    <span className="font-bold">124,500,000 CROAK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Total Supply</span>
                    <span className="font-bold">200,000,000 CROAK</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="holders" className="mt-4">
            <Card className="bg-green-950/50 border-green-800 text-white">
              <CardHeader>
                <CardTitle>Global Holder Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-green-500 text-lg">🌎 12,458 holders across 45 countries</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-green-800 bg-green-950/80">
        <div className="container mx-auto text-center text-green-300">
          <p>$CROAK Community Dashboard — Built with 💚 for the Efrog community</p>
        </div>
      </footer>
    </div>
  )
}