"use client"

import { apiClient } from "./apiClient"

// Types
export interface User {
  id: string
  phone: string
  email?: string
  name?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface VerificationResponse {
  success: boolean
  message: string
}

// User service
class UserService {
  private tokenKey = "auth_token"
  private userKey = "user_data"

  // Initialize - load token from storage
  constructor() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(this.tokenKey)
      if (token) {
        apiClient.setAuthToken(token)
      }
    }
  }

  // Request phone verification
  async requestPhoneVerification(phone: string): Promise<VerificationResponse> {
    try {
      // In a real app, this would be an API call
      // return await apiClient.post<VerificationResponse>('/auth/verify/request', { phone });

      // For development, simulate success
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Verification code sent successfully",
          })
        }, 1000)
      })
    } catch (error) {
      console.error("Error requesting verification:", error)
      throw error
    }
  }

  // Verify phone with code
  async verifyPhone(phone: string, code: string): Promise<AuthResponse> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.post<AuthResponse>('/auth/verify', { phone, code });

      // For development, simulate success
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = {
            user: {
              id: "123",
              phone,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            token: "mock_token_" + Math.random().toString(36).substring(2),
          }

          // Save token and user data
          this.saveAuthData(response)

          resolve(response)
        }, 1000)
      })
    } catch (error) {
      console.error("Error verifying phone:", error)
      throw error
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      // In a real app, this would be an API call
      // return await apiClient.get<User>('/users/me');

      // For development, get from storage
      const userData = this.getUserData()
      if (!userData) {
        throw new Error("User not authenticated")
      }

      return userData
    } catch (error) {
      console.error("Error getting current user:", error)
      throw error
    }
  }

  // Logout
  logout(): void {
    apiClient.setAuthToken(null)

    if (typeof window !== "undefined") {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.userKey)
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem(this.tokenKey)
    }
    return false
  }

  // Save auth data to storage
  private saveAuthData(data: AuthResponse): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.tokenKey, data.token)
      localStorage.setItem(this.userKey, JSON.stringify(data.user))
      apiClient.setAuthToken(data.token)
    }
  }

  // Get user data from storage
  private getUserData(): User | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem(this.userKey)
      return userData ? JSON.parse(userData) : null
    }
    return null
  }
}

export const userService = new UserService()

