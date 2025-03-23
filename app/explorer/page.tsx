"use client"
import { PropertyCard } from "../../components/PropertyCard"

// Sample property data
const SAMPLE_PROPERTY = {
  id: 1,
  image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
  location: "Avenue Victor Hugo • 16th",
  price: "€780,000",
  size: "85m²",
  rooms: "2 pieces",
  type: "Apt.",
}

export default function ExplorerPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explorer</h1>

      <div className="relative aspect-square w-full max-w-[300px] mx-auto">
        <PropertyCard
          property={SAMPLE_PROPERTY}
          onAction={(action, id) => console.log(`Action: ${action} on property ${id}`)}
        />
      </div>
    </div>
  )
}

