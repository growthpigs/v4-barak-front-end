"use client"

import type React from "react"
import TagPill from "./TagPill"
import { motion } from "framer-motion"
import type { Tag } from "../TagSystem"

interface TagDisplayProps {
  tags: Tag[]
  onTagToggle: (tagId: string) => void
  onTagRemove: (tagId: string) => void
  onShareCriteria?: () => void
}

const TagDisplay: React.FC<TagDisplayProps> = ({ tags, onTagToggle, onTagRemove, onShareCriteria }) => {
  if (tags.length === 0) return null

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Search Criteria</h3>
      </div>

      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <TagPill key={tag.id} tag={tag} onToggle={() => onTagToggle(tag.id)} onRemove={() => onTagRemove(tag.id)} />
        ))}
      </div>

      {tags.length > 0 && onShareCriteria && (
        <motion.button
          className="flex items-center text-sm text-blue-600 font-medium mt-2"
          whileTap={{ scale: 0.97 }}
          onClick={onShareCriteria}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share Criteria
        </motion.button>
      )}
    </div>
  )
}

export default TagDisplay

