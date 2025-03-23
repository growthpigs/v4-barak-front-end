"use client"

import type React from "react"
import PropertyList from "./PropertyList"

const TestPropertyList: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="bg-white p-4 border-b shadow-sm">
        <h1 className="text-xl font-bold text-blue-800">My Properties</h1>
      </header>

      <main className="flex-1 overflow-hidden">
        <PropertyList />
      </main>
    </div>
  )
}

export default TestPropertyList

