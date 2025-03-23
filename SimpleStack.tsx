"use client"

import { useState } from "react"
import { SimpleCard } from "./SimpleCard"

export function SimpleStack() {
  const [cards, setCards] = useState([
    { id: 1, color: "#3490dc", title: "Swipe Card 1" },
    { id: 2, color: "#38a169", title: "Swipe Card 2" },
    { id: 3, color: "#e53e3e", title: "Swipe Card 3" },
    { id: 4, color: "#805ad5", title: "Swipe Card 4" },
  ])

  const handleSwipe = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  return (
    <div className="relative aspect-square w-full max-w-[300px] mx-auto">
      {cards.map((card, index) => (
        <SimpleCard
          key={card.id}
          color={card.color}
          title={card.title}
          index={index}
          onSwipe={() => handleSwipe(card.id)}
        />
      ))}
    </div>
  )
}

