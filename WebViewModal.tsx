"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"

interface WebViewModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title?: string
}

const WebViewModal: React.FC<WebViewModalProps> = ({ isOpen, onClose, url, title = "SeLoger.com" }) => {
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Add this state variable after the existing state declarations
  const [error, setError] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Reset loading state when URL changes
  useEffect(() => {
    setLoading(true)
  }, [url])

  // Update the handleIframeLoad function
  const handleIframeLoad = () => {
    setLoading(false)
    setError(false)
  }

  // Add a new function to handle iframe errors
  const handleIframeError = () => {
    setLoading(false)
    setError(true)
  }

  // Navigation functions
  const handleGoBack = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.back()
    }
  }

  const handleGoForward = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.forward()
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container - ensures it stays within device boundaries */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-t-3xl shadow-lg overflow-hidden"
            initial={{ y: "100%" }}
            animate={{
              y: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
              },
            }}
            exit={{
              y: "100%",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            style={{
              height: "75%", // 75% of device height, not viewport
              maxHeight: "calc(100% - env(safe-area-inset-top, 20px))",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            {/* Drag handle */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header with navigation controls */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleGoBack}
                  className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleGoForward}
                  className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
                  aria-label="Go forward"
                >
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
                  aria-label="Refresh"
                >
                  <RefreshCw size={20} />
                </button>
              </div>

              <div className="font-medium truncate max-w-[120px]">{title}</div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 mt-16">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10 mt-16">
                <div className="flex flex-col items-center text-center px-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <X size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load content</h3>
                  <p className="text-gray-600 mb-4">
                    The external website could not be loaded. This might be due to content restrictions or connectivity
                    issues.
                  </p>
                  <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* iframe content */}
            <div className="h-[calc(100%-64px)] w-full overflow-hidden">
              <iframe
                ref={iframeRef}
                src={url}
                title={title || "External website"}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default WebViewModal

