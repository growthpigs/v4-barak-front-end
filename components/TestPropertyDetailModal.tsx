"use client"

import { useState } from "react"
import PropertyDetailModal from "./PropertyDetailModal"
import { Heart } from "react-feather"

// Sample property data
const SAMPLE_PROPERTIES = [
  {
    id: "1",
    title: "Elegant Apartment in 16th",
    address: "Avenue Victor Hugo • 16th",
    price: 780000,
    size: 85,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "Beautiful apartment located in the prestigious 16th arrondissement. This property features high ceilings, hardwood floors, and large windows that provide plenty of natural light throughout the day.",
    features: ["Balcony", "Elevator", "Parking", "Recently renovated"],
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Pierre Dubois",
      phone: "+33 01 23 45 67 89",
      agency: "Paris Luxury Real Estate",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: "2",
    title: "Charming Studio Near Metro",
    address: "Rue de Passy • 16th",
    price: 450000,
    size: 45,
    rooms: 1,
    bedrooms: 1,
    bathrooms: 1,
    features: ["Metro nearby", "Secure building"],
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
    agent: {
      name: "Sophie Martin",
      phone: "+33 01 98 76 54 32",
      agency: "Paris Metro Properties",
    },
  },
  {
    id: "3",
    title: "Spacious Family Home with Garden",
    address: "Boulevard Suchet • 16th",
    price: 1250000,
    size: 120,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    features: ["Garden", "Parking", "Fireplace"],
    image: "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
    agent: {
      name: "Jean Dupont",
      phone: "+33 01 45 67 89 01",
      agency: "Luxury Homes Paris",
    },
  },
]

export default function TestPropertyDetailModal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [likedProperties, setLikedProperties] = useState<string[]>([])

  const handleOpenModal = (property: any) => {
    setSelectedProperty(property)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleLike = (id: string, liked: boolean) => {
    if (liked) {
      setLikedProperties((prev) => [...prev, id])
    } else {
      setLikedProperties((prev) => prev.filter((propId) => propId !== id))
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Property Detail Modal Test</h1>

      <div className="space-y-4">
        {SAMPLE_PROPERTIES.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Like button */}
              <button
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
                  likedProperties.includes(property.id) ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => handleLike(property.id, !likedProperties.includes(property.id))}
              >
                <Heart size={20} fill={likedProperties.includes(property.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-bold">{property.title}</h2>
              <p className="text-gray-700">
                €{property.price.toLocaleString()} • {property.size}m² • {property.rooms} pièces
              </p>
              <p className="text-gray-600 text-sm">{property.address}</p>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                onClick={() => handleOpenModal(property)}
              >
                View Property Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        property={
          selectedProperty
            ? {
                ...selectedProperty,
                liked: likedProperties.includes(selectedProperty.id),
              }
            : null
        }
        onLike={handleLike}
      />
    </div>
  )
}

