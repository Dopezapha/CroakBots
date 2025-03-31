import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CrystalBackground } from "@/components/crystal-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Brain, Bell, Shield, Eye, Moon, Sun, Wallet } from "lucide-react"

export const metadata: Metadata = {
  title: "CROAK | Settings",
  description: "Customize your CROAK dashboard experience",
}

export default function SettingsPage() {
  return (
    <main className="flex-1 overflow-auto">
      <CrystalBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Customize your CROAK dashboard experience</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-black/20 mb-6">
            <TabsTrigger value="account" className="data-[state=active]:bg-indigo-600">
              <Wallet className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-indigo-600">
              <Eye className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-indigo-600">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-indigo-600">
              <Brain className="h-4 w-4 mr-2" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-indigo-600">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Your username" className="bg-gray-900/50 border-gray-700" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" className="bg-gray-900/50 border-gray-700" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet">Connected Wallet</Label>
                  <div className="flex items-center">
                    <Input id="wallet" value="0x1234...5678" disabled className="bg-gray-900/50 border-gray-700" />
                    <Button variant="outline" className="ml-2">
                      Disconnect
                    </Button>
                  </div>
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the dashboard looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-gray-400">Toggle between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-gray-400" />
                    <Switch id="dark-mode" defaultChecked />
                    <Moon className="h-4 w-4 text-indigo-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-gray-400">Enable or disable UI animations</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="crystal-bg">Crystal Background</Label>
                    <p className="text-sm text-gray-400">Enable or disable the crystal background effect</p>
                  </div>
                  <Switch id="crystal-bg" defaultChecked />
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="price-alerts">Price Alerts</Label>
                    <p className="text-sm text-gray-400">Receive notifications for significant price changes</p>
                  </div>
                  <Switch id="price-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-predictions">AI Predictions</Label>
                    <p className="text-sm text-gray-400">Receive notifications for new AI trading predictions</p>
                  </div>
                  <Switch id="ai-predictions" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="governance">Governance Updates</Label>
                    <p className="text-sm text-gray-400">Receive notifications for new governance proposals</p>
                  </div>
                  <Switch id="governance" defaultChecked />
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Settings</CardTitle>
                <CardDescription>Customize your AI assistant and prediction preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-assistant">AI Assistant</Label>
                    <p className="text-sm text-gray-400">Enable or disable the AI assistant</p>
                  </div>
                  <Switch id="ai-assistant" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-predictions">AI Trading Predictions</Label>
                    <p className="text-sm text-gray-400">Enable or disable AI trading predictions</p>
                  </div>
                  <Switch id="ai-predictions" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-sentiment">AI Sentiment Analysis</Label>
                    <p className="text-sm text-gray-400">Enable or disable AI sentiment analysis for community posts</p>
                  </div>
                  <Switch id="ai-sentiment" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai-confidence">Minimum AI Confidence Threshold</Label>
                  <p className="text-sm text-gray-400">Only show predictions with confidence above this threshold</p>
                  <Input
                    id="ai-confidence"
                    type="number"
                    defaultValue="90"
                    min="50"
                    max="100"
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="2fa" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}