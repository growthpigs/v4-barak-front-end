"use client"

import { useState } from "react"
import { collaborationService } from "../services/api/collaborationService"
import type { Tag } from "../TagSystem"

export const useTagSharing = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shareableUrl, setShareableUrl] = useState<string | null>(null)

  // Generate a shareable link for tags
  const generateShareableLink = async (tags: Tag[]) => {
    setLoading(true)
    setError(null)

    try {
      // Only share active tags
      const activeTags = tags.filter((tag) => tag.active)

      if (activeTags.length === 0) {
        setError("No active tags to share")
        return null
      }

      const result = await collaborationService.generateShareableLink(activeTags)
      setShareableUrl(result.url)
      return result.url
    } catch (err: any) {
      setError(err.userMessage || "Failed to generate shareable link")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Get shared tags from a token
  const getSharedTags = async (token: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await collaborationService.getSharedCriteria(token)
      return result.tags as Tag[]
    } catch (err: any) {
      setError(err.userMessage || "Failed to load shared criteria")
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    shareableUrl,
    generateShareableLink,
    getSharedTags,
  }
}

