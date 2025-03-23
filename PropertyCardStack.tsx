"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { propertyService, type Property } from "./services/api/propertyService"
import { useApiRequest } from "./hooks/useApiRequest"
import { convertTagsToSearchParams, hasMinimumSearchCriteria } from "./utils/tagUtils"
import type { Tag } from "./TagSystem"
import PropertyCard from "./PropertyCard"
import InstructionCard from "./InstructionCard"
import PromoCard from "./PromoCard"
import PropertyCardSkeleton from "./PropertyCardSkeleton"
import ErrorMessage from "./ErrorMessage"

interface PropertyCardStackProps {
  properties?: Property[]
  tags?: Tag[]
  isSearching?: boolean
  onAction?: (action: string, propertyId: number) => void
}

export function PropertyCardStack({
  properties: initialProperties,
  tags = [],
  isSearching = false,
  onAction,
}: PropertyCardStackProps) {
  const [showInstructionCard, setShowInstructionCard] = useState(true)
  const [visibleCards, setVisibleCards] = useState<Property[]>([])
  const [retryCounter, setRetryCounter] = useState(0)

  // If properties are provided directly, use those
  // Otherwise, fetch from API based on tags
  const searchParams = convertTagsToSearchParams(tags)
  const {
    data: apiProperties,
    isLoading,
    error,
  } = useApiRequest(
    // Only make the API call if we don't have initial properties and we have tags
    initialProperties ? null : hasMinimumSearchCriteria(tags) ? propertyService.searchProperties : null,
    searchParams,
    retryCounter, // Include this to trigger a refetch when retry is clicked
  )

  // Initialize visible cards when properties change
  useEffect(() => {
    if (initialProperties) {
      setVisibleCards(initialProperties)
    } else if (apiProperties) {
      setVisibleCards(apiProperties)
    }
  }, [initialProperties, apiProperties])

  // Handle removing the instruction card
  const handleRemoveInstruction = () => {
    setShowInstructionCard(false)
  }

  // Handle removing a property
  const handleRemoveProperty = async (id: number) => {
    // Update local state first (optimistic update)
    setVisibleCards((prev) => prev.filter((p) => Number(p.id) !== id))

    // Call API to dismiss property
    if (onAction) {
      onAction("dismiss", id)
    } else {
      try {
        await propertyService.dismissProperty(String(id))
      } catch (error) {
        console.error("Error dismissing property:", error)
      }
    }
  }

  // Handle property action
  const handlePropertyAction = (action: string, propertyId: number) => {
    if (onAction) {
      onAction(action, propertyId)
    } else {
      // Default actions if no handler provided
      switch (action) {
        case "like":
          propertyService.likeProperty(String(propertyId))
          break
        case "info":
        case "call":
        case "share":
        case "web":
          console.log(`Action ${action} on property ${propertyId}`)
          break
      }
    }
  }

  // Handle retry
  const handleRetry = () => {
    setRetryCounter((prev) => prev + 1)
  }

  // Show loading state
  if ((isLoading || isSearching) && !visibleCards.length) {
    return (
      <div className="relative aspect-square w-full max-w-[300px] mx-auto">
        <PropertyCardSkeleton count={3} />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="relative aspect-square w-full max-w-[300px] mx-auto flex items-center justify-center">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    )
  }

  // No properties found
  if (!visibleCards.length && !showInstructionCard) {
    return (
      <div className="relative aspect-square w-full max-w-[300px] mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-gray-500 mb-4">No more properties match your criteria.</p>
          <PromoCard
            onSignUp={() => console.log("Sign up clicked")}
            onSwipe={() => console.log("Swipe clicked")}
            className="mt-4"
          />
        </div>
      </div>
    )
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
              onAction={handlePropertyAction}
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
            <InstructionCard onRemove={handleRemoveInstruction} isLoading={isSearching || isLoading} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

