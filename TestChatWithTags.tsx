"use client"

import type React from "react"
import ChatInterface from "./ChatInterface"
import type { Tag } from "./TagSystem"

const TestChatWithTags: React.FC = () => {
  const handleCriteriaConfirmed = (tags: Tag[]) => {
    console.log("Criteria confirmed:", tags)
    // In a real app, this would trigger navigation to property results
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="bg-white p-4 border-b shadow-sm">
        <h1 className="text-xl font-bold text-blue-800">Property Search Assistant</h1>
      </header>

      <main className="flex-1 overflow-hidden">
        <ChatInterface onCriteriaConfirmed={handleCriteriaConfirmed} />
      </main>
    </div>
  )
}

export default TestChatWithTags

