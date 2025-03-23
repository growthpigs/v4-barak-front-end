"use client"

import { useState, useEffect } from "react"
import { TagDetector, type Tag } from "../TagSystem"

export default function TestFuzzyTagDetector() {
  const [input, setInput] = useState("")
  const [detectedTags, setDetectedTags] = useState<Tag[]>([])
  const [testCases, setTestCases] = useState<string[]>([
    "4 piees", // Common misspelling of "pieces"
    "3 pièces, 11th, €800k",
    "2 bedroom, balcony, 92, under 750k€",
    "4 pces in Paris",
    "Studio in 11eme with terrace",
    "3 chambrs in Hauts-de-Seine",
    "Budget around 800k in Neuilly",
    "4 pieces",
    "Pari 16e, 2 pièces, balcon",
    "800k, 3 pies, 16e",
  ])

  const tagDetector = new TagDetector()

  const handleDetect = () => {
    if (!input.trim()) return

    const tags = tagDetector.detectTags(input)
    setDetectedTags(tags)
  }

  const handleTestCase = (testCase: string) => {
    setInput(testCase)
    const tags = tagDetector.detectTags(testCase)
    setDetectedTags(tags)
  }

  // Auto-detect when input changes
  useEffect(() => {
    if (input.trim()) {
      const tags = tagDetector.detectTags(input)
      setDetectedTags(tags)
    } else {
      setDetectedTags([])
    }
  }, [input])

  // Get tag color based on category
  const getTagColor = (category: string) => {
    switch (category) {
      case "location":
        return "bg-purple-200 text-purple-800"
      case "budget":
        return "bg-amber-200 text-amber-800"
      case "rooms":
        return "bg-pink-200 text-pink-800"
      case "features":
        return "bg-green-200 text-green-800"
      case "condition":
        return "bg-fuchsia-200 text-fuchsia-800"
      case "environmental":
        return "bg-blue-200 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Fuzzy Tag Detector Test</h1>

      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter text to detect tags (try misspellings!)
        </label>
        <div className="flex">
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 4 piees in Paris 16e"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleDetect} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
            Detect
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test Cases (with misspellings)</h2>
        <div className="flex flex-wrap gap-2">
          {testCases.map((testCase, index) => (
            <button
              key={index}
              onClick={() => handleTestCase(testCase)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
            >
              {testCase}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Detected Tags</h2>
        {detectedTags.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {detectedTags.map((tag) => (
                <div key={tag.id} className={`px-3 py-1.5 rounded-full text-sm ${getTagColor(tag.category)}`}>
                  <span className="font-medium">{tag.category}:</span> {tag.label}
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Raw Tag Data</h3>
              <pre className="text-xs overflow-x-auto">{JSON.stringify(detectedTags, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No tags detected. Try entering some text or clicking a test case.</p>
        )}
      </div>
    </div>
  )
}

