"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { PropertyCard } from "./PropertyCard"
import { InstructionCard } from "./InstructionCard"

interface Property {
  id: number
  image: string
  location: string
  price: string
  size: string
  rooms: string
  type: string
}

interface PropertyStackProps {
  properties: Property[]
  isSearching?: boolean
  onAction?: (action: string, propertyId: number) => void
}

export function PropertyStack({ properties, isSearching = false, onAction }: PropertyStackProps) {
  const [visibleCards, setVisibleCards] = useState(properties)
  const [showInstructionCard, setShowInstructionCard] = useState(true)

  // Handle removing the instruction card
  const handleRemoveInstruction = () => {
    setShowInstructionCard(false)
  }

  // Handle removing a property
  const handleRemoveProperty = (id: number) => {
    setVisibleCards((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="relative aspect-square w-full max-w-[300px] mx-auto">
      <AnimatePresence>
        {/* Show property cards underneath */}
        {visibleCards.map((property, index) => (
          <div
            key={property.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              // Only allow interactions with the top card when instruction is not showing
              pointerEvents: !showInstructionCard && index === 0 ? "auto" : "none",
              // Lower z-index when instruction is showing, otherwise normal stacking
              zIndex: showInstructionCard ? 10 - index : 20 - index,
            }}
          >
            <PropertyCard
              property={property}
              index={showInstructionCard ? index + 1 : index}
              total={visibleCards.length + (showInstructionCard ? 1 : 0)}
              onRemove={handleRemoveProperty}
              onAction={onAction}
            />
          </div>
        ))}

        {/* Instruction card - on top when visible */}
        {showInstructionCard && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 30,
              pointerEvents: "auto",
            }}
          >
            <InstructionCard onRemove={handleRemoveInstruction} isLoading={isSearching} />
          </div>
        )}
      </AnimatePresence>

      {/* Empty state when no more cards */}
      {visibleCards.length === 0 && !showInstructionCard && (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <p className="text-gray-500">No more properties</p>
        </div>
      )}
    </div>
  )
}

