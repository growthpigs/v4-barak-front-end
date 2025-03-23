"use client"
import { useState } from "react"
import { TagDetector } from "../../TagSystem"

export default function TestBudgetDetectionPage() {
  const [input, setInput] = useState("")
  const [detectedTags, setDetectedTags] = useState<any[]>([])

  const tagDetector = new TagDetector()

  const handleDetect = () => {
    if (!input.trim()) return
    const tags = tagDetector.detectTags(input)
    setDetectedTags(tags)
  }

  // Test cases specifically for budget detection
  const testCases = [
    "3 pieces, 94, 900k",
    "900k budget in Paris",
    "Looking for a place around 900",
    "Budget 900000 euros",
    "3 bedroom apartment for €900k",
    "900K maximum in 16th",
  ]

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Budget Tag Detection Test</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter text to detect tags</label>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 3 pieces, 94, 900k"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleDetect} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
            Detect
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test Cases</h2>
        <div className="flex flex-wrap gap-2">
          {testCases.map((testCase, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(testCase)
                const tags = tagDetector.detectTags(testCase)
                setDetectedTags(tags)
              }}
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
                <div
                  key={tag.id}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    tag.category === "location"
                      ? "bg-purple-200 text-purple-800"
                      : tag.category === "budget"
                        ? "bg-amber-200 text-amber-800"
                        : tag.category === "rooms"
                          ? "bg-pink-200 text-pink-800"
                          : "bg-green-200 text-green-800"
                  }`}
                >
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

