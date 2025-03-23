"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PropertyListItem from "./PropertyListItem"
import PropertyDetailModal from "./PropertyDetailModal"
import { Heart, Eye, EyeOff } from "lucide-react"

// Mock property data
const mockProperties = [
  {
    id: "1",
    title: "Elegant Apartment",
    address: "Avenue Victor Hugo • 16th",
    price: 780000,
    size: 85,
    bedrooms: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
    status: "liked",
    features: ["Beautiful balcony", "renovated"],
  },
  {
    id: "2",
    title: "Spacious Apartment",
    address: "Rue de la Pompe • 16th",
    price: 695000,
    size: 78,
    bedrooms: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    status: "liked",
    features: ["Spacious", "near metro"],
  },
  {
    id: "3",
    title: "Modern Apartment",
    address: "Boulevard Murat • 16th",
    price: 820000,
    size: 92,
    bedrooms: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
    status: "seen",
    features: ["Modern design", "High ceilings"],
  },
  {
    id: "4",
    title: "Charming Studio",
    address: "Rue des Archives • Marais",
    price: 520000,
    size: 45,
    bedrooms: 1,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80",
    status: "unseen",
    features: ["Charming", "Central location"],
  },
]

const PropertyList: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"liked" | "seen" | "unseen">("liked")

  // State for selected property (for detail modal)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  // Filter properties by active tab
  const filteredProperties = mockProperties.filter((property) => property.status === activeTab)

  // Get selected property details
  const selectedPropertyDetails = selectedProperty
    ? mockProperties.find((property) => property.id === selectedProperty)
    : null

  // Handle property selection
  const handlePropertyClick = (propertyId: string) => {
    setSelectedProperty(propertyId)
  }

  // Close property detail modal
  const handleCloseDetail = () => {
    setSelectedProperty(null)
  }

  // Render empty state for tab
  const renderEmptyState = () => {
    let icon, message

    switch (activeTab) {
      case "liked":
        icon = <Heart size={40} className="text-gray-300" />
        message = "You haven't liked any properties yet"
        break
      case "seen":
        icon = <Eye size={40} className="text-gray-300" />
        message = "No viewed properties yet"
        break
      case "unseen":
        icon = <EyeOff size={40} className="text-gray-300" />
        message = "No new properties to show"
        break
    }

    return (
      <div className="flex flex-col items-center justify-center h-60 text-gray-500">
        {icon}
        <p className="mt-4">{message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tab Navigation */}
      <div className="flex border-b bg-white">
        <button
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === "liked" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("liked")}
        >
          Liked
          {activeTab === "liked" && (
            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="activeTabIndicator" />
          )}
        </button>

        <button
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === "seen" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("seen")}
        >
          Seen
          {activeTab === "seen" && (
            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="activeTabIndicator" />
          )}
        </button>

        <button
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === "unseen" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("unseen")}
        >
          Unseen
          {activeTab === "unseen" && (
            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="activeTabIndicator" />
          )}
        </button>
      </div>

      {/* Property List */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filteredProperties.length === 0
              ? renderEmptyState()
              : filteredProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertyClick(property.id)}
                  />
                ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        isOpen={!!selectedProperty}
        onClose={handleCloseDetail}
        property={selectedPropertyDetails}
        onLike={(id, liked) => {
          console.log(`Property ${id} ${liked ? "liked" : "unliked"}`)
          // In a real app, you would update the property status here
        }}
      />
    </div>
  )
}

export default PropertyList

