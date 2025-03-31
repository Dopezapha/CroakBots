"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Calendar, Clock } from "lucide-react"

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-[#00ffaa]/20 shadow-lg shadow-[#00ffaa]/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#00ffaa]/10">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">$CROAK Price</CardTitle>
              <CardDescription className="text-white/70">Last 30 days</CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-[#00ffaa]/10 px-3 py-1 rounded-full">
              <ArrowUpRight className="h-4 w-4 text-[#00ffaa]" />
              <span className="text-[#00ffaa] text-sm font-medium">+24.5%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1m" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-[#0f172a]/80 border border-[#00ffaa]/20">
                <TabsTrigger
                  value="1d"
                  className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
                >
                  1D
                </TabsTrigger>
                <TabsTrigger
                  value="1w"
                  className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
                >
                  1W
                </TabsTrigger>
                <TabsTrigger
                  value="1m"
                  className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
                >
                  1M
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#00ffaa] data-[state=active]:text-black text-white/70"
                >
                  ALL
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock className="h-4 w-4" />
                <span>Live</span>
              </div>
            </div>

            <TabsContent value="1d" className="mt-0">
              <div className="h-64 w-full bg-gradient-to-b from-[#00ffaa]/5 to-transparent rounded-lg relative overflow-hidden">
                {/* Simulated chart line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path
                    d="M0,150 C50,120 100,180 150,140 C200,100 250,160 300,120 C350,80 400,100 400,70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffaa" />
                      <stop offset="100%" stopColor="#00a3ff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Price points */}
                <div className="absolute top-4 left-4 bg-[#0f172a]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white font-medium">
                  $0.0245
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#00ffaa]/10 px-3 py-1.5 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 text-[#00ffaa]" />
                  <span className="text-[#00ffaa] text-sm font-medium">+5.67%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Low</p>
                  <p className="text-white font-bold">$0.0231</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">High</p>
                  <p className="text-white font-bold">$0.0252</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Volume</p>
                  <p className="text-white font-bold">$245K</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="1w" className="mt-0">
              <div className="h-64 w-full bg-gradient-to-b from-[#00ffaa]/5 to-transparent rounded-lg relative overflow-hidden">
                {/* Simulated chart line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path
                    d="M0,160 C50,140 100,120 150,130 C200,140 250,100 300,80 C350,60 400,40 400,20"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffaa" />
                      <stop offset="100%" stopColor="#00a3ff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Price points */}
                <div className="absolute top-4 left-4 bg-[#0f172a]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white font-medium">
                  $0.0245
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#00ffaa]/10 px-3 py-1.5 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 text-[#00ffaa]" />
                  <span className="text-[#00ffaa] text-sm font-medium">+12.3%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Low</p>
                  <p className="text-white font-bold">$0.0218</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">High</p>
                  <p className="text-white font-bold">$0.0258</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Volume</p>
                  <p className="text-white font-bold">$1.2M</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="1m" className="mt-0">
              <div className="h-64 w-full bg-gradient-to-b from-[#00ffaa]/5 to-transparent rounded-lg relative overflow-hidden">
                {/* Simulated chart line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path
                    d="M0,180 C50,170 100,160 150,140 C200,120 250,100 300,60 C350,20 400,10 400,10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffaa" />
                      <stop offset="100%" stopColor="#00a3ff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Price points */}
                <div className="absolute top-4 left-4 bg-[#0f172a]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white font-medium">
                  $0.0245
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#00ffaa]/10 px-3 py-1.5 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 text-[#00ffaa]" />
                  <span className="text-[#00ffaa] text-sm font-medium">+24.5%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Low</p>
                  <p className="text-white font-bold">$0.0197</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">High</p>
                  <p className="text-white font-bold">$0.0265</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Volume</p>
                  <p className="text-white font-bold">$4.5M</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-0">
              <div className="h-64 w-full bg-gradient-to-b from-[#00ffaa]/5 to-transparent rounded-lg relative overflow-hidden">
                {/* Simulated chart line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path
                    d="M0,190 C50,180 100,170 150,160 C200,150 250,120 300,80 C350,40 400,10 400,10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffaa" />
                      <stop offset="100%" stopColor="#00a3ff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Price points */}
                <div className="absolute top-4 left-4 bg-[#0f172a]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white font-medium">
                  $0.0245
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#00ffaa]/10 px-3 py-1.5 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 text-[#00ffaa]" />
                  <span className="text-[#00ffaa] text-sm font-medium">+145%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Low</p>
                  <p className="text-white font-bold">$0.0100</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">High</p>
                  <p className="text-white font-bold">$0.0265</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-white/70 text-sm">Volume</p>
                  <p className="text-white font-bold">$12.4M</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-[#0f172a]/40 backdrop-blur-sm border border-[#00ffaa]/20 shadow-lg shadow-[#00ffaa]/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#00ffaa]/10">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Trading Volume</CardTitle>
              <CardDescription className="text-white/70">Weekly breakdown</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-white/70" />
              <span className="text-white/70 text-sm">Apr 15 - Apr 21</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-gradient-to-b from-[#00ffaa]/5 to-transparent rounded-lg relative overflow-hidden">
            {/* Simulated bar chart */}
            <div className="absolute inset-0 flex items-end justify-around p-4">
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[30%] opacity-80 hover:opacity-100 transition-all hover:h-[35%]"></div>
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[45%] opacity-80 hover:opacity-100 transition-all hover:h-[50%]"></div>
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[35%] opacity-80 hover:opacity-100 transition-all hover:h-[40%]"></div>
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[60%] opacity-80 hover:opacity-100 transition-all hover:h-[65%]"></div>
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[50%] opacity-80 hover:opacity-100 transition-all hover:h-[55%]"></div>
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[75%] opacity-80 hover:opacity-100 transition-all hover:h-[80%]"></div>
              <div className="w-8 bg-gradient-to-t from-[#00ffaa] to-[#00a3ff] rounded-t-md h-[65%] opacity-80 hover:opacity-100 transition-all hover:h-[70%]"></div>
            </div>

            {/* Day labels */}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-around p-2 text-white/70 text-xs">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Volume indicator */}
            <div className="absolute top-4 right-4 bg-[#0f172a]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white font-medium">
              Total: $1.24M
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
              <div className="flex justify-between items-center">
                <p className="text-white/70">Highest Day</p>
                <div className="flex items-center gap-1 text-[#00ffaa] text-sm">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="flex items-end justify-between mt-1">
                <p className="text-white font-bold text-lg">$250,000</p>
                <p className="text-white/70 text-sm">Saturday</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
              <div className="flex justify-between items-center">
                <p className="text-white/70">Lowest Day</p>
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <ArrowDownRight className="h-3 w-3" />
                  <span>-8%</span>
                </div>
              </div>
              <div className="flex items-end justify-between mt-1">
                <p className="text-white font-bold text-lg">$120,000</p>
                <p className="text-white/70 text-sm">Monday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}