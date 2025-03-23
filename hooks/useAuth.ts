"use client"

import { useState, useEffect } from "react"
import { userService, type User } from "../services/api/userService"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await userService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        // User is not authenticated or there was an error
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Request phone verification
  const requestPhoneVerification = async (phone: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await userService.requestPhoneVerification(phone)
      return result
    } catch (err: any) {
      setError(err.userMessage || "Failed to send verification code")
      return { success: false, message: err.userMessage || "Failed to send verification code" }
    } finally {
      setLoading(false)
    }
  }

  // Verify phone with OTP
  const verifyPhone = async (phone: string, code: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await userService.verifyPhone(phone, code)
      setUser(result.user)
      return { success: true }
    } catch (err: any) {
      setError(err.userMessage || "Invalid verification code")
      return { success: false, message: err.userMessage || "Invalid verification code" }
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = () => {
    userService.logout()
    setUser(null)
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    requestPhoneVerification,
    verifyPhone,
    logout,
  }
}

