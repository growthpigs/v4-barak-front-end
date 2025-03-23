"use client"

import { useState } from "react"
import { propertyService, type Property, type PropertySearchParams } from "../services/api/propertyService"
import type { Tag } from "../TagSystem"

// Convert our Tag objects to PropertySearchParams
const convertTagsToSearchParams = (tags: Tag[]): PropertySearchParams => {
  const params: PropertySearchParams = {}

  // Only use active tags
  const activeTags = tags.filter((tag) => tag.active)

  // Process location tags
  const locationTags = activeTags.filter((tag) => tag.category === "location")
  if (locationTags.length > 0) {
    params.location = locationTags.map((tag) => tag.label)
  }

  // Process budget tags
  const budgetTags = activeTags.filter((tag) => tag.category === "budget")
  if (budgetTags.length > 0) {
    // Extract numeric values from budget tags (e.g., "€800k" -> 800000)
    budgetTags.forEach((tag) => {
      const value = tag.label.replace(/[^0-9]/g, "")
      const numericValue = Number.parseInt(value)

      if (!isNaN(numericValue)) {
        // Check if it's a max budget tag
        if (tag.label.toLowerCase().includes("max")) {
          params.priceMax = tag.label.includes("k") ? numericValue * 1000 : numericValue
        } else {
          // Assume it's a price range
          params.priceMin = tag.label.includes("k") ? numericValue * 1000 : numericValue
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
        const match = tag.label.match(/(\d+)/)
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
    params.features = featureTags.map((tag) => tag.label.toLowerCase())
  }

  // Default pagination
  params.page = 1
  params.limit = 10

  return params
}

// Hook for fetching properties based on tags
export const usePropertyApi = (tags: Tag[]) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch properties based on current tags
  const fetchProperties = async () => {
    // Only search if we have active tags
    const activeTags = tags.filter((tag) => tag.active)

    // Check if we have the minimum required tags (location, budget, rooms)
    const hasLocation = activeTags.some((tag) => tag.category === "location")
    const hasBudget = activeTags.some((tag) => tag.category === "budget")
    const hasRooms = activeTags.some((tag) => tag.category === "rooms")

    if (hasLocation && hasBudget && hasRooms) {
      setLoading(true)
      setError(null)

      try {
        // Convert tags to search parameters
        const searchParams = convertTagsToSearchParams(tags)

        // Call the API
        const results = await propertyService.searchProperties(searchParams)
        setProperties(results)
      } catch (err) {
        console.error("Error fetching properties:", err)
        setError("Failed to fetch properties. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  // Function to like a property
  const likeProperty = async (id: string) => {
    try {
      await propertyService.likeProperty(id)
      return true
    } catch (err) {
      console.error("Error liking property:", err)
      return false
    }
  }

  // Function to unlike a property
  const unlikeProperty = async (id: string) => {
    try {
      await propertyService.unlikeProperty(id)
      return true
    } catch (err) {
      console.error("Error unliking property:", err)
      return false
    }
  }

  // Function to dismiss a property
  const dismissProperty = async (id: string) => {
    try {
      await propertyService.dismissProperty(id)
      // Remove from local state
      setProperties((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      console.error("Error dismissing property:", err)
      return false
    }
  }

  // Function to get a single property by ID
  const getProperty = async (id: string) => {
    try {
      return await propertyService.getProperty(id)
    } catch (err) {
      console.error("Error getting property:", err)
      throw err
    }
  }

  return {
    properties,
    loading,
    error,
    fetchProperties,
    likeProperty,
    unlikeProperty,
    dismissProperty,
    getProperty,
  }
}

