"use client"
import type { Tag } from "../../TagSystem"

// Types
export interface ShareableLinkResponse {
  url: string
  token: string
  expiresAt: string
}

export interface SharedCriteriaResponse {
  tags: Tag[]
  sharedBy: {
    id: string
    phone: string
  }
  createdAt: string
}

// Collaboration service
class CollaborationService {
  // Generate a shareable link for tags
  async generateShareableLink(tags: Tag[]): Promise<ShareableLinkResponse> {
    try {
      // In a real app, this would be an API call
      // return await apiClient.post<ShareableLinkResponse>('/share/criteria', { tags });

      // For development, simulate response
      return new Promise((resolve) => {
        setTimeout(() => {
          const token = Math.random().toString(36).substring(2)
          const url = `${window.location.origin}/shared?token=${token}`

          resolve({
            url,
            token,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          })
        }, 800)
      })
    } catch (error) {
      console.error("Error generating shareable link:", error)
      throw error
    }
  }

  // Get shared criteria from token
  async getSharedCriteria(token: string): Promise<SharedCriteriaResponse> {
    try {
      // In a real app, this would be an API call
      // return await apiClient.get<SharedCriteriaResponse>(`/share/criteria/${token}`);

      // For development, simulate response
      return new Promise((resolve) => {
        setTimeout(() => {
          const now = new Date()

          resolve({
            tags: [
              {
                id: "location-1",
                label: "Paris 16e",
                type: "primary",
                category: "location",
                value: "Paris 16e",
                confidence: 0.95,
                active: true,
                created: now,
                modified: now,
              },
              {
                id: "budget-1",
                label: "800000€",
                type: "primary",
                category: "budget",
                value: 800000,
                confidence: 0.9,
                active: true,
                created: now,
                modified: now,
              },
              {
                id: "rooms-1",
                label: "2 bedrooms",
                type: "primary",
                category: "rooms",
                value: 2,
                confidence: 0.9,
                active: true,
                created: now,
                modified: now,
              },
            ],
            sharedBy: {
              id: "123",
              phone: "+33612345678",
            },
            createdAt: now.toISOString(),
          })
        }, 800)
      })
    } catch (error) {
      console.error("Error getting shared criteria:", error)
      throw error
    }
  }
}

export const collaborationService = new CollaborationService()

