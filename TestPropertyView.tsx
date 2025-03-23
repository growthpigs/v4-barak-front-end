"use client"

import { useState } from "react"

// Sample property data
const SAMPLE_PROPERTY = {
  id: 1,
  image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
  location: "Avenue Victor Hugo • 16th",
  price: "€780,000",
  size: "85m²",
  rooms: "3 pieces",
  type: "Apt.",
}

export function TestPropertyView() {
  const [property] = useState(SAMPLE_PROPERTY)

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Property Test View</h2>

      <div className="aspect-square w-full max-w-[300px] mx-auto rounded-lg overflow-hidden shadow-lg relative">
        {/* Property image */}
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.location}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

        {/* Property details */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="font-medium text-lg">{property.location}</div>
          <div className="text-sm">
            {property.price} | {property.size} | {property.rooms} | {property.type}
          </div>
        </div>
      </div>
    </div>
  )
}

