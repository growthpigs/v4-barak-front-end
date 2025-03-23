"use client"

import { useState, useEffect } from "react"

/**
 * A custom hook for making API requests with loading, error, and data states
 */
export function useApiRequest<T>(apiFunction: (...args: any[]) => Promise<T> | null, ...params: any[]) {
  const [state, setState] = useState<{
    data: T | null
    isLoading: boolean
    error: string | null
    lastUpdated: Date | null
  }>({
    data: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
  })

  useEffect(() => {
    let mounted = true

    // Only make the request if apiFunction is not null
    if (apiFunction === null) return

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    const fetchData = async () => {
      try {
        const result = await apiFunction(...params)
        if (mounted) {
          setState({
            data: result,
            isLoading: false,
            error: null,
            lastUpdated: new Date(),
          })
        }
      } catch (error: any) {
        if (mounted) {
          setState({
            data: null,
            isLoading: false,
            error: error.userMessage || "An error occurred",
            lastUpdated: new Date(),
          })
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [apiFunction, ...params])

  return state
}

