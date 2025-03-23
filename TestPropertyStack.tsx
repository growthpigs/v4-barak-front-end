"use client"

import { useState, useEffect } from "react"
import { PropertyStack } from "./PropertyStack"
import { PropertyActionModal } from "./PropertyActionModal"

// Sample properties - these match your AppStateContext sample data
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

export function TestPropertyStack() {
  const [isSearching, setIsSearching] = useState(true)
  const [activeModal, setActiveModal] = useState<"info" | "call" | "share" | "web" | null>(null)
  const [activeProperty, setActiveProperty] = useState<any>(null)

  // Simulate search completion after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Handle action buttons on property cards
  const handlePropertyAction = (action: string, propertyId: number) => {
    const property = SAMPLE_PROPERTIES.find((p) => p.id === propertyId)
    if (property) {
      setActiveProperty(property)
      setActiveModal(action as any)
    }
  }

  // Handle modal close
  const handleCloseModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Property Stack Test</h2>

      {/* Property card stack */}
      <div className="relative mx-auto">
        <PropertyStack properties={SAMPLE_PROPERTIES} isSearching={isSearching} onAction={handlePropertyAction} />
      </div>

      {/* Modal for property actions */}
      <PropertyActionModal
        isOpen={activeModal !== null}
        onClose={handleCloseModal}
        modalType={activeModal}
        property={activeProperty}
      />
    </div>
  )
}

