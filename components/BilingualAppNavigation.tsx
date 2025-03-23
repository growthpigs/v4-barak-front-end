"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Settings } from "lucide-react"
import BilingualChatInterface from "./BilingualChatInterface"
import PropertyCardStack from "./PropertyCardStack"
import PropertyList from "./PropertyList"
import { useLanguage } from "../contexts/LanguageContext"

// Import the BottomNavigationBar
import BottomNavigationBar from "./BottomNavigationBar"

const BilingualAppNavigation: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"search" | "explore" | "saved" | "notifications" | "settings">("search")

  // Use language context for translations
  const { translate } = useLanguage()

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <BilingualChatInterface onCriteriaConfirmed={() => setActiveTab("explore")} />
      case "explore":
        return <PropertyCardStack />
      case "saved":
        return <PropertyList />
      case "notifications":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
            <Bell size={64} strokeWidth={1} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">{translate("notifications.empty")}</h2>
            <p>{translate("notifications.emptyMessage")}</p>
          </div>
        )
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
            <Settings size={64} strokeWidth={1} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">{translate("settings.title")}</h2>
            <p>{translate("settings.message")}</p>
          </div>
        )
      default:
        return <BilingualChatInterface onCriteriaConfirmed={() => setActiveTab("explore")} />
    }
  }

  // Get title for header based on active tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "search":
        return translate("navigation.search")
      case "explore":
        return translate("navigation.explorer")
      case "saved":
        return translate("navigation.myProperties")
      case "notifications":
        return translate("navigation.notifications")
      case "settings":
        return translate("navigation.settings")
      default:
        return "French Property Finder"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex justify-center items-center px-4 py-3 bg-white border-b shadow-sm z-10">
        <h1 className="text-xl font-bold text-blue-800">{getHeaderTitle()}</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">{renderContent()}</main>

      {/* Bottom navigation */}
      <BottomNavigationBar />
    </div>
  )
}

export default BilingualAppNavigation

