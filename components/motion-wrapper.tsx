"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type MotionWrapperProps = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  type?: "spring" | "tween"
  once?: boolean
}

export function MotionWrapper({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  direction = "up",
  type = "spring",
  once = true,
}: MotionWrapperProps) {
  // Define the initial and animate states based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
  }

  const animate = { opacity: 1, y: 0, x: 0 }

  // Define transition based on type
  const transition =
    type === "spring"
      ? { type: "spring", stiffness: 100, damping: 15, delay }
      : { type: "tween", duration, delay, ease: "easeOut" }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredMotionWrapper({
  children,
  staggerDelay = 0.1,
  className = "",
  once = true,
}: {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
  once?: boolean
}) {
  return (
    <div className={className}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * staggerDelay,
            }}
          >
            {child}
          </motion.div>
        ))}
    </div>
  )
}

export function HoverMotionWrapper({
  children,
  className = "",
  scale = 1.05,
  rotate = 0,
}: {
  children: ReactNode
  className?: string
  scale?: number
  rotate?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate: rotate,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseMotionWrapper({
  children,
  className = "",
  intensity = 1.05,
  duration = 2,
}: {
  children: ReactNode
  className?: string
  intensity?: number
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, intensity, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatMotionWrapper({
  children,
  className = "",
  yOffset = 10,
  duration = 3,
}: {
  children: ReactNode
  className?: string
  yOffset?: number
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-yOffset / 2, yOffset / 2],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}