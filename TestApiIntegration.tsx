"use client"

import type React from "react"

import { useState } from "react"
import ChatInterface from "./ChatInterface"
import type { Tag } from "./TagSystem"
import { propertyService } from "./services/api/propertyService"
import { userService } from "./services/api/userService"

export function TestApiIntegration() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Handle phone verification request
  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await userService.requestPhoneVerification(phone)
      if (result.success) {
        setShowVerification(true)
      } else {
        setError(result.message)
      }
    } catch (err: any) {
      setError(err.userMessage || "Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  // Handle verification code submission
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await userService.verifyPhone(phone, verificationCode)
      if (result.token) {
        setIsAuthenticated(true)
      }
    } catch (err: any) {
      setError(err.userMessage || "Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  // Handle logout
  const handleLogout = () => {
    userService.logout()
    setIsAuthenticated(false)
  }

  // Handle criteria confirmation
  const handleCriteriaConfirmed = (tags: Tag[]) => {
    console.log("Criteria confirmed:", tags)
    // In a real app, this might navigate to a results page
  }

  // Handle property like
  const handlePropertyLike = async (propertyId: string) => {
    try {
      await propertyService.likeProperty(propertyId)
      console.log(`Property ${propertyId} liked`)
    } catch (error) {
      console.error("Error liking property:", error)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="bg-white p-4 border-b shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">Property Search Assistant</h1>

        {isAuthenticated ? (
          <div className="flex items-center">
            <span className="mr-3 text-sm">{phone}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowVerification(false)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Sign In
          </button>
        )}
      </header>

      <main className="flex-1 overflow-hidden">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-center">
              {showVerification ? "Enter Verification Code" : "Sign In with Phone"}
            </h2>

            {!showVerification ? (
              <form onSubmit={handleRequestVerification}>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {error && <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode}>
                <div className="mb-4">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {error && <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowVerification(false)}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 focus:outline-none"
                >
                  Back
                </button>
              </form>
            )}
          </div>
        ) : (
          <ChatInterface onCriteriaConfirmed={handleCriteriaConfirmed} />
        )}
      </main>
    </div>
  )
}

