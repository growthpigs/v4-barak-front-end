"use client"

import { useState } from "react"
import { useAppState, type Tag } from "./context/AppStateContext"

// useTagManagement hook
export function useTagManagement() {
  const { state, dispatch } = useAppState()

  // Predefined suggestion mappings
  const suggestionMappings: Record<string, Omit<Tag, "id">[]> = {
    "3 bedroom in Paris 16th": [
      { label: "3 pieces", color: "bg-purple-400" },
      { label: "Paris, 16th", color: "bg-indigo-400" },
    ],
    "Good deals 5km around me": [
      { label: "Good deals", color: "bg-blue-400" },
      { label: "5km radius", color: "bg-orange-400" },
      { label: "Current location", color: "bg-purple-400" },
    ],
    "House with garden": [
      { label: "House", color: "bg-red-400" },
      { label: "Garden", color: "bg-blue-400" },
    ],
    "Family friendly": [{ label: "Family friendly", color: "bg-green-400" }],
  }

  // Function to add a single tag
  const addTag = (label: string, color: string) => {
    dispatch({
      type: "ADD_TAG",
      payload: { label, color },
    })
  }

  // Function to remove a tag
  const removeTag = (tagId: string) => {
    dispatch({
      type: "REMOVE_TAG",
      payload: tagId,
    })
  }

  // Process a suggestion bubble selection
  const handleSuggestion = (suggestion: string) => {
    // Add user message for the suggestion
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        text: suggestion,
        sender: "user",
      },
    })

    // Add tags based on the suggestion mapping
    if (suggestionMappings[suggestion]) {
      suggestionMappings[suggestion].forEach((tag) => {
        dispatch({
          type: "ADD_TAG",
          payload: tag,
        })
      })
    }

    // Start the search process
    startSearchProcess()
  }

  // Parse text input for tags
  const parseInputForTags = (input: string) => {
    // This is a simplified version - in a real app, you'd use more sophisticated NLP
    const text = input.toLowerCase()

    // Location detection
    if (text.includes("paris")) {
      if (text.includes("16th") || text.includes("16eme") || text.includes("16e")) {
        addTag("Paris, 16th", "bg-indigo-400")
      } else if (text.includes("12th") || text.includes("12eme") || text.includes("12e")) {
        addTag("Paris, 12th", "bg-indigo-400")
      } else {
        addTag("Paris", "bg-indigo-400")
      }
    }

    // Room detection
    if (text.includes("3 bedroom") || text.includes("3 pieces") || text.includes("3 rooms")) {
      addTag("3 pieces", "bg-green-400")
    } else if (text.includes("2 bedroom") || text.includes("2 pieces") || text.includes("2 rooms")) {
      addTag("2 pieces", "bg-green-400")
    }

    // Property type
    if (text.includes("house") || text.includes("maison")) {
      addTag("House", "bg-red-400")
    } else if (text.includes("apartment") || text.includes("apt")) {
      addTag("Apartment/Loft", "bg-blue-400")
    }

    // Features
    if (text.includes("garden") || text.includes("jardin")) {
      addTag("Garden", "bg-blue-400")
    } else if (text.includes("balcony") || text.includes("balcon")) {
      addTag("Balcony", "bg-sky-400")
    }

    // Budget
    if (text.includes("€800k") || text.includes("800k") || text.includes("800,000")) {
      addTag("€800k max", "bg-orange-400")
    }

    // Check if we have all required criteria to start search
    const hasLocation = state.tags.some((tag) => tag.label.includes("Paris") || tag.label.includes("paris"))

    const hasRooms = state.tags.some((tag) => tag.label.includes("pieces") || tag.label.includes("rooms"))

    const hasBudget = state.tags.some((tag) => tag.label.includes("€") || tag.label.includes("max"))

    // Only start search if we have all required criteria
    if (hasLocation && hasRooms && hasBudget) {
      startSearchProcess()
    } else {
      // If not enough criteria, add a message asking for more info
      if (!hasBudget) {
        setTimeout(() => {
          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              text: "What's your budget range?",
              sender: "ai",
            },
          })
        }, 1000)
      }
    }
  }

  // Start the search process with loading state
  const startSearchProcess = () => {
    dispatch({ type: "START_SEARCH" })

    // First, add an AI response
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        text: "Great! Let me find options for you. You will see your criteria below. Tap to change, or continue.",
        sender: "ai",
      },
    })

    // Simulate API delay
    setTimeout(() => {
      dispatch({ type: "END_SEARCH" })
      dispatch({ type: "SHOW_PROPERTY_STACK" })

      // Add property stack message
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          text: "",
          sender: "ai",
          isPropertyStack: true,
        },
      })

      // Add swipe instructions as a separate message AFTER the property stack
      setTimeout(() => {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            text: "Swipe left to skip or right if you're interested, or keep chatting to change search!",
            sender: "ai",
          },
        })
      }, 500)
    }, 2000)
  }

  return {
    tags: state.tags,
    addTag,
    removeTag,
    handleSuggestion,
    parseInputForTags,
    startSearchProcess,
  }
}

