"use client"

import { useEffect, useRef } from "react"

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node class
    class Node {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.radius = Math.random() * 1.5 + 0.5
        this.vx = Math.random() * 0.2 - 0.1
        this.vy = Math.random() * 0.2 - 0.1

        // Colors in indigo/purple/blue range
        const colors = [
          "rgba(99, 102, 241, 0.7)", // indigo-500
          "rgba(139, 92, 246, 0.7)", // purple-500
          "rgba(59, 130, 246, 0.7)", // blue-500
          "rgba(79, 70, 229, 0.7)", // indigo-600
          "rgba(124, 58, 237, 0.7)", // purple-600
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create nodes
    const nodeCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000))
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    // Draw connections between nodes
    function drawConnections() {
      if (!ctx) return

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)

            // Gradient based on distance
            const opacity = 1 - distance / 150
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`
            ctx.lineWidth = opacity * 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      // Clear canvas with a slight fade effect
      ctx.fillStyle = "rgba(10, 15, 41, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      for (const node of nodes) {
        node.update()
        node.draw()
      }

      // Draw connections
      drawConnections()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-transparent"
      style={{ background: "linear-gradient(to bottom right, #0a0f29, #101935, #0c1f2c)" }}
    />
  )
}