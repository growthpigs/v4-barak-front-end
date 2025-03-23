"use client"
import { motion } from "framer-motion"
import { Info, Phone, Share2, ExternalLink } from "lucide-react"
import ActionButton from "./ActionButton"

interface PropertyCardProps {
  property: {
    id: number | string
    image: string
    location: string
    price: string
    size: string
    rooms: string
    type: string
  }
  index?: number
  total?: number
  onRemove?: (id: number | string) => void
  onAction?: (action: string, propertyId: number | string) => void
}

export function PropertyCard({ property, index = 0, total = 1, onRemove, onAction }: PropertyCardProps) {
  // Calculate initial rotation based on index
  const initialRotation = -1.5 * index

  // Format property data for display
  const displayLocation = property.location || "Property Location"
  const displayPrice = property.price || ""
  const displaySize = property.size || ""
  const displayRooms = property.rooms || ""
  const displayType = property.type || "Apt."

  function handleDragEnd(_: any, info: any) {
    const threshold = 80

    if (Math.abs(info.offset.x) > threshold) {
      // Determine swipe direction
      const xDirection = info.offset.x > 0 ? 1 : -1

      if (xDirection > 0) {
        // Like action for right swipe
        if (onAction) {
          onAction("like", property.id)
        }
      } else {
        // Dismiss action for left swipe
        if (onAction) {
          onAction("dismiss", property.id)
        }
      }

      if (onRemove && property.id) {
        onRemove(property.id)
      }
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
        rotate: index === 0 ? 0 : initialRotation,
      }}
      initial={{
        rotate: initialRotation,
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
        src={property.image || "/placeholder.svg?height=400&width=300"}
        alt={displayLocation}
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
      </div>

      {/* Action buttons - vertically stacked on right */}
      <div className="absolute top-4 right-4 flex flex-col space-y-3">
        <ActionButton
          icon={<Info size={20} className="text-blue-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("info", property.id)
          }}
          backgroundColor="bg-white/90"
        />

        <ActionButton
          icon={<Phone size={20} className="text-green-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("call", property.id)
          }}
          backgroundColor="bg-white/90"
        />

        <ActionButton
          icon={<Share2 size={20} className="text-orange-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("share", property.id)
          }}
          backgroundColor="bg-white/90"
        />

        <ActionButton
          icon={<ExternalLink size={20} className="text-purple-500" />}
          onClick={(e) => {
            e.stopPropagation()
            if (onAction) onAction("web", property.id)
          }}
          backgroundColor="bg-white/90"
        />
      </div>
    </motion.div>
  )
}

