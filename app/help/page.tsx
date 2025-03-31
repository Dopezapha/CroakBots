import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CrystalBackground } from "@/components/crystal-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, HelpCircle, MessageSquare, FileText, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "CROAK | Help & Support",
  description: "Get help and support for the CROAK dashboard",
}

export default function HelpPage() {
  return (
    <main className="flex-1 overflow-auto">
      <CrystalBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            Help & Support
          </h1>
          <p className="text-gray-400 mt-2">Get help and support for your CROAK dashboard</p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="bg-black/20 mb-6">
            <TabsTrigger value="faq" className="data-[state=active]:bg-indigo-600">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="data-[state=active]:bg-indigo-600">
              <Brain className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="documentation" className="data-[state=active]:bg-indigo-600">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-indigo-600">
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about CROAK</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is CROAK?</AccordionTrigger>
                    <AccordionContent>
                      CROAK is an AI-powered memecoin that leverages advanced artificial intelligence to provide trading
                      insights, market predictions, and community analytics with a 90% accuracy rate.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How does the AI trading prediction work?</AccordionTrigger>
                    <AccordionContent>
                      Our AI trading prediction system analyzes vast amounts of market data, on-chain metrics, social
                      sentiment, and historical patterns to generate trading signals with a 90% accuracy rate. The AI
                      continuously learns and improves its predictions based on new data.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I connect my wallet?</AccordionTrigger>
                    <AccordionContent>
                      Click on the "Connect Wallet" button in the top right corner of the dashboard. You can connect
                      using MetaMask, WalletConnect, or other supported wallet providers. Once connected, you'll have
                      access to all dashboard features.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What is the staking APY?</AccordionTrigger>
                    <AccordionContent>
                      The current staking APY varies based on the total amount staked and market conditions. Our AI
                      staking strategy recommends the optimal staking approach to maximize your returns based on your
                      risk tolerance and investment goals.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I participate in governance?</AccordionTrigger>
                    <AccordionContent>
                      CROAK holders can participate in governance by voting on proposals in the Community section. Each
                      CROAK token represents one vote. You can also create new proposals if you hold a minimum threshold
                      of tokens.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we prioritize security and privacy. Your wallet is only connected through secure protocols,
                      and we never store your private keys. All AI analysis is performed on encrypted data to ensure
                      your information remains protected.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-assistant">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Get help from our AI assistant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-indigo-400">CROAK AI</div>
                      <p className="mt-1 text-sm">
                        Hello! I'm your CROAK AI assistant. How can I help you today? You can ask me about trading
                        strategies, token information, staking options, or any other questions about CROAK.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input placeholder="Ask the AI assistant..." className="bg-gray-900/50 border-gray-700" />
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask
                  </Button>
                </div>

                <div className="text-xs text-gray-400 flex items-center">
                  <Brain className="h-3 w-3 mr-1 text-indigo-400" />
                  AI responses have a 90% accuracy rate based on historical data
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Comprehensive guides and documentation for CROAK</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to get started with CROAK, connect your wallet, and navigate the dashboard.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Trading Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to use the AI trading predictions and execute trades on the platform.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Staking Tutorial</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to stake your CROAK tokens and maximize your returns using AI strategies.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Governance Participation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Learn how to participate in CROAK governance and vote on proposals.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mt-6">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <FileText className="h-4 w-4 mr-2" />
                    View All Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="bg-gray-900/50 border-gray-700" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" className="bg-gray-900/50 border-gray-700" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Subject" className="bg-gray-900/50 border-gray-700" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your message"
                    className="w-full rounded-md border border-gray-700 bg-gray-900/50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Other Ways to Reach Us</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium">Discord Community</div>
                        <p className="text-sm text-gray-400">Join our Discord community for real-time support</p>
                        <a href="#" className="text-sm text-indigo-400 hover:underline">
                          discord.gg/croak
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium">Email Support</div>
                        <p className="text-sm text-gray-400">Email our support team directly</p>
                        <a href="#" className="text-sm text-indigo-400 hover:underline">
                          support@croaktoken.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}