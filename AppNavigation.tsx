"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Home, Heart, Bell, Settings } from "lucide-react"
import ChatInterface from "./ChatInterface"
import PropertyCardStack from "./PropertyCardStack"
import PropertyList from "./PropertyList"

const AppNavigation: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"search" | "explore" | "saved" | "notifications" | "settings">("search")

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <ChatInterface onCriteriaConfirmed={() => setActiveTab("explore")} />
      case "explore":
        return <PropertyCardStack />
      case "saved":
        return <PropertyList />
      case "notifications":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
            <Bell size={64} strokeWidth={1} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">No Notifications</h2>
            <p>We'll let you know when there are updates about your saved properties.</p>
          </div>
        )
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
            <Settings size={64} strokeWidth={1} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Settings</h2>
            <p>Account settings and preferences will appear here.</p>
          </div>
        )
      default:
        return <ChatInterface onCriteriaConfirmed={() => setActiveTab("explore")} />
    }
  }

  // Get title for header based on active tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "search":
        return "Recherche"
      case "explore":
        return "Explorer"
      case "saved":
        return "Mes Biens"
      case "notifications":
        return "Notifications"
      case "settings":
        return "Réglages"
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
      <nav className="bg-white border-t shadow-sm">
        <div
          className="flex justify-around items-center h-16"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <button
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => setActiveTab("search")}
          >
            <Search size={24} className={activeTab === "search" ? "text-blue-600" : "text-gray-500"} />
            <span className={`text-xs mt-1 ${activeTab === "search" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Recherche
            </span>
            {activeTab === "search" && (
              <motion.div
                className="absolute bottom-0 w-1/5 h-0.5 bg-blue-600"
                layoutId="navIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ left: "0%" }}
              />
            )}
          </button>

          <button
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => setActiveTab("explore")}
          >
            <Home size={24} className={activeTab === "explore" ? "text-blue-600" : "text-gray-500"} />
            <span className={`text-xs mt-1 ${activeTab === "explore" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Explorer
            </span>
            {activeTab === "explore" && (
              <motion.div
                className="absolute bottom-0 w-1/5 h-0.5 bg-blue-600"
                layoutId="navIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ left: "20%" }}
              />
            )}
          </button>

          <button
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => setActiveTab("saved")}
          >
            <Heart size={24} className={activeTab === "saved" ? "text-blue-600" : "text-gray-500"} />
            <span className={`text-xs mt-1 ${activeTab === "saved" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Mes Biens
            </span>
            {activeTab === "saved" && (
              <motion.div
                className="absolute bottom-0 w-1/5 h-0.5 bg-blue-600"
                layoutId="navIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ left: "40%" }}
              />
            )}
          </button>

          <button
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={24} className={activeTab === "notifications" ? "text-blue-600" : "text-gray-500"} />
            <span
              className={`text-xs mt-1 ${activeTab === "notifications" ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              Notifs
            </span>
            {activeTab === "notifications" && (
              <motion.div
                className="absolute bottom-0 w-1/5 h-0.5 bg-blue-600"
                layoutId="navIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ left: "60%" }}
              />
            )}
          </button>

          <button
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={24} className={activeTab === "settings" ? "text-blue-600" : "text-gray-500"} />
            <span
              className={`text-xs mt-1 ${activeTab === "settings" ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              Réglages
            </span>
            {activeTab === "settings" && (
              <motion.div
                className="absolute bottom-0 w-1/5 h-0.5 bg-blue-600"
                layoutId="navIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ left: "80%" }}
              />
            )}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default AppNavigation

