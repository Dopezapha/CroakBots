"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CrystalBackground() {
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

    // Crystal class
    class Crystal {
      x: number
      y: number
      size: number
      color: string
      points: number
      rotation: number
      rotationSpeed: number
      opacity: number
      pulseSpeed: number
      pulseAmount: number
      currentPulse: number
      glowIntensity: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 120 + 40 // Smaller size range
        this.color = this.getRandomColor()
        this.points = Math.floor(Math.random() * 2) + 4 // 4-5 points for smoother shapes
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.001 // Slower rotation
        this.opacity = Math.random() * 0.15 + 0.05 // Lower opacity
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.pulseAmount = Math.random() * 0.2 + 0.1
        this.currentPulse = 0
        this.glowIntensity = Math.random() * 10 + 5
      }

      getRandomColor() {
        const colors = [
          "rgba(79, 70, 229, 0.6)", // indigo
          "rgba(139, 92, 246, 0.6)", // purple
          "rgba(59, 130, 246, 0.6)", // blue
          "rgba(16, 185, 129, 0.6)", // emerald
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.rotation += this.rotationSpeed
        this.currentPulse += this.pulseSpeed
        const pulseFactor = 1 + Math.sin(this.currentPulse) * this.pulseAmount

        if (ctx) {
          ctx.save()
          ctx.translate(this.x, this.y)
          ctx.rotate(this.rotation)
          ctx.globalAlpha = this.opacity

          // Add glow effect
          ctx.shadowBlur = this.glowIntensity
          ctx.shadowColor = this.color

          // Draw crystal with rounded corners
          ctx.beginPath()

          for (let i = 0; i < this.points; i++) {
            const angle = (i / this.points) * Math.PI * 2
            const nextAngle = ((i + 1) / this.points) * Math.PI * 2
            const radius = this.size * pulseFactor

            const x1 = Math.cos(angle) * radius
            const y1 = Math.sin(angle) * radius

            const x2 = Math.cos(nextAngle) * radius
            const y2 = Math.sin(nextAngle) * radius

            // First point
            if (i === 0) {
              ctx.moveTo(x1, y1)
            }

            // Use quadratic curves for rounded corners
            const cpX = (x1 + x2) / 2 + Math.random() * 10 - 5 // Control point with slight randomness
            const cpY = (y1 + y2) / 2 + Math.random() * 10 - 5
            ctx.quadraticCurveTo(cpX, cpY, x2, y2)
          }

          ctx.closePath()

          // Create gradient fill
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * pulseFactor)
          gradient.addColorStop(0, this.color.replace("0.6", "0.8"))
          gradient.addColorStop(1, this.color.replace("0.6", "0.2"))

          ctx.fillStyle = gradient
          ctx.fill()

          // Add subtle outline
          ctx.strokeStyle = this.color.replace("0.6", "0.9")
          ctx.lineWidth = 0.5 // Thinner lines
          ctx.stroke()

          ctx.restore()
        }
      }
    }

    // Create crystals
    const crystals: Crystal[] = []
    const crystalCount = 10 // Reduced number of crystals

    for (let i = 0; i < crystalCount; i++) {
      crystals.push(new Crystal())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)

      // Draw crystals
      crystals.forEach((crystal) => {
        crystal.update()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  )
}