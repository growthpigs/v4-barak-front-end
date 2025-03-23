"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Phone, ChevronLeft, MapPin, Home } from "lucide-react"

interface PropertyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  property: {
    id: string
    title: string
    address: string
    price: number
    size: number
    rooms: number
    bedrooms?: number
    bathrooms?: number
    description?: string
    features?: string[]
    image: string
    images?: string[]
    liked?: boolean
    agent?: {
      name: string
      phone: string
      agency: string
      image?: string
    }
  } | null
  onLike?: (id: string, liked: boolean) => void
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ isOpen, onClose, property, onLike }) => {
  const [activeTab, setActiveTab] = useState<"details" | "map" | "floor-plan" | "photos">("details")
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Set initial liked state
  useEffect(() => {
    if (property) {
      setIsLiked(property.liked || false)
    }
  }, [property])

  // Handle like/unlike
  const handleLike = async () => {
    if (!property) return

    setIsLiked(!isLiked)

    // Call the onLike callback if provided
    if (onLike) {
      onLike(property.id, !isLiked)
    }
  }

  // Handle contact agent
  const handleContactAgent = () => {
    if (!property || !property.agent) return
    console.log("Contact agent:", property.agent)
    // This would open a contact form or initiate a call
  }

  // Handle image navigation
  const nextImage = () => {
    if (!property || !property.images) return
    setCurrentImageIndex((prev) => (prev + 1) % property.images!.length)
  }

  const prevImage = () => {
    if (!property || !property.images) return
    setCurrentImageIndex((prev) => (prev === 0 ? property.images!.length - 1 : prev - 1))
  }

  if (!isOpen || !property) return null

  // Get display images
  const displayImages = property.images && property.images.length > 0 ? property.images : [property.image]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="w-full h-full bg-white overflow-hidden flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative h-12 flex items-center justify-center border-b">
              <button
                className="absolute left-2 p-2 rounded-full hover:bg-gray-100"
                onClick={onClose}
                aria-label="Back"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="font-medium">Property Details</h2>
            </div>

            {/* Content - Scrollable Area */}
            <div className="overflow-y-auto flex-1">
              {/* Property Image Gallery */}
              <div className="relative h-64 bg-gray-200">
                {displayImages && displayImages.length > 0 ? (
                  <>
                    <img
                      src={displayImages[currentImageIndex] || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Image navigation */}
                    {displayImages.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                        {displayImages.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Left/Right arrows */}
                    {displayImages.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center"
                          onClick={prevImage}
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center"
                          onClick={nextImage}
                          aria-label="Next image"
                        >
                          <ChevronLeft size={20} className="transform rotate-180" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  4
                </div>
              </div>

              {/* Main Property Info */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-xl font-bold">{property.title || property.address}</h1>
                  <button
                    className={`p-2 ${isLiked ? "text-red-500" : "text-gray-400"}`}
                    onClick={handleLike}
                    aria-label={isLiked ? "Unlike property" : "Like property"}
                  >
                    <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>

                <p className="text-gray-700 mt-1">
                  €{property.price.toLocaleString()} • {property.size}m² • {property.rooms} pièces
                </p>

                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  <p>{property.address}</p>
                </div>

                {/* Features Tags */}
                {property.features && property.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {property.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Agent */}
                {property.agent && (
                  <div className="flex justify-between items-center mt-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                        {property.agent.image ? (
                          <img
                            src={property.agent.image || "/placeholder.svg"}
                            alt={property.agent.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                            {property.agent.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{property.agent.name}</p>
                        <p className="text-sm text-gray-600">{property.agent.agency}</p>
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center"
                      onClick={handleContactAgent}
                      aria-label="Contact agent"
                    >
                      <Phone size={18} />
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    className="border border-blue-500 text-blue-500 rounded-full py-3 font-medium flex items-center justify-center"
                    onClick={handleLike}
                  >
                    <Heart size={18} className="mr-2" fill={isLiked ? "currentColor" : "none"} />
                    {isLiked ? "SAVED" : "SAVE"}
                  </button>
                  <button
                    className="bg-orange-500 text-white rounded-full py-3 font-medium flex items-center justify-center"
                    onClick={handleContactAgent}
                  >
                    <Phone size={18} className="mr-2" />
                    CONTACT
                  </button>
                </div>

                {/* Tabs */}
                <div className="mt-6 border-b">
                  <div className="flex overflow-x-auto">
                    <button
                      className={`px-4 py-3 relative whitespace-nowrap ${
                        activeTab === "details" ? "text-blue-500 font-medium" : "text-gray-600"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                      {activeTab === "details" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                      )}
                    </button>
                    <button
                      className={`px-4 py-3 relative whitespace-nowrap ${
                        activeTab === "map" ? "text-blue-500 font-medium" : "text-gray-600"
                      }`}
                      onClick={() => setActiveTab("map")}
                    >
                      Map
                      {activeTab === "map" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                    </button>
                    <button
                      className={`px-4 py-3 relative whitespace-nowrap ${
                        activeTab === "floor-plan" ? "text-blue-500 font-medium" : "text-gray-600"
                      }`}
                      onClick={() => setActiveTab("floor-plan")}
                    >
                      Floor Plan
                      {activeTab === "floor-plan" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                      )}
                    </button>
                    <button
                      className={`px-4 py-3 relative whitespace-nowrap ${
                        activeTab === "photos" ? "text-blue-500 font-medium" : "text-gray-600"
                      }`}
                      onClick={() => setActiveTab("photos")}
                    >
                      Photos
                      {activeTab === "photos" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-4 pb-6">
                  {activeTab === "details" && (
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p className="mt-2 text-gray-700">
                        {property.description ||
                          `Beautiful property located in ${property.address}. This ${property.rooms}-room property offers ${property.size}m² of living space with all modern amenities.`}
                      </p>

                      <h3 className="font-medium mt-4">Key Features</h3>
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>• {property.rooms} pièces</li>
                        {property.bedrooms && <li>• {property.bedrooms} bedrooms</li>}
                        {property.bathrooms && <li>• {property.bathrooms} bathrooms</li>}
                        {property.features &&
                          property.features.map((feature, index) => <li key={index}>• {feature}</li>)}
                      </ul>
                    </div>
                  )}

                  {activeTab === "map" && (
                    <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <MapPin size={32} className="mx-auto mb-2 text-blue-500" />
                        <p className="text-gray-700">{property.address}</p>
                        <p className="text-sm text-gray-500 mt-1">Map view would appear here</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "floor-plan" && (
                    <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <Home size={32} className="mx-auto mb-2 text-blue-500" />
                        <p className="text-gray-500">Floor plan would appear here</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {property.size}m² • {property.rooms} pièces
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "photos" && (
                    <div className="space-y-2">
                      {displayImages && displayImages.length > 0 ? (
                        displayImages.map((image, index) => (
                          <div key={index} className="h-40 bg-gray-200 rounded overflow-hidden">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
                          <p className="text-gray-500">No photos available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PropertyDetailModal

