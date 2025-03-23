"use client"

import { useState } from "react"
import { languageService, type Language } from "../services/LanguageService"

export default function TestLanguageDetection() {
  const [input, setInput] = useState("")
  const [detectedLanguage, setDetectedLanguage] = useState<Language>("unknown")
  const [systemLanguage, setSystemLanguage] = useState<Language>(languageService.getSystemLanguage())

  const handleDetect = () => {
    if (!input.trim()) return
    const detected = languageService.detectLanguage(input)
    setDetectedLanguage(detected)
  }

  const toggleSystemLanguage = () => {
    setSystemLanguage(systemLanguage === "en" ? "fr" : "en")
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Language Detection Test</h1>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700">
            Enter text to detect language
          </label>
          <div className="text-sm">
            System language: <span className="font-medium">{systemLanguage.toUpperCase()}</span>
            <button
              onClick={toggleSystemLanguage}
              className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs"
            >
              Toggle
            </button>
          </div>
        </div>
        <div className="flex">
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Bonjour, comment ça va? or Hello, how are you?"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleDetect} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
            Detect
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Detection Result</h2>
        {detectedLanguage !== "unknown" ? (
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                detectedLanguage === "fr" ? "bg-blue-500" : detectedLanguage === "en" ? "bg-red-500" : "bg-gray-500"
              }`}
            ></div>
            <p className="font-medium">
              {detectedLanguage === "fr" ? "French" : detectedLanguage === "en" ? "English" : "Unknown"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Enter some text and click "Detect" to see the result</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Test Examples</h2>
        <div className="space-y-2">
          <button
            onClick={() => {
              setInput("Bonjour, je cherche un appartement à Paris avec 2 chambres et un balcon")
              handleDetect()
            }}
            className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            🇫🇷 "Bonjour, je cherche un appartement à Paris avec 2 chambres et un balcon"
          </button>

          <button
            onClick={() => {
              setInput("Hello, I'm looking for a 2-bedroom apartment in Paris with a balcony")
              handleDetect()
            }}
            className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            🇬🇧 "Hello, I'm looking for a 2-bedroom apartment in Paris with a balcony"
          </button>

          <button
            onClick={() => {
              setInput("Je need un apartment with 3 chambres in the 16ème")
              handleDetect()
            }}
            className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            🇫🇷🇬🇧 "Je need un apartment with 3 chambres in the 16ème" (Mixed)
          </button>
        </div>
      </div>
    </div>
  )
}

