"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Share2 } from "lucide-react"
import { PropertyCardStack } from "./PropertyCardStack"
import TagSystem, { type Tag, TagDetector, ShareableTagSet } from "./TagSystem"
import { useApiRequest } from "./hooks/useApiRequest"
import { propertyService } from "./services/api/propertyService"
import { collaborationService } from "./services/api/collaborationService"
import { convertTagsToSearchParams } from "./utils/tagUtils"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
  isPropertyStack?: boolean
  isSearching?: boolean
}

interface ChatInterfaceProps {
  onCriteriaConfirmed?: (tags: Tag[]) => void
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onCriteriaConfirmed }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the future - free powerful AI property searching in France. Tell me anything about your ideal home you're after?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [tags, setTags] = useState<Tag[]>([])
  const [showShareableTags, setShowShareableTags] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [shareableUrl, setShareableUrl] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const tagDetector = new TagDetector()

  // Fetch properties based on tags
  const searchParams = convertTagsToSearchParams(tags)
  const {
    data: properties,
    isLoading: isLoadingProperties,
    error: propertiesError,
  } = useApiRequest(
    propertyService.searchProperties,
    // Only make the API call if we have enough criteria
    hasMinimumSearchCriteria(tags) ? searchParams : null,
  )

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Check if we have minimum search criteria
  function hasMinimumSearchCriteria(tags: Tag[]): boolean {
    const activeTags = tags.filter((tag) => tag.active)
    const hasLocation = activeTags.some((tag) => tag.category === "location")
    const hasBudget = activeTags.some((tag) => tag.category === "budget")
    const hasRooms = activeTags.some((tag) => tag.category === "rooms")

    return hasLocation && hasBudget && hasRooms
  }

  // Handle sending a message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Detect tags from the message
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

    // Clear input
    setInputValue("")

    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)

      // Generate response based on user message
      let responseText = ""

      if (inputValue.toLowerCase().includes("hello") || inputValue.toLowerCase().includes("bonjour")) {
        responseText = "Hello! I'm here to help you find your ideal property. What are you looking for?"
      } else if (inputValue.toLowerCase().includes("paris") || inputValue.toLowerCase().includes("location")) {
        responseText = "Paris is a great choice! Which arrondissement are you interested in? And what's your budget?"
      } else if (inputValue.toLowerCase().includes("budget") || inputValue.toLowerCase().includes("€")) {
        responseText = "Thanks for sharing your budget. How many bedrooms are you looking for?"
      } else if (inputValue.toLowerCase().includes("bedroom") || inputValue.toLowerCase().includes("room")) {
        responseText = "Got it. Are there any specific features you're looking for, like a balcony or parking?"
      } else if (inputValue.toLowerCase().includes("balcony") || inputValue.toLowerCase().includes("garden")) {
        responseText =
          "I'll look for properties with those features. Would you like to see what matches your criteria now?"
      } else if (
        inputValue.toLowerCase().includes("show") ||
        inputValue.toLowerCase().includes("see") ||
        inputValue.toLowerCase().includes("result")
      ) {
        // Check if we have enough criteria to show results
        if (hasMinimumSearchCriteria(tags)) {
          responseText = "Great! I'll show you properties that match your criteria."

          // Start search process
          setIsSearching(true)

          // Add a property stack message after a delay
          setTimeout(() => {
            setIsSearching(false)

            // Add property stack message
            const propertyStackMessage: Message = {
              id: Date.now().toString(),
              text: "",
              sender: "ai",
              timestamp: new Date(),
              isPropertyStack: true,
            }
            setMessages((prev) => [...prev, propertyStackMessage])

            // If onCriteriaConfirmed callback is provided, call it
            if (onCriteriaConfirmed) {
              onCriteriaConfirmed(tags.filter((tag) => tag.active))
            }

            // Add swipe instructions as a separate message
            setTimeout(() => {
              const instructionsMessage: Message = {
                id: Date.now().toString(),
                text: "Swipe left to skip or right if you're interested, or keep chatting to change search!",
                sender: "ai",
                timestamp: new Date(),
              }
              setMessages((prev) => [...prev, instructionsMessage])
            }, 500)
          }, 2000)
        } else {
          responseText =
            "I need a bit more information before I can show you properties. " +
            (!tags.some((t) => t.category === "location" && t.active) ? "Where are you looking to buy? " : "") +
            (!tags.some((t) => t.category === "budget" && t.active) ? "What's your budget? " : "") +
            (!tags.some((t) => t.category === "rooms" && t.active) ? "How many bedrooms do you need? " : "")
        }
      } else {
        responseText =
          "Could you tell me more about what you're looking for? For example, location, budget, number of bedrooms, or specific features."
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

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

  // Generate shareable link
  const generateShareableLink = async () => {
    try {
      const activeTags = tags.filter((tag) => tag.active)
      if (activeTags.length === 0) return

      const result = await collaborationService.generateShareableLink(activeTags)
      setShareableUrl(result.url)
    } catch (error) {
      console.error("Error generating shareable link:", error)
    }
  }

  // Toggle shareable tags view
  const toggleShareableTags = async () => {
    if (!showShareableTags) {
      await generateShareableLink()
    }
    setShowShareableTags(!showShareableTags)
  }

  // Handle property actions
  const handlePropertyAction = async (action: string, propertyId: number) => {
    console.log(`Action ${action} on property ${propertyId}`)

    switch (action) {
      case "like":
        await propertyService.likeProperty(String(propertyId))
        break
      case "dismiss":
        await propertyService.dismissProperty(String(propertyId))
        break
      // Other actions would be implemented similarly
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] bg-gray-50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.isPropertyStack ? (
              <div className="w-full my-4">
                <PropertyCardStack
                  properties={properties || []}
                  tags={tags}
                  isSearching={isSearching || isLoadingProperties}
                  onAction={handlePropertyAction}
                />

                {propertiesError && <div className="text-red-500 text-center mt-2">{propertiesError}</div>}
              </div>
            ) : (
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "200ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "400ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Shareable tags */}
        {showShareableTags && (
          <div className="my-4">
            <ShareableTagSet tags={tags} />

            {/* Display shareable URL if available */}
            {shareableUrl && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium mb-1">Shareable Link:</p>
                <div className="flex">
                  <input type="text" value={shareableUrl} readOnly className="flex-1 p-2 text-sm border rounded-l-md" />
                  <button
                    className="bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(shareableUrl)
                      // Show a toast or notification
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Tag System */}
      {tags.length > 0 && (
        <TagSystem
          tags={tags}
          onTagToggle={handleTagToggle}
          onTagRemove={handleTagRemove}
          onTagUpdate={handleTagUpdate}
        />
      )}

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Dites-moi ce que vous recherchez..."
            className="flex-1 px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* Share button */}
          {tags.length > 0 && (
            <button
              type="button"
              onClick={toggleShareableTags}
              className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
              aria-label="Share criteria"
            >
              <Share2 size={18} />
            </button>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface

