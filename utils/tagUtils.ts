"use client"

import type { Tag } from "../TagSystem"
import type { PropertySearchParams } from "../services/api/propertyService"

/**
 * Converts tag objects to PropertySearchParams for API requests
 */
export const convertTagsToSearchParams = (tags: Tag[]): PropertySearchParams => {
  const params: PropertySearchParams = {}

  // Only use active tags
  const activeTags = tags.filter((tag) => tag.active)

  // Process location tags
  const locationTags = activeTags.filter((tag) => tag.category === "location")
  if (locationTags.length > 0) {
    params.location = locationTags.map((tag) => String(tag.value || tag.label))
  }

  // Process budget tags
  const budgetTags = activeTags.filter((tag) => tag.category === "budget")
  if (budgetTags.length > 0) {
    // Extract numeric values from budget tags (e.g., "€800k" -> 800000)
    budgetTags.forEach((tag) => {
      const value = String(tag.value || tag.label).replace(/[^0-9]/g, "")
      const numericValue = Number.parseInt(value)

      if (!isNaN(numericValue)) {
        // Check if it's a max budget tag
        if (
          String(tag.value || tag.label)
            .toLowerCase()
            .includes("max")
        ) {
          params.priceMax = String(tag.value || tag.label).includes("k") ? numericValue * 1000 : numericValue
        } else {
          // Assume it's a price range
          params.priceMin = String(tag.value || tag.label).includes("k") ? numericValue * 1000 : numericValue
          // Set a default max that's 20% higher if not specified
          if (!params.priceMax) {
            params.priceMax = Math.round(params.priceMin * 1.2)
          }
        }
      }
    })
  }

  // Process room tags
  const roomTags = activeTags.filter((tag) => tag.category === "rooms")
  if (roomTags.length > 0) {
    // Extract numeric values from room tags (e.g., "2 bedrooms" -> 2)
    const roomValues = roomTags
      .map((tag) => {
        const match = String(tag.value || tag.label).match(/(\d+)/)
        return match ? Number.parseInt(match[1]) : null
      })
      .filter(Boolean) as number[]

    if (roomValues.length > 0) {
      params.bedrooms = roomValues
    }
  }

  // Process feature tags
  const featureTags = activeTags.filter((tag) => tag.category === "features")
  if (featureTags.length > 0) {
    params.features = featureTags.map((tag) => String(tag.value || tag.label).toLowerCase())
  }

  // Default pagination
  params.page = 1
  params.limit = 10

  return params
}

// Check if we have minimum search criteria
export const hasMinimumSearchCriteria = (tags: Tag[]): boolean => {
  const activeTags = tags.filter((tag) => tag.active)
  const hasLocation = activeTags.some((tag) => tag.category === "location")
  const hasBudget = activeTags.some((tag) => tag.category === "budget")
  const hasRooms = activeTags.some((tag) => tag.category === "rooms")

  return hasLocation && hasBudget && hasRooms
}

