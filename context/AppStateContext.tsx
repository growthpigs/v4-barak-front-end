"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Define Types
export type Tag = {
  id: string
  label: string
  color: string
}

export type Property = {
  id: number
  image: string
  location: string
  price: string
  size: string
  rooms: string
  type: string
}

export type Message = {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  isPropertyStack?: boolean
  isSearching?: boolean
}

// State Type
type AppState = {
  messages: Message[]
  tags: Tag[]
  properties: Property[]
  isAuthenticated: boolean
  isSearching: boolean
  showPropertyStack: boolean
  phoneNumber: string | null
  activeScreen: string | null
  activeProperty: Property | null
  activeModal: {
    type: string | null
    property: Property | null
  }
}

// Initial State
const initialState: AppState = {
  messages: [
    {
      id: "1",
      text: "Welcome to the future - free powerful AI property searching in France. Tell me anything about your ideal home you're after?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  tags: [],
  properties: [],
  isAuthenticated: false,
  isSearching: false,
  showPropertyStack: false,
  phoneNumber: null,
  activeScreen: null,
  activeProperty: null,
  activeModal: {
    type: null,
    property: null,
  },
}

// Sample Properties
const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    location: "Avenue Victor Hugo • 16th",
    price: "€780,000",
    size: "85m²",
    rooms: "2 pieces",
    type: "Apt.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
    location: "Rue de Passy • 16th",
    price: "€750,000",
    size: "78m²",
    rooms: "2 pieces",
    type: "Apt.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop",
    location: "Boulevard Suchet • 16th",
    price: "€795,000",
    size: "90m²",
    rooms: "3 pieces",
    type: "Apt.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    location: "Rue de la Pompe • 16th",
    price: "€820,000",
    size: "92m²",
    rooms: "2 pieces",
    type: "Apt.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop",
    location: "Avenue Foch • 16th",
    price: "€760,000",
    size: "82m²",
    rooms: "2 pieces",
    type: "Apt.",
  },
]

// Action Types
type Action =
  | { type: "ADD_MESSAGE"; payload: Omit<Message, "timestamp"> }
  | { type: "ADD_TAG"; payload: Omit<Tag, "id"> }
  | { type: "REMOVE_TAG"; payload: string }
  | { type: "START_SEARCH" }
  | { type: "END_SEARCH" }
  | { type: "SHOW_PROPERTY_STACK" }
  | { type: "HIDE_PROPERTY_STACK" }
  | { type: "REMOVE_PROPERTY"; payload: number }
  | { type: "SET_ACTIVE_SCREEN"; payload: string | null }
  | { type: "SET_ACTIVE_PROPERTY"; payload: Property | null }
  | { type: "SET_ACTIVE_MODAL"; payload: { type: string | null; property: Property | null } }
  | { type: "VERIFY_PHONE"; payload: string }
  | { type: "LOGOUT" }

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        ],
      }
    case "ADD_TAG":
      // Only add if tag doesn't already exist
      if (state.tags.some((tag) => tag.label === action.payload.label)) {
        return state
      }
      return {
        ...state,
        tags: [
          ...state.tags,
          {
            ...action.payload,
            id: Date.now().toString(),
          },
        ],
      }
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      }
    case "START_SEARCH":
      return {
        ...state,
        isSearching: true,
      }
    case "END_SEARCH":
      return {
        ...state,
        isSearching: false,
      }
    case "SHOW_PROPERTY_STACK":
      return {
        ...state,
        showPropertyStack: true,
        properties: SAMPLE_PROPERTIES,
      }
    case "HIDE_PROPERTY_STACK":
      return {
        ...state,
        showPropertyStack: false,
      }
    case "REMOVE_PROPERTY":
      return {
        ...state,
        properties: state.properties.filter((prop) => prop.id !== action.payload),
      }
    case "SET_ACTIVE_SCREEN":
      return {
        ...state,
        activeScreen: action.payload,
      }
    case "SET_ACTIVE_PROPERTY":
      return {
        ...state,
        activeProperty: action.payload,
      }
    case "SET_ACTIVE_MODAL":
      return {
        ...state,
        activeModal: action.payload,
      }
    case "VERIFY_PHONE":
      return {
        ...state,
        isAuthenticated: true,
        phoneNumber: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        phoneNumber: null,
      }
    default:
      return state
  }
}

// Create Context
type AppContextType = {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppStateContext = createContext<AppContextType | undefined>(undefined)

// Provider Component
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}

// Custom Hook for Using Context
export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}

