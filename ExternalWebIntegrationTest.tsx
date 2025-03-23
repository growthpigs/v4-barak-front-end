"use client"

import type React from "react"
import { useState } from "react"
import { Globe, Info, Star } from "lucide-react"
import HalfScreenModal from "./HalfScreenModal"
import WebViewModal from "./WebViewModal"

const ExternalWebIntegrationTest: React.FC = () => {
  // Modal states
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [webModalOpen, setWebModalOpen] = useState(false)
  const [showExternalSite, setShowExternalSite] = useState(false)

  // Demo property data
  const property = {
    id: "1",
    title: "Luxury Apartment",
    address: "Avenue Victor Hugo, Paris 16th",
    price: 780000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=500&q=80",
  }

  // External website URL (in real app this would be dynamic)
  const externalUrl = "https://www.seloger.com/annonces/achat/appartement/paris-16eme-75/victor-hugo/155814693.htm"

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">External Website Integration Test</h1>

      {/* Property Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="h-48 bg-gray-300 relative">
          <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-full object-cover" />

          <div className="absolute top-4 left-4 flex items-center bg-yellow-500 text-white px-2 py-1 rounded-full">
            <Star size={16} className="mr-1" fill="currentColor" />
            <span>4/5</span>
          </div>

          {/* Action buttons */}
          <div className="absolute right-4 top-4 flex flex-col gap-3">
            <button
              onClick={() => setInfoModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <Info size={18} color="#1E40AF" />
            </button>

            <button
              onClick={() => setWebModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <Globe size={18} color="#7E22CE" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold">{property.address}</h2>
          <p className="text-gray-700">€{property.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          Click the globe icon to test the external website integration flow. First you'll see a confirmation modal,
          then the external site will appear in a WebView.
        </p>
      </div>

      {/* External Website Confirmation Modal */}
      <HalfScreenModal isOpen={webModalOpen} onClose={() => setWebModalOpen(false)} title="External Listing">
        <div className="space-y-6">
          <p className="text-gray-600">Vous êtes sur le point de visualiser l'annonce originale sur SeLoger.com.</p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-gray-600 mt-1 text-sm">Source: SeLoger.com</p>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
            onClick={() => {
              setWebModalOpen(false)
              setShowExternalSite(true)
            }}
          >
            <Globe size={18} className="mr-2" />
            Voir l'annonce
          </button>

          <p className="text-xs text-gray-500 text-center">Le contenu sera affiché dans l'application</p>
        </div>
      </HalfScreenModal>

      {/* WebView Modal for External Site */}
      <WebViewModal
        isOpen={showExternalSite}
        onClose={() => setShowExternalSite(false)}
        url={externalUrl}
        title="SeLoger.com"
      />
    </div>
  )
}

export default ExternalWebIntegrationTest

