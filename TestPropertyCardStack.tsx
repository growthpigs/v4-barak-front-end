"use client"

import React, { useState } from "react"
import { PropertyCardStack } from "./PropertyCardStack"

// Sample properties
const SAMPLE_PROPERTIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    location: "Avenue Victor Hugo • 16th",
    price: "€780,000",
    size: "85m²",
    rooms: "2 pieces",
    type: "Apt.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
    location: "Rue de Passy • 16th",
    price: "€750,000",
    size: "78m²",
    rooms: "2 pieces",
    type: "Apt.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
    location: "Boulevard Suchet • 16th",
    price: "€795,000",
    size: "90m²",
    rooms: "3 pieces",
    type: "Apt.",
  },
]

export function TestPropertyCardStack() {
  const [isSearching, setIsSearching] = useState(true)

  // Simulate search completion after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleAction = (action: string, propertyId: number) => {
    console.log(`Action: ${action} on property ${propertyId}`)
  }

  return (
    <div className="p-4 bg-gray-100 h-full relative">
      <h2 className="text-lg font-semibold mb-4">Property Card Stack Test</h2>

      <div className="relative">
        <PropertyCardStack properties={SAMPLE_PROPERTIES} isSearching={isSearching} onAction={handleAction} />
      </div>
    </div>
  )
}

