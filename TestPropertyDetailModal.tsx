"use client"

import { useState } from "react"
import { Heart, Star, Info } from "lucide-react"
import PropertyDetailModal from "./PropertyDetailModal"
import { propertyService } from "./services/api/propertyService"

export default function TestPropertyDetailModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [likedProperties, setLikedProperties] = useState<string[]>([])

  // Sample property IDs
  const propertyIds = ["1", "2", "3"]

  const handleOpenModal = (id: string) => {
    setSelectedPropertyId(id)
    setModalOpen(true)
  }

  const handleLike = async (id: string, liked: boolean) => {
    try {
      if (liked) {
        await propertyService.likeProperty(id)
        setLikedProperties((prev) => [...prev, id])
      } else {
        await propertyService.unlikeProperty(id)
        setLikedProperties((prev) => prev.filter((propId) => propId !== id))
      }
    } catch (error) {
      console.error("Error toggling like status:", error)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Property Detail Modal Test</h1>

      <div className="space-y-4">
        {propertyIds.map((id) => (
          <div key={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-300 relative">
              {/* Placeholder image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">Property {id} Image</div>

              <div className="absolute top-4 left-4 flex items-center bg-blue-500 text-white px-2 py-1 rounded-full">
                <Star size={16} className="mr-1" fill="currentColor" />
                <span>4/5</span>
              </div>

              {/* Like button */}
              <button
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${likedProperties.includes(id) ? "text-red-500" : "text-gray-400"}`}
                onClick={() => handleLike(id, !likedProperties.includes(id))}
              >
                <Heart size={20} fill={likedProperties.includes(id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-bold">Property {id}</h2>
              <p className="text-gray-700">€{(400000 + Number.parseInt(id) * 50000).toLocaleString()}</p>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                onClick={() => handleOpenModal(id)}
              >
                <Info size={18} className="mr-2" />
                View Property Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        propertyId={selectedPropertyId || undefined}
        onLike={handleLike}
      />

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          This component demonstrates the PropertyDetailModal with API integration. The modal fetches property details
          from the API when opened.
        </p>
        <p className="text-sm text-blue-800 mt-2">
          <strong>Note:</strong> Since we're using mock data, any property ID will work. In a real app, this would fetch
          from your API.
        </p>
      </div>
    </div>
  )
}

