"use client"
import ChatInterface from "../ChatInterface"

export default function HomePage() {
  return (
    <div className="h-full">
      <ChatInterface onCriteriaConfirmed={() => {}} />
    </div>
  )
}

