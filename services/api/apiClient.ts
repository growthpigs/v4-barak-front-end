"use client"

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios"

// API Configuration
export interface ApiConfig {
  baseUrl: string
  timeout: number
  headers: Record<string, string>
}

// API Response format
export interface ApiResponse<T> {
  data: T
  status: number
  message: string
  success: boolean
}

// API Error format
export interface ApiError {
  code: string
  message: string
  userMessage: string
  technical?: string
}

// Default API configuration with NextJS environment variable
const DEFAULT_CONFIG: ApiConfig = {
  // Use NEXT_PUBLIC_API_URL environment variable with fallback
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.frenchpropertyfinder.com/v1",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

// For development, use mock data if NEXT_PUBLIC_API_URL is not defined
const USE_MOCK_DATA = !process.env.NEXT_PUBLIC_API_URL

// Token storage keys
const TOKEN_STORAGE_KEY = "auth_token"
const REFRESH_TOKEN_STORAGE_KEY = "refresh_token"

class ApiClient {
  private axios: AxiosInstance
  private config: ApiConfig
  private useMockData: boolean

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.useMockData = USE_MOCK_DATA

    // Log API configuration for debugging
    console.log("API Client Configuration:", {
      baseUrl: this.config.baseUrl,
      useMockData: this.useMockData,
    })

    this.axios = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: this.config.headers,
    })

    // Setup request interceptor for auth token
    this.axios.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem(TOKEN_STORAGE_KEY)
          if (token) {
            config.headers = config.headers || {}
            config.headers["Authorization"] = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Setup response interceptor for handling errors and token refresh
    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            await this.refreshToken()
            const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_STORAGE_KEY) : null
            if (token && originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`
            }
            return this.axios(originalRequest)
          } catch (refreshError) {
            // If refresh fails, clear tokens and redirect to auth
            this.clearTokens()
            return Promise.reject(refreshError)
          }
        }

        // Handle other errors
        return Promise.reject(this.normalizeError(error))
      },
    )
  }

  // Make a GET request
  async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // If using mock data, return mock response
    if (this.useMockData) {
      return this.getMockResponse<T>(url, params)
    }

    try {
      const response = await this.axios.get<ApiResponse<T>>(url, {
        ...config,
        params,
      })
      return response.data
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  // Make a POST request
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // If using mock data, return mock response
    if (this.useMockData) {
      return this.getMockResponse<T>(url, null, data)
    }

    try {
      const response = await this.axios.post<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  // Make a PUT request
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // If using mock data, return mock response
    if (this.useMockData) {
      return this.getMockResponse<T>(url, null, data)
    }

    try {
      const response = await this.axios.put<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  // Make a DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // If using mock data, return mock response
    if (this.useMockData) {
      return this.getMockResponse<T>(url)
    }

    try {
      const response = await this.axios.delete<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw this.normalizeError(error)
    }
  }

  // Store auth tokens
  storeTokens(token: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
    }
  }

  // Clear auth tokens
  clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
    }
  }

  // Refresh token
  private async refreshToken(): Promise<void> {
    if (typeof window === "undefined") return

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    // If using mock data, simulate token refresh
    if (this.useMockData) {
      this.storeTokens("mock-token-refreshed", "mock-refresh-token-refreshed")
      return
    }

    try {
      const response = await axios.post<{ token: string; refreshToken: string }>(
        `${this.config.baseUrl}/auth/refresh`,
        { refreshToken },
      )

      this.storeTokens(response.data.token, response.data.refreshToken)
    } catch (error) {
      // If refresh fails, clear tokens
      this.clearTokens()
      throw error
    }
  }

  // Normalize errors to a consistent format
  private normalizeError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>

      // Try to get error details from response
      const responseData = axiosError.response?.data

      return {
        code: axiosError.code || "unknown",
        message: responseData?.message || axiosError.message || "An error occurred",
        userMessage: responseData?.userMessage || "Something went wrong. Please try again later.",
        technical: JSON.stringify(axiosError.toJSON()),
      }
    }

    // For non-Axios errors
    return {
      code: "unknown",
      message: error?.message || "An unknown error occurred",
      userMessage: "Something went wrong. Please try again later.",
      technical: error?.stack,
    }
  }

  // Mock data response for development without API
  private getMockResponse<T>(url: string, params?: any, data?: any): Promise<ApiResponse<T>> {
    console.log("Using mock data for request:", { url, params, data })

    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate mock response based on URL
        let mockData: any

        if (url.includes("/properties")) {
          mockData = this.getMockProperties(url, params, data)
        } else if (url.includes("/auth")) {
          mockData = this.getMockAuth(url, data)
        } else if (url.includes("/circles")) {
          mockData = this.getMockCollaboration(url, params, data)
        } else {
          mockData = { message: "Mock data not available for this endpoint" }
        }

        resolve({
          data: mockData as T,
          status: 200,
          message: "Success",
          success: true,
        })
      }, 500) // 500ms delay to simulate network
    })
  }

  // Mock property data
  private getMockProperties(url: string, params?: any, data?: any): any {
    // Mock property data
    const mockProperties = [
      {
        id: "1",
        title: "Modern Apartment in City Center",
        description: "Beautiful modern apartment with all amenities",
        price: 450000,
        location: {
          address: "15 Rue de Rivoli",
          city: "Paris",
          postalCode: "75001",
          coordinates: {
            latitude: 48.856614,
            longitude: 2.352222,
          },
        },
        features: {
          bedrooms: 2,
          bathrooms: 1,
          size: 65, // in square meters
          hasBalcony: true,
          hasParking: false,
          hasElevator: true,
        },
        images: [
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
        ],
        certification: {
          score: 4,
          details: "Great value for the location and condition",
        },
        agent: {
          id: "a1",
          name: "Sophie Martin",
          phone: "+33123456789",
          email: "sophie@agency.com",
          agency: "Paris Luxury Properties",
        },
        status: "available",
        createdAt: "2023-01-15T14:30:00Z",
        updatedAt: "2023-02-10T09:15:00Z",
      },
      {
        id: "2",
        title: "Charming Studio Near Metro",
        description: "Cozy studio apartment with excellent transport links",
        price: 320000,
        location: {
          address: "42 Avenue Montaigne",
          city: "Paris",
          postalCode: "75008",
          coordinates: {
            latitude: 48.865784,
            longitude: 2.301047,
          },
        },
        features: {
          bedrooms: 1,
          bathrooms: 1,
          size: 35,
          hasBalcony: false,
          hasParking: false,
          hasElevator: true,
        },
        images: [
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
        ],
        certification: {
          score: 3,
          details: "Good value for a central location",
        },
        agent: {
          id: "a2",
          name: "Jean Dupont",
          phone: "+33198765432",
          email: "jean@agency.com",
          agency: "Paris Metro Properties",
        },
        status: "available",
        createdAt: "2023-02-05T10:45:00Z",
        updatedAt: "2023-02-20T16:30:00Z",
      },
      {
        id: "3",
        title: "Spacious Family Home with Garden",
        description: "Perfect family home with private garden and modern amenities",
        price: 750000,
        location: {
          address: "8 Rue des Jardins",
          city: "Bordeaux",
          postalCode: "33000",
          coordinates: {
            latitude: 44.837789,
            longitude: -0.57918,
          },
        },
        features: {
          bedrooms: 4,
          bathrooms: 2,
          size: 120,
          hasBalcony: true,
          hasParking: true,
          hasElevator: false,
        },
        images: [
          "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
        ],
        certification: {
          score: 5,
          details: "Excellent value and condition",
        },
        agent: {
          id: "a3",
          name: "Marie Bernard",
          phone: "+33765432198",
          email: "marie@agency.com",
          agency: "Bordeaux Family Homes",
        },
        status: "available",
        createdAt: "2023-01-20T09:00:00Z",
        updatedAt: "2023-02-15T11:20:00Z",
      },
    ]

    // Handle different property endpoints
    if (url.includes("/properties/liked")) {
      return mockProperties.slice(0, 1)
    } else if (url.includes("/properties/seen")) {
      return mockProperties.slice(1, 2)
    } else if (url.includes("/properties/unseen")) {
      return mockProperties.slice(2)
    } else if (url.match(/\/properties\/\w+\/like$/)) {
      return { success: true, message: "Property liked successfully" }
    } else if (url.match(/\/properties\/\w+\/dismiss$/)) {
      return { success: true, message: "Property dismissed successfully" }
    } else if (url.match(/\/properties\/\w+$/)) {
      // Get property by ID
      const id = url.split("/").pop()
      return mockProperties.find((p) => p.id === id) || null
    } else {
      // Search properties - filter based on params if provided
      if (params) {
        let filtered = [...mockProperties]

        if (params.location) {
          const locations = Array.isArray(params.location) ? params.location : [params.location]
          filtered = filtered.filter((p) =>
            locations.some(
              (loc) => p.location.city.toLowerCase().includes(loc.toLowerCase()) || p.location.postalCode.includes(loc),
            ),
          )
        }

        if (params.priceMax) {
          filtered = filtered.filter((p) => p.price <= params.priceMax)
        }

        if (params.bedrooms) {
          const beds = Array.isArray(params.bedrooms) ? params.bedrooms : [params.bedrooms]
          filtered = filtered.filter((p) => beds.includes(p.features.bedrooms))
        }

        if (params.features && params.features.length) {
          filtered = filtered.filter((p) => {
            return params.features.some((feature: string) => {
              if (feature === "balcony") return p.features.hasBalcony
              if (feature === "parking") return p.features.hasParking
              if (feature === "elevator") return p.features.hasElevator
              return false
            })
          })
        }

        return filtered
      }

      return mockProperties
    }
  }

  // Mock authentication data
  private getMockAuth(url: string, data?: any): any {
    if (url.includes("/auth/phone/request")) {
      return {
        success: true,
        message: "Verification code sent successfully",
      }
    } else if (url.includes("/auth/phone/verify")) {
      return {
        user: {
          id: "u1",
          phone: data?.phone || "+33123456789",
          name: "Test User",
          email: null,
          preferences: {
            savedSearches: [],
            notificationSettings: {
              newProperties: true,
              priceChanges: true,
              collaborationUpdates: true,
            },
          },
          authenticated: true,
          createdAt: "2023-02-01T12:00:00Z",
          lastLogin: "2023-03-10T15:30:00Z",
        },
        token: "mock-token",
        refreshToken: "mock-refresh-token",
      }
    } else if (url.includes("/auth/refresh")) {
      return {
        token: "mock-token-refreshed",
        refreshToken: "mock-refresh-token-refreshed",
      }
    }

    return null
  }

  // Mock collaboration data
  private getMockCollaboration(url: string, params?: any, data?: any): any {
    const mockCircle = {
      id: "c1",
      name: "Family Property Search",
      createdBy: "u1",
      members: [
        {
          id: "u1",
          phone: "+33123456789",
          name: "Test User",
          role: "Owner",
          joinedAt: "2023-02-15T10:00:00Z",
        },
        {
          id: "u2",
          phone: "+33987654321",
          name: "Partner User",
          role: "Member",
          joinedAt: "2023-02-15T10:30:00Z",
        },
      ],
      properties: [
        {
          property: this.getMockProperties("/properties/1")[0],
          reactions: [
            {
              userId: "u1",
              reaction: "like",
              createdAt: "2023-02-16T14:20:00Z",
            },
            {
              userId: "u2",
              reaction: "like",
              comment: "Love the kitchen",
              createdAt: "2023-02-16T15:10:00Z",
            },
          ],
        },
      ],
      createdAt: "2023-02-15T10:00:00Z",
      updatedAt: "2023-02-16T15:10:00Z",
    }

    if (url.includes("/circles") && !url.includes("/")) {
      return [mockCircle]
    } else if (url.match(/\/circles\/\w+$/)) {
      return mockCircle
    } else if (url.includes("/invite")) {
      return {
        success: true,
        message: "Invitation sent successfully",
      }
    } else if (url.includes("/properties")) {
      return mockCircle
    } else if (url.includes("/share/criteria")) {
      return {
        url: "https://frenchpropertyfinder.com/shared?token=mock-token",
        expiresAt: "2023-04-15T10:00:00Z",
      }
    }

    return null
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

export default ApiClient

