"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Filter } from "lucide-react"
import ThreeQuarterScreenModal from "./ThreeQuarterScreenModal"
import PropertyListItem from "./PropertyListItem"
import PropertyDetailModal from "./PropertyDetailModal"

// Sample saved properties data
const SAVED_PROPERTIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    location: "Avenue Victor Hugo • 16th",
    price: "€780,000",
    size: "85m²",
    rooms: "2 pieces",
    type: "Apt.",
    savedDate: "2023-11-15",
    newPrice: false,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
    location: "Rue de Passy • 16th",
    price: "€750,000",
    size: "78m²",
    rooms: "2 pieces",
    type: "Apt.",
    savedDate: "2023-11-10",
    newPrice: true,
    oldPrice: "€780,000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
    location: "Boulevard Suchet • 16th",
    price: "€795,000",
    size: "90m²",
    rooms: "3 pieces",
    type: "Apt.",
    savedDate: "2023-11-05",
    newPrice: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    location: "Rue de la Pompe • 16th",
    price: "€820,000",
    size: "92m²",
    rooms: "2 pieces",
    type: "Apt.",
    savedDate: "2023-10-28",
    newPrice: false,
  },
]

const PropertySavedList: React.FC = () => {
  const [savedProperties, setSavedProperties] = useState(SAVED_PROPERTIES)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // Handle removing a property from saved list
  const handleRemoveProperty = (id: number) => {
    setSavedProperties((prev) => prev.filter((property) => property.id !== id))
  }

  // Handle opening property details
  const handleOpenPropertyDetails = (property: any) => {
    setSelectedProperty(property)
    setModalOpen(true)
  }

  // Filter properties based on active filter
  const filteredProperties = () => {
    switch (activeFilter) {
      case "price-change":
        return savedProperties.filter((property) => property.newPrice)
      case "recent":
        return [...savedProperties].sort((a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime())
      case "price-high":
        return [...savedProperties].sort(
          (a, b) => Number.parseInt(b.price.replace(/[^0-9]/g, "")) - Number.parseInt(a.price.replace(/[^0-9]/g, "")),
        )
      case "price-low":
        return [...savedProperties].sort(
          (a, b) => Number.parseInt(a.price.replace(/[^0-9]/g, "")) - Number.parseInt(b.price.replace(/[^0-9]/g, "")),
        )
      default:
        return savedProperties
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Filter bar */}
      <div className="p-3 bg-white border-b flex items-center justify-between">
        <div className="text-sm text-gray-500">{savedProperties.length} propriétés sauvegardées</div>
        <button
          className="flex items-center text-blue-600 text-sm font-medium"
          onClick={() => setFilterModalOpen(true)}
        >
          <Filter size={16} className="mr-1" />
          Filtrer
        </button>
      </div>

      {/* Empty state */}
      {savedProperties.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
          <Heart size={64} strokeWidth={1} className="mb-4" />
          <h2 className="text-xl font-bold mb-2">Aucun bien sauvegardé</h2>
          <p>Explorez des propriétés et sauvegardez celles qui vous intéressent.</p>
        </div>
      )}

      {/* Property list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredProperties().map((property) => (
          <PropertyListItem
            key={property.id}
            property={{
              id: property.id.toString(),
              title: property.location,
              address: `${property.location.split("•")[0].trim()}`,
              price: Number.parseInt(property.price.replace(/[^0-9]/g, "")),
              size: Number.parseInt(property.size),
              bedrooms: Number.parseInt(property.rooms),
              image: property.image,
              status: "liked",
              features: [property.type, property.rooms],
            }}
            onClick={() => handleOpenPropertyDetails(property)}
          />
        ))}
      </div>

      {/* Property details modal */}
      <PropertyDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        property={
          selectedProperty
            ? {
                id: selectedProperty.id.toString(),
                title: "Luxury Apartment",
                address: selectedProperty.location,
                price: Number.parseInt(selectedProperty.price.replace(/[^0-9]/g, "")),
                size: Number.parseInt(selectedProperty.size),
                rooms: Number.parseInt(selectedProperty.rooms),
                image: selectedProperty.image,
                liked: true,
              }
            : null
        }
        onLike={(id, liked) => {
          if (!liked) {
            handleRemoveProperty(Number.parseInt(id))
          }
        }}
      />

      {/* Filter modal */}
      <ThreeQuarterScreenModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        title="Filtrer les biens"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <button
              className={`w-full text-left p-4 rounded-lg border ${activeFilter === "all" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setActiveFilter("all")}
            >
              <div className="font-medium">Tous les biens</div>
              <div className="text-sm text-gray-500 mt-1">Afficher tous les biens sauvegardés</div>
            </button>

            <button
              className={`w-full text-left p-4 rounded-lg border ${activeFilter === "price-change" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setActiveFilter("price-change")}
            >
              <div className="font-medium">Changements de prix</div>
              <div className="text-sm text-gray-500 mt-1">Biens dont le prix a changé récemment</div>
            </button>

            <button
              className={`w-full text-left p-4 rounded-lg border ${activeFilter === "recent" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setActiveFilter("recent")}
            >
              <div className="font-medium">Récemment sauvegardés</div>
              <div className="text-sm text-gray-500 mt-1">Trier par date de sauvegarde</div>
            </button>

            <button
              className={`w-full text-left p-4 rounded-lg border ${activeFilter === "price-high" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setActiveFilter("price-high")}
            >
              <div className="font-medium">Prix décroissant</div>
              <div className="text-sm text-gray-500 mt-1">Du plus cher au moins cher</div>
            </button>

            <button
              className={`w-full text-left p-4 rounded-lg border ${activeFilter === "price-low" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setActiveFilter("price-low")}
            >
              <div className="font-medium">Prix croissant</div>
              <div className="text-sm text-gray-500 mt-1">Du moins cher au plus cher</div>
            </button>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
            onClick={() => setFilterModalOpen(false)}
          >
            Appliquer
          </button>
        </div>
      </ThreeQuarterScreenModal>
    </div>
  )
}

export default PropertySavedList

