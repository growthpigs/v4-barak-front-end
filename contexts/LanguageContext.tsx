"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"

interface LanguageContextProps {
  translate: (key: string) => string
}

// Basic translations
const translations = {
  navigation: {
    search: "Recherche",
    explorer: "Explorer",
    myProperties: "Mes Biens",
    notifications: "Notifs",
    settings: "Réglages",
  },
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const translate = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      if (!value || !value[k]) return key
      value = value[k]
    }

    return value
  }

  return <LanguageContext.Provider value={{ translate }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

