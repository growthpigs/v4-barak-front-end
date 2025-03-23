"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Info, Phone, Share2, ExternalLink } from "lucide-react"
import ActionButton from "./ActionButton"
import type { Property } from "./services/api/propertyService"

interface PropertyCardProps {
  property: Property
  index: number
  total: number
  onRemove: (id: number) => void
  onAction?: (action: string, propertyId: number) => void
}

export function PropertyCard({ property, index = 0, total = 1, onRemove, onAction }: PropertyCardProps) {
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)
  const [exitRotate, setExitRotate] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  // Fallback image
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"

  // Calculate initial rotation based on index
  const initialRotation = -1.5 * index

  // Format property data for display
  const displayLocation = property.location?.address || "Property Location"
  const displayPrice = `€${property.price?.toLocaleString() || ""}`
  const displaySize = `${property.features?.size || ""}m²`
  const displayRooms = `${property.features?.bedrooms || ""} pieces`
  const displayType = property.features?.hasBalcony ? "Apt. with balcony" : "Apt."

  function handleDragEnd(_: any, info: any) {
    const threshold = 80

    if (Math.abs(info.offset.x) > threshold) {
      // Determine swipe direction and set exit coordinates for curved path
      const xDirection = info.offset.x > 0 ? 1 : -1

      // Set curved exit path
      setExitX(xDirection * 1000)
      setExitY(400)
      setExitRotate(xDirection * 45)

      if (xDirection > 0) {
        // Like action for right swipe
        if (onAction) {
          onAction("like", Number(property.id))
        }

        // Show heart animation for right swipe
        setTimeout(() => {
          const heart = document.createElement("div")
          heart.className =
            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl z-50 animate-ping"
          heart.innerText = "❤️"
          heart.style.color = "red"
          document.body.appendChild(heart)
          setTimeout(() => heart.remove(), 800)
        }, 100)
      } else {
        // Dismiss action for left swipe
        if (onAction) {
          onAction("dismiss", Number(property.id))
        }
      }

      setIsExiting(true)
      setTimeout(() => {
        if (property && property.id) {
          onRemove(Number(property.id))
        }
      }, 400)
    }
  }

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-lg"
      style={{
        zIndex: total - index,
        scale: 1 - index * 0.02,
        transformOrigin: "bottom center",
        backgroundColor: "white",
      }}
      animate={{
        rotate: isExiting ? exitRotate : index === 0 ? 0 : initialRotation,
        x: isExiting ? exitX : 0,
        y: isExiting ? exitY : 0,
      }}
      initial={{
        rotate: initialRotation,
        x: 0,
        y: 0,
      }}
      exit={{
        x: exitX,
        y: exitY,
        rotate: exitRotate,
        opacity: 0,
        transition: { duration: 0.4 },
      }}
      // Only the top card is draggable
      drag={index === 0 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* Property image */}
      <img
        src={imageError ? fallbackImage : property.images?.[0] || fallbackImage}
        alt={displayLocation}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

      {/* Property details */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="font-medium text-lg">{displayLocation}</div>
        <div className="text-sm">
          {[displayPrice, displaySize, displayRooms, displayType].filter(Boolean).join(" | ")}
        </div>

        {/* Results count */}
        <div className="text-xs text-gray-300 mt-1">7 results matching your criteria</div>
      </div>

      {/* Certification badge */}
      <div className="absolute top-4 left-4 bg-slate-800/80 rounded-full px-2 py-1 flex items-center">
        <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
        <span className="text-white text-xs">{property.certification?.score || 4}/5</span>
      </div>

      {/* Action buttons - vertically stacked on right */}
      <div className="absolute top-4 right-4 flex flex-col space-y-3">
        <ActionButton
          icon={<Info size={20} className="text-blue-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("info", Number(property.id))
          }}
          backgroundColor="bg-white/90"
        />

        <ActionButton
          icon={<Phone size={20} className="text-green-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("call", Number(property.id))
          }}
          backgroundColor="bg-white/90"
        />

        <ActionButton
          icon={<Share2 size={20} className="text-orange-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("share", Number(property.id))
          }}
          backgroundColor="bg-white/90"
        />

        <ActionButton
          icon={<ExternalLink size={20} className="text-purple-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("web", Number(property.id))
          }}
          backgroundColor="bg-white/90"
        />
      </div>
    </motion.div>
  )
}

