"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface SimpleCardProps {
  color: string
  title: string
  index: number
  onSwipe?: () => void
}

export function SimpleCard({ color, title, index, onSwipe }: SimpleCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState(0)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false)

    // Check if the drag was significant enough to count as a swipe
    if (Math.abs(info.offset.x) > 100) {
      setDirection(info.offset.x > 0 ? 1 : -1)

      // Call the onSwipe callback
      setTimeout(() => {
        if (onSwipe) onSwipe()
      }, 300)
    }
  }

  // Calculate stacking effect
  const rotate = -1.5 * index
  const scale = 1 - index * 0.02

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg flex items-center justify-center"
      style={{
        backgroundColor: color,
        zIndex: 10 - index,
        rotate: rotate,
        scale: scale,
        transformOrigin: "bottom center",
      }}
      drag={index === 0}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{
        x: direction !== 0 ? (direction > 0 ? 1000 : -1000) : 0,
        y: direction !== 0 ? 200 : 0,
        rotate: direction !== 0 ? (direction > 0 ? 30 : -30) : rotate,
      }}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 400,
      }}
    >
      <div className="text-white font-bold text-xl">{title}</div>
    </motion.div>
  )
}

