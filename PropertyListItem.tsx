"use client"

import type React from "react"
import { Heart, Eye, EyeOff } from "lucide-react"

interface PropertyListItemProps {
  property: {
    id: string
    title: string
    address: string
    price: number
    size: number
    bedrooms: number
    image: string
    status: "liked" | "seen" | "unseen"
    features?: string[]
  }
  onClick: () => void
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({ property, onClick }) => {
  const { id, title, address, price, size, bedrooms, image, status, features } = property

  // Format price with euro symbol and thousands separator
  const formattedPrice = `€${price.toLocaleString()}`

  // Format features as a short description
  const featureText = features && features.length > 0 ? features.slice(0, 2).join(", ") : ""

  // Status icon based on property status
  const StatusIcon = () => {
    switch (status) {
      case "liked":
        return <Heart className="text-red-500" size={20} fill="currentColor" />
      case "seen":
        return <Eye className="text-blue-500" size={20} />
      case "unseen":
        return <EyeOff className="text-gray-400" size={20} />
      default:
        return null
    }
  }

  return (
    <div
      className="flex bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Property image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-200">
        {image ? (
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Image</div>
        )}
      </div>

      {/* Property info */}
      <div className="flex-1 p-3 min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm truncate">
              {formattedPrice} • {size}m² • {bedrooms} bed
            </p>
            <p className="text-gray-700 text-sm truncate">{address}</p>
            {featureText && <p className="text-gray-500 text-xs truncate">{featureText}</p>}
          </div>

          <div className="ml-2 flex-shrink-0">
            <StatusIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyListItem

