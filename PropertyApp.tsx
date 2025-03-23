"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatInterface from "./ChatInterface"
import PropertyCardStack from "./PropertyCardStack"
import { MessageSquare } from "lucide-react"

// Tag type definition
interface Tag {
  id: string
  type: "location" | "budget" | "rooms" | "features"
  value: string
  label: string
}

const PropertyApp: React.FC = () => {
  const [showCardStack, setShowCardStack] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  
  // Handle transition from chat to card stack
  const handleCriteriaConfirmed = (confirmedTags: Tag[]) => {
    setTags(confirmedTags)
    setShowCardStack(true)
  }
  
  // Return to chat
  const handleReturnToChat = () => {
    setShowCardStack(false)
  }
  
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-white border-b shadow-sm z-10">
        <h1 className="text-xl font-bold text-blue-800">French Property Finder</h1>
        
        {showCardStack && (
          <button 
            onClick={handleReturnToChat}
            className="flex items-center text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full"
          >
            <MessageSquare size={16} className="mr-1" />
            <span>Modifier recherche</span>
          </button>
        )}
      </header>
      
      {/* Main content with transitions */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {!showCardStack ? (
            <motion.div 
              key="chat"
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatInterface onCriteriaConfirmed={handleCriteriaConfirmed} />
            </motion.div>
          ) : (
            <motion.div 
              key="card-stack"
              className="h-full flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyCardStack />
              
              {/* Tag summary */}
              <div className="absolute top-3 left-0 right-0 flex justify-center">
                <div className="flex gap-2 bg-white/90 backdrop-blur-sm py-1.5 px-3 rounded-full shadow-sm">
                  {tags.map(tag => (
                    <div 
                      key={tag.id}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        tag.type === "location" ? "bg-blue-100 text-blue-800" :
                        tag.type === "budget" ? "bg-green-100 text-green-800" :
                        tag.type === "rooms" ? "bg-purple-100 text-purple-800" :
                        "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {tag.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default PropertyApp

