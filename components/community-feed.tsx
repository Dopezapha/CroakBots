"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Share2, Brain, ThumbsUp, ThumbsDown } from "lucide-react"
import { motion } from "framer-motion"

type Post = {
  id: string
  author: string
  authorInitials: string
  content: string
  timestamp: string
  likes: number
  comments: number
  sentiment: "positive" | "neutral" | "negative"
  sentimentScore: number
}

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "CroakWhale",
      authorInitials: "CW",
      content:
        "Just increased my $CROAK position! The AI predictions have been spot on lately. Anyone else following the AI strategy?",
      timestamp: "2h ago",
      likes: 24,
      comments: 5,
      sentiment: "positive",
      sentimentScore: 0.92,
    },
    {
      id: "2",
      author: "TokenTrader",
      authorInitials: "TT",
      content: "The new staking rewards are live! Getting 15% APY on my $CROAK tokens now.",
      timestamp: "5h ago",
      likes: 18,
      comments: 3,
      sentiment: "positive",
      sentimentScore: 0.87,
    },
    {
      id: "3",
      author: "CryptoAnalyst",
      authorInitials: "CA",
      content: "Market's been volatile but $CROAK holding strong. The community support is impressive.",
      timestamp: "1d ago",
      likes: 32,
      comments: 7,
      sentiment: "neutral",
      sentimentScore: 0.65,
    },
  ])

  const [newPost, setNewPost] = useState("")

  const handlePost = () => {
    if (!newPost.trim()) return

    // In a real app, you would send this to your backend
    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      authorInitials: "YO",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      sentiment: "positive",
      sentimentScore: 0.75,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const getSentimentColor = (sentiment: Post["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-500/20 text-emerald-500"
      case "negative":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getSentimentIcon = (sentiment: Post["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-3 w-3 mr-1" />
      case "negative":
        return <ThumbsDown className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  return (
    <Card className="border-indigo-500/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Community Feed</span>
          <Badge variant="outline" className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
            <Brain className="h-3 w-3 mr-1" /> AI Sentiment Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Share your thoughts on $CROAK..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-gray-900/50 border-gray-700"
          />
          <Button onClick={handlePost} className="bg-indigo-600 hover:bg-indigo-700">
            Post
          </Button>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-lg bg-gray-800/40 border border-gray-700"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 bg-indigo-600">
                  <AvatarFallback>{post.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{post.author}</div>
                    <div className="text-xs text-gray-400">{post.timestamp}</div>
                  </div>
                  <p className="mt-2 text-sm">{post.content}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center text-xs text-gray-400 hover:text-indigo-400">
                        <Heart className="h-4 w-4 mr-1" /> {post.likes}
                      </button>
                      <button className="flex items-center text-xs text-gray-400 hover:text-indigo-400">
                        <MessageSquare className="h-4 w-4 mr-1" /> {post.comments}
                      </button>
                      <button className="flex items-center text-xs text-gray-400 hover:text-indigo-400">
                        <Share2 className="h-4 w-4 mr-1" /> Share
                      </button>
                    </div>
                    <Badge variant="outline" className={getSentimentColor(post.sentiment)}>
                      {getSentimentIcon(post.sentiment)}
                      {Math.round(post.sentimentScore * 100)}% {post.sentiment}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}