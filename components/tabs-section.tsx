"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2, Users, Globe, PieChart } from "lucide-react"

export function TabsSection() {
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
    <Tabs defaultValue="community" className="w-full">
      <TabsList className="bg-[#0f172a]/80 border border-[#00ffaa]/20 w-full justify-start mb-6">
        <TabsTrigger
          value="community"
          className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Community
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
        >
          <PieChart className="h-4 w-4 mr-2" />
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="holders"
          className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
        >
          <Users className="h-4 w-4 mr-2" />
          Holders
        </TabsTrigger>
      </TabsList>

      <TabsContent value="community" className="mt-0">
        <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-[#00ffaa]/20 shadow-lg shadow-[#00ffaa]/5">
          <CardHeader>
            <CardTitle className="text-white">Community Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-start">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-[#00ffaa] to-[#00a3ff] text-black">ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  className="w-full p-3 bg-white/5 border border-[#00ffaa]/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#00ffaa]/30"
                  placeholder="Share something with the $CROAK community..."
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] hover:from-[#00ffaa]/90 hover:to-[#00a3ff]/90 text-black font-medium">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#00ffaa]/10 my-4"></div>

            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-[#00ffaa] to-[#00a3ff] text-black">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium text-white">{post.author}</span>
                        <span className="text-white/50 text-sm ml-2">{post.time}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-white/90">{post.content}</p>
                    <div className="flex gap-4 mt-4">
                      <button className="flex items-center gap-1 text-white/50 hover:text-[#00ffaa] transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-white/50 hover:text-[#00ffaa] transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-white/50 hover:text-[#00ffaa] transition-colors">
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
                className="border-[#00ffaa]/20 text-[#00ffaa] hover:bg-[#00ffaa]/10 hover:text-[#00ffaa]"
              >
                Load More
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-[#00ffaa]/20 shadow-lg shadow-[#00ffaa]/5">
            <CardHeader>
              <CardTitle className="text-white">Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full relative">
                {/* Simulated pie chart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 rounded-full border-8 border-[#00ffaa] opacity-20"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#00ffaa] border-r-[#00ffaa] rotate-45"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#00a3ff] rotate-[135deg]"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500 rotate-[225deg]"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#00ffaa]/70 rotate-[315deg]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-28 w-28 rounded-full bg-[#0f172a]/80 flex items-center justify-center">
                        <span className="text-white font-bold">$CROAK</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#00ffaa]"></div>
                    <span className="text-white/70 text-sm">Community (50%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#00a3ff]"></div>
                    <span className="text-white/70 text-sm">Team (15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-white/70 text-sm">Treasury (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#00ffaa]/70"></div>
                    <span className="text-white/70 text-sm">Liquidity & Marketing (15%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-[#00ffaa]/20 shadow-lg shadow-[#00ffaa]/5">
            <CardHeader>
              <CardTitle className="text-white">Market Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                <div className="flex justify-between">
                  <span className="text-white/70">Market Cap</span>
                  <span className="font-bold text-white">$12,450,000</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                  <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-white/50">vs. Competitors</span>
                  <span className="text-[#00ffaa]">+15%</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                <div className="flex justify-between">
                  <span className="text-white/70">24h Volume</span>
                  <span className="font-bold text-white">$1,245,678</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                  <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[45%]"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-white/50">vs. Yesterday</span>
                  <span className="text-[#00ffaa]">+8%</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                <div className="flex justify-between">
                  <span className="text-white/70">Circulating Supply</span>
                  <span className="font-bold text-white">124,500,000 CROAK</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                  <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[62%]"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-white/50">of Total Supply</span>
                  <span className="text-white/70">62.25%</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                <div className="flex justify-between">
                  <span className="text-white/70">Total Supply</span>
                  <span className="font-bold text-white">200,000,000 CROAK</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                  <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[100%]"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-white/50">Max Supply</span>
                  <span className="text-white/70">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="holders" className="mt-0">
        <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-[#00ffaa]/20 shadow-lg shadow-[#00ffaa]/5">
          <CardHeader>
            <CardTitle className="text-white">Global Holder Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full relative bg-[#0f172a]/50 rounded-lg overflow-hidden">
              {/* Simulated world map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="h-40 w-40 text-[#00ffaa]/20" />
              </div>

              {/* Holder hotspots */}
              <div className="absolute top-1/4 left-1/4 h-4 w-4 bg-[#00ffaa]/20 rounded-full animate-ping"></div>
              <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-[#00ffaa] rounded-full"></div>

              <div
                className="absolute top-1/3 right-1/3 h-4 w-4 bg-[#00ffaa]/20 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="absolute top-1/3 right-1/3 h-2 w-2 bg-[#00ffaa] rounded-full"></div>

              <div
                className="absolute bottom-1/3 right-1/4 h-4 w-4 bg-[#00a3ff]/20 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="absolute bottom-1/3 right-1/4 h-2 w-2 bg-[#00a3ff] rounded-full"></div>

              <div
                className="absolute bottom-1/4 left-1/3 h-4 w-4 bg-[#00a3ff]/20 rounded-full animate-ping"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div className="absolute bottom-1/4 left-1/3 h-2 w-2 bg-[#00a3ff] rounded-full"></div>

              <div
                className="absolute top-1/2 left-1/2 h-4 w-4 bg-purple-500/20 rounded-full animate-ping"
                style={{ animationDelay: "2s" }}
              ></div>
              <div className="absolute top-1/2 left-1/2 h-2 w-2 bg-purple-500 rounded-full"></div>

              {/* Stats overlay */}
              <div className="absolute top-4 left-4 bg-[#0f172a]/70 backdrop-blur-sm rounded-lg p-3">
                <div className="text-white font-bold">12,458 Holders</div>
                <div className="text-white/70 text-sm">Across 45 countries</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                <h3 className="text-white font-medium mb-3">Top Regions</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">North America</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full">
                    <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[35%]"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Europe</span>
                    <span className="text-white">28%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full">
                    <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[28%]"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Asia</span>
                    <span className="text-white">25%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full">
                    <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[25%]"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Other Regions</span>
                    <span className="text-white">12%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full">
                    <div className="bg-gradient-to-r from-[#00ffaa] to-[#00a3ff] h-1.5 rounded-full w-[12%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                <h3 className="text-white font-medium mb-3">Holder Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Average Holding</span>
                    <span className="text-white font-bold">10,245 CROAK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Median Holding</span>
                    <span className="text-white font-bold">5,120 CROAK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">New Holders (24h)</span>
                    <span className="text-white font-bold">+124</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Holder Retention</span>
                    <span className="text-white font-bold">92.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}