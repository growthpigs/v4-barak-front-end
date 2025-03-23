"use client"

import { useState } from "react"
import { TagDetector, type Tag } from "./TagSystem"
import TagPill from "./components/TagPill"

export default function TestTagStyling() {
  const [tags, setTags] = useState<Tag[]>([])
  const [input, setInput] = useState("")

  const tagDetector = new TagDetector()

  const handleAddTag = () => {
    if (!input.trim()) return

    const detectedTags = tagDetector.detectTags(input)
    setTags((prev) => [...prev, ...detectedTags])
    setInput("")
  }

  const handleToggleTag = (id: string) => {
    setTags((prev) => prev.map((tag) => (tag.id === id ? { ...tag, active: !tag.active } : tag)))
  }

  const handleRemoveTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id))
  }

  // Sample tags for quick testing
  const sampleTags = ["Paris 16th", "€800k", "4 pieces", "Balcony", "92", "Hauts-de-Seine", "Apartment"]

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tag Styling Test</h1>

      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
          Add a tag
        </label>
        <div className="flex">
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Paris 16th"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleAddTag} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Quick Add</h2>
        <div className="flex flex-wrap gap-2">
          {sampleTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => {
                const detectedTags = tagDetector.detectTags(tag)
                setTags((prev) => [...prev, ...detectedTags])
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Tags</h2>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <TagPill
              key={tag.id}
              tag={tag}
              onToggle={() => handleToggleTag(tag.id)}
              onRemove={() => handleRemoveTag(tag.id)}
            />
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Tag Data</h3>
        <pre className="text-xs overflow-x-auto">{JSON.stringify(tags, null, 2)}</pre>
      </div>
    </div>
  )
}

