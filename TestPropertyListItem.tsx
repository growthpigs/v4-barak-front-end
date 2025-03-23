"use client"

import type React from "react"
import { useState } from "react"
import PropertyListItem from "./PropertyListItem"
import PropertyDetailModal from "./PropertyDetailModal"

const TestPropertyListItem: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Sample properties
  const properties = [
    {
      id: "1",
      title: "Elegant Apartment in 16th",
      address: "Avenue Victor Hugo • 16th",
      price: 780000,
      size: 85,
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=500&q=80",
      status: "liked" as const,
      features: ["Balcony", "Elevator", "Recently renovated"],
    },
    {
      id: "2",
      title: "Modern Loft in Marais",
      address: "Rue des Archives • Marais",
      price: 695000,
      size: 70,
      bedrooms: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=500&q=80",
      status: "seen" as const,
      features: ["Open plan", "Designer kitchen"],
    },
    {
      id: "3",
      title: "Spacious Family Home",
      address: "Rue de Passy • 16th",
      price: 1250000,
      size: 120,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&w=500&q=80",
      status: "unseen" as const,
      features: ["Garden", "Fireplace", "Wine cellar"],
    },
  ]

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
    setModalOpen(true)
  }

  const handleLike = (id: string, liked: boolean) => {
    console.log(`Property ${id} ${liked ? "liked" : "unliked"}`)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Property List Items</h1>

      <div className="space-y-3">
        {properties.map((property) => (
          <PropertyListItem key={property.id} property={property} onClick={() => handlePropertyClick(property)} />
        ))}
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        property={selectedProperty}
        onLike={handleLike}
      />
    </div>
  )
}

export default TestPropertyListItem

