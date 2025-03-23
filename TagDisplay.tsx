"use client"

import React from "react"
import { Tag } from "lucide-react"

interface TagDisplayProps {
  type: "location" | "budget" | "rooms" | "features"
  label: string
  onRemove?: () => void
}

const TagDisplay: React.FC<TagDisplayProps> = ({ type, label, onRemove }) => {
  // Define styles based on tag type
  const getTagStyles = () => {
    switch (type) {
      case "location":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "budget":
        return "bg-green-100 text-green-800 border-green-300"
      case "rooms":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "features":
        return "bg-amber-100 text-amber-800 border-amber-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getTagStyles()}`}>
      <Tag size={14} className="mr-1" />
      <span className="text-sm font-medium">{label}</span>
      
      {onRemove && (
        <button 
          onClick={onRemove}
          className="ml-1 rounded-full hover:bg-white/20 p-1"
          aria-label="Remove tag"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  )
}

export default TagDisplay

