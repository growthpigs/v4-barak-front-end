"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { Tag } from "../TagSystem"

interface TagPillProps {
  tag: Tag
  onToggle: () => void
  onRemove: () => void
}

const TagPill: React.FC<TagPillProps> = ({ tag, onToggle, onRemove }) => {
  // Get the correct background color based on category - exact colors from design
  const getTagColor = () => {
    if (!tag.active) return "bg-gray-100 text-gray-600"

    switch (tag.category) {
      case "location":
        return "bg-purple-200 text-purple-800" // Paris 16th - Purple
      case "budget":
        return "bg-amber-200 text-amber-800" // Max €800K - Amber/Brown
      case "rooms":
        return "bg-pink-200 text-pink-800" // 2 Bedrooms - Pink
      case "features":
        return "bg-green-200 text-green-800" // Balcony - Green
      case "condition":
        return "bg-fuchsia-200 text-fuchsia-800" // Property Type - Fuchsia
      case "environmental":
        return "bg-blue-200 text-blue-800" // Default blue
      default:
        return "bg-blue-200 text-blue-800" // Default blue
    }
  }

  // Get the appropriate icon for the category
  const getTagIcon = () => {
    switch (tag.category) {
      case "location":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case "budget":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "rooms":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case "features":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getTagColor()} cursor-pointer mr-2 mb-1.5`}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onToggle}
    >
      {getTagIcon()}
      <span>{tag.label}</span>
      <button
        className="ml-1 rounded-full hover:bg-white hover:bg-opacity-30 p-0.5"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
  )
}

export default TagPill

