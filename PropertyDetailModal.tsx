"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowLeft, Phone } from "lucide-react"
import { propertyService, type Property } from "./services/api/propertyService"
import { useApiRequest } from "./hooks/useApiRequest"

interface PropertyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  property?: Property | null
  propertyId?: string
  onLike?: (id: string, liked: boolean) => void
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  isOpen,
  onClose,
  property: initialProperty,
  propertyId,
  onLike,
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "map" | "floor-plan" | "photos">("details")
  const [isLiked, setIsLiked] = useState(false)
  const [retryCounter, setRetryCounter] = useState(0)

  // If propertyId is provided, fetch property details
  const {
    data: fetchedProperty,
    isLoading,
    error,
  } = useApiRequest(propertyId ? propertyService.getProperty : null, propertyId, retryCounter)

  // Use either the provided property or the fetched one
  const property = initialProperty || fetchedProperty

  // Set initial liked state
  useEffect(() => {
    if (property) {
      // In a real app, this would check if the property is in the user's liked properties
      setIsLiked(false)
    }
  }, [property])

  // Handle like/unlike
  const handleLike = async () => {
    if (!property) return

    try {
      if (isLiked) {
        await propertyService.unlikeProperty(property.id)
      } else {
        await propertyService.likeProperty(property.id)
      }

      setIsLiked(!isLiked)

      // Call the onLike callback if provided
      if (onLike) {
        onLike(property.id, !isLiked)
      }
    } catch (err) {
      console.error("Error toggling like status:", err)
    }
  }

  // Handle contact agent
  const handleContactAgent = () => {
    if (!property) return
    console.log("Contact agent:", property.agent)
    // This would open a contact form or initiate a call
  }

  // Handle retry
  const handleRetry = () => {
    setRetryCounter((prev) => prev + 1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center">
      <motion.div
        className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: "25%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="relative h-12 flex items-center justify-center border-b">
          <button className="absolute left-2 p-2 rounded-full" onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-medium">Property Details</h2>
        </div>

        {/* Content - Scrollable Area */}
        <div className="overflow-y-auto h-[calc(75vh-3rem)]">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={handleRetry} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Try Again
              </button>
            </div>
          ) : property ? (
            <>
              {/* Property Image */}
              <div className="relative h-56 bg-gray-200">
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}

                {/* Rating Badge */}
                {property.certification && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {property.certification.score}
                  </div>
                )}
              </div>

              {/* Main Property Info */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-xl font-bold">{property.title}</h1>
                  <button className={`p-2 ${isLiked ? "text-red-500" : "text-gray-400"}`} onClick={handleLike}>
                    <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>

                <p className="text-gray-700 mt-1">
                  €{property.price.toLocaleString()} • {property.features.size}m² • {property.features.bedrooms} bed
                </p>

                <p className="text-gray-600 text-sm mt-1">{property.location.address}</p>

                <p className="text-gray-600 text-sm mt-1">
                  {property.features.hasBalcony ? "Balcony, " : ""}
                  {property.features.hasElevator ? "Elevator, " : ""}
                  {property.features.hasParking ? "Parking" : ""}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {property.features.hasBalcony && (
                    <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">Balcony</span>
                  )}
                  {property.features.hasElevator && (
                    <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">Elevator</span>
                  )}
                  {property.features.hasParking && (
                    <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">Parking</span>
                  )}
                  <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                    Metro {Math.floor(Math.random() * 500)}m
                  </span>
                </div>

                {/* Certification */}
                {property.certification && (
                  <div className="mt-4">
                    <p className="font-medium">Certification Score: {property.certification.score}/5</p>
                    <p className="text-sm text-gray-600">{property.certification.details}</p>
                  </div>
                )}

                {/* Agent */}
                <div className="flex justify-between items-center mt-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">{property.agent.name}</p>
                      <p className="text-sm text-gray-600">{property.agent.agency}</p>
                    </div>
                  </div>
                  <button
                    className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center"
                    onClick={handleContactAgent}
                  >
                    <Phone size={18} />
                  </button>
                </div>

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
                  <div className="flex">
                    <button
                      className={`px-4 py-3 relative ${activeTab === "details" ? "text-blue-500 font-medium" : "text-gray-600"}`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                      {activeTab === "details" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                      )}
                    </button>
                    <button
                      className={`px-4 py-3 relative ${activeTab === "map" ? "text-blue-500 font-medium" : "text-gray-600"}`}
                      onClick={() => setActiveTab("map")}
                    >
                      Map
                      {activeTab === "map" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                    </button>
                    <button
                      className={`px-4 py-3 relative ${activeTab === "floor-plan" ? "text-blue-500 font-medium" : "text-gray-600"}`}
                      onClick={() => setActiveTab("floor-plan")}
                    >
                      Floor Plan
                      {activeTab === "floor-plan" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                      )}
                    </button>
                    <button
                      className={`px-4 py-3 relative ${activeTab === "photos" ? "text-blue-500 font-medium" : "text-gray-600"}`}
                      onClick={() => setActiveTab("photos")}
                    >
                      Photos
                      {activeTab === "photos" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-4">
                  {activeTab === "details" && (
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p className="mt-2 text-gray-700">{property.description}</p>

                      <h3 className="font-medium mt-4">Key Features</h3>
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>
                          • {property.features.bedrooms} bedrooms, {property.features.bathrooms} bathrooms
                        </li>
                        {property.features.hasBalcony && <li>• Balcony</li>}
                        {property.features.hasElevator && <li>• Elevator access</li>}
                        {property.features.hasParking && <li>• Parking available</li>}
                      </ul>
                    </div>
                  )}

                  {activeTab === "map" && (
                    <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
                      {property.location.coordinates ? (
                        <p>
                          Map would display at coordinates: {property.location.coordinates.latitude},{" "}
                          {property.location.coordinates.longitude}
                        </p>
                      ) : (
                        <p className="text-gray-500">Map view not available</p>
                      )}
                    </div>
                  )}

                  {activeTab === "floor-plan" && (
                    <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">Floor plan would appear here</p>
                    </div>
                  )}

                  {activeTab === "photos" && (
                    <div className="space-y-2">
                      {property.images && property.images.length > 0 ? (
                        property.images.map((image, index) => (
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
            </>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
}

export default PropertyDetailModal