// usePropertySearch hook
export function usePropertySearch() {
  const { state, dispatch } = useAppState()

  // Handle property removal (swipe action)
  const handleRemoveProperty = (id: number) => {
    dispatch({
      type: "REMOVE_PROPERTY",
      payload: id,
    })

    // If no properties left, add a message
    if (state.properties.length <= 1) {
      setTimeout(() => {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            text: "No more properties match your criteria. Would you like to adjust your search?",
            sender: "ai",
          },
        })
      }, 500)
    }
  }

  // View property details
  const viewPropertyDetails = (property: (typeof state.properties)[0]) => {
    dispatch({
      type: "SET_ACTIVE_PROPERTY",
      payload: property,
    })
  }

  // Handle property action (call, info, share, etc.)
  const handlePropertyAction = (type: string, property: (typeof state.properties)[0]) => {
    dispatch({
      type: "SET_ACTIVE_MODAL",
      payload: { type, property },
    })
  }

  // Close modal
  const closeModal = () => {
    dispatch({
      type: "SET_ACTIVE_MODAL",
      payload: { type: null, property: null },
    })
  }

  return {
    properties: state.properties,
    showPropertyStack: state.showPropertyStack,
    isSearching: state.isSearching,
    activeProperty: state.activeProperty,
    activeModal: state.activeModal,
    handleRemoveProperty,
    viewPropertyDetails,
    handlePropertyAction,
    closeModal,
  }
}

// useConversation hook
export function useConversation() {
  const { state, dispatch } = useAppState()
  const { parseInputForTags } = useTagManagement()
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)

  // Suggestion bubbles
  const suggestionBubbles = [
    { id: "1", text: "3 bedroom in Paris 16th" },
    { id: "2", text: "Good deals 5km around me" },
    { id: "3", text: "House with garden" },
    { id: "4", text: "Family friendly" },
  ]

  // Add a user message
  const addUserMessage = (text: string) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        text,
        sender: "user",
      },
    })

    // Hide suggestions after user input
    setShowSuggestions(false)

    // Parse input for tags
    parseInputForTags(text)

    // Basic AI response if early in conversation
    if (state.messages.length < 3) {
      setTimeout(() => {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            text: "What's your budget range? And any specific amenities?",
            sender: "ai",
          },
        })
      }, 1000)
    }
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    addUserMessage(inputValue)
    setInputValue("")
  }

  // Handle suggestion bubble click
  const handleSuggestion = (suggestion: string) => {
    // Add user message
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        text: suggestion,
        sender: "user",
      },
    })

    // Hide suggestions
    setShowSuggestions(false)

    // Parse suggestion for tags
    parseInputForTags(suggestion)
  }

  return {
    messages: state.messages,
    inputValue,
    showSuggestions,
    suggestionBubbles,
    setInputValue,
    handleSendMessage,
    handleSuggestion,
  }
}

