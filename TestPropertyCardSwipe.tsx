"use client"

import type React from "react"
import { useState } from "react"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"

const TestPropertyCardSwipe: React.FC = () => {
  const [swipeResult, setSwipeResult] = useState<string | null>(null)

  // Create card swipe handler
  const handleSwipe = (direction: "left" | "right") => {
    setSwipeResult(direction === "right" ? "Liked!" : "Rejected!")

    // Reset after 2 seconds
    setTimeout(() => {
      setSwipeResult(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Property Card Swipe Test</h1>

      <div className="relative w-full max-w-sm">
        <PropertyCard onSwipe={handleSwipe} />
      </div>

      {swipeResult && <div className="mt-8 text-xl font-bold">{swipeResult}</div>}

      <div className="mt-8 text-sm text-gray-500">Swipe right to like, left to reject</div>
    </div>
  )
}

interface PropertyCardProps {
  onSwipe: (direction: "left" | "right") => void
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onSwipe }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [showLikeHeart, setShowLikeHeart] = useState(false)
  const [showDislikeHeart, setShowDislikeHeart] = useState(false)

  // Motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)

  // Transform for LIKE/NOPE labels
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return

    // Calculate rotation based on drag position and direction
    const dragDistanceX = info.offset.x
    const rotationFactor = 0.15
    const newRotation = dragDistanceX * rotationFactor

    rotate.set(newRotation)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100
    const velocity = 0.5

    const isSwipingRight = info.offset.x > threshold && info.velocity.x > velocity
    const isSwipingLeft = info.offset.x < -threshold && info.velocity.x < -velocity

    if (isSwipingRight) {
      // Exit to the right with curved trajectory upward
      const exitX = window.innerWidth + 200
      const exitY = -100 // Upward arc
      const exitRotation = 30

      // Show like heart
      setShowLikeHeart(true)

      // Animate exit
      x.set(exitX)
      y.set(exitY)
      rotate.set(exitRotation)

      setTimeout(() => {
        onSwipe("right")
        setShowLikeHeart(false)
        // Reset positions
        x.set(0)
        y.set(0)
        rotate.set(0)
      }, 500)
    } else if (isSwipingLeft) {
      // Exit to the left with curved trajectory upward
      const exitX = -window.innerWidth - 200
      const exitY = -100 // Upward arc
      const exitRotation = -30

      // Show dislike heart
      setShowDislikeHeart(true)

      // Animate exit
      x.set(exitX)
      y.set(exitY)
      rotate.set(exitRotation)

      setTimeout(() => {
        onSwipe("left")
        setShowDislikeHeart(false)
        // Reset positions
        x.set(0)
        y.set(0)
        rotate.set(0)
      }, 500)
    } else {
      // Return to center
      x.set(0)
      y.set(0)
      rotate.set(0)
    }
  }

  return (
    <div className="relative">
      <motion.div
        className="bg-white rounded-xl shadow-xl overflow-hidden touch-none cursor-grab active:cursor-grabbing"
        style={{ x, y, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.02 }}
      >
        {/* Property image */}
        <div className="h-64 bg-gray-300 relative">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property info */}
        <div className="p-4">
          <h2 className="text-xl font-bold">Avenue Victor Hugo • 16th</h2>
          <p className="text-gray-700">€780,000 | 85m² | 2 pieces | Apt.</p>
        </div>

        {/* Like indicator */}
        <motion.div
          className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold transform rotate-12"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>

        {/* Dislike indicator */}
        <motion.div
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold transform -rotate-12"
          style={{ opacity: dislikeOpacity }}
        >
          NOPE
        </motion.div>
      </motion.div>

      {/* Like heart animation */}
      {showLikeHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.img
            src="https://p129.p0.n0.cdn.zight.com/items/nOurdnR1/dda6975b-4cbd-4ee4-b6a0-fdb4e40877ed.svg?v=b8d7727135f3ba2efdedc7a91c06588a"
            alt="Like"
            className="w-32 h-32"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 1 }}
          />
        </div>
      )}

      {/* Dislike heart animation */}
      {showDislikeHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.img
            src="https://p129.p0.n0.cdn.zight.com/items/6qupKPZb/f43dadd4-28a0-497b-978e-95211e258a71.svg?v=516e7098d6fc59cf68466fa4ce4da63f"
            alt="Nope"
            className="w-32 h-32"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 1 }}
          />
        </div>
      )}
    </div>
  )
}

export default TestPropertyCardSwipe

