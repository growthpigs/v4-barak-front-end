"use client"

import type React from "react"
import { useState, useEffect } from "react"
import TagSystem, { type Tag, TagDetector } from "./TagSystem"

interface ShareableTagSetProps {
  tags: Tag[]
}

const ShareableTagSet: React.FC<ShareableTagSetProps> = ({ tags }) => {
  const activeTags = tags.filter((tag) => tag.active)

  if (activeTags.length === 0) {
    return <p>No active tags to share.</p>
  }

  return (
    <div>
      <p className="font-bold">Shareable Tag Set:</p>
      <ul>
        {activeTags.map((tag) => (
          <li key={tag.id} className="mb-2">
            <strong>{tag.category}:</strong> {tag.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

const TestTagSystem: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showShareable, setShowShareable] = useState(false)

  // Initialize with some sample tags
  useEffect(() => {
    const now = new Date()
    const sampleTags: Tag[] = [
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
      {
        id: "feature-1",
        label: "Balcony",
        type: "secondary",
        category: "features",
        value: "Balcony",
        confidence: 0.8,
        active: true,
        created: now,
        modified: now,
      },
    ]

    setTags(sampleTags)
  }, [])

  // Tag detector instance
  const tagDetector = new TagDetector()

  // Handle tag toggle
  const handleTagToggle = (tagId: string) => {
    setTags((prevTags) => prevTags.map((tag) => (tag.id === tagId ? { ...tag, active: !tag.active } : tag)))
  }

  // Handle tag removal
  const handleTagRemove = (tagId: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId))
  }

  // Handle tag update
  const handleTagUpdate = (tagId: string, newValue: string | number | Array<any>) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === tagId) {
          return {
            ...tag,
            label: typeof newValue === "string" ? newValue : String(newValue),
            value: newValue,
            modified: new Date(),
          }
        }
        return tag
      }),
    )
  }

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Detect tags from input
    const detectedTags = tagDetector.detectTags(inputValue)

    // Add new tags (avoid duplicates)
    if (detectedTags.length > 0) {
      setTags((prevTags) => {
        const newTags = [...prevTags]

        detectedTags.forEach((newTag) => {
          // Check if similar tag already exists
          const existingSimilar = newTags.find(
            (t) => t.category === newTag.category && t.label.toLowerCase() === newTag.label.toLowerCase(),
          )

          if (!existingSimilar) {
            newTags.push(newTag)
          }
        })

        return newTags
      })
    }

    setInputValue("")
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tag System Demo</h1>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type criteria (e.g., 'Paris 16e, 2 bedrooms, balcony')"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
            Add
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Try typing: "Looking for a 3 bedroom apartment in Paris with balcony under 900000€"
        </p>
      </form>

      {/* Tag System */}
      <div className="border rounded-lg overflow-hidden mb-6">
        <TagSystem
          tags={tags}
          onTagToggle={handleTagToggle}
          onTagRemove={handleTagRemove}
          onTagUpdate={handleTagUpdate}
        />
      </div>

      {/* Toggle shareable view */}
      <button
        onClick={() => setShowShareable(!showShareable)}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        {showShareable ? "Hide Shareable View" : "Show Shareable View"}
      </button>

      {/* Shareable Tag Set */}
      {showShareable && (
        <div className="mt-4">
          <ShareableTagSet tags={tags} />
        </div>
      )}
    </div>
  )
}

export default TestTagSystem

