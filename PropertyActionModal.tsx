"use client"
import { Phone, Globe } from "lucide-react"
import HalfScreenModal from "./HalfScreenModal"
import { useState } from "react"
import WebViewModal from "./WebViewModal"

interface PropertyActionModalProps {
  isOpen: boolean
  onClose: () => void
  modalType: "info" | "call" | "share" | "web" | null
  property: {
    id: number
    location: string
    price: string
    size: string
    rooms: string
    type: string
    image: string
  } | null
}

export function PropertyActionModal({ isOpen, onClose, modalType, property }: PropertyActionModalProps) {
  const [showExternalSite, setShowExternalSite] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")

  if (!isOpen || !property) return null

  const modalTitles = {
    info: "Property Details",
    call: "Contact Agent",
    share: "Share Property",
    web: "Original Listing",
  }

  const title = modalType ? modalTitles[modalType] : ""

  return (
    <HalfScreenModal isOpen={isOpen} onClose={onClose} title={title}>
      {modalType === "info" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Price</div>
              <div className="font-semibold">{property.price}</div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Size</div>
              <div className="font-semibold">{property.size}</div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Rooms</div>
              <div className="font-semibold">{property.rooms}</div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Type</div>
              <div className="font-semibold">{property.type}</div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">
              Beautiful apartment located in the prestigious {property.location}. This property features high ceilings,
              hardwood floors, and large windows that provide plenty of natural light.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Elevator building</li>
              <li>24/7 concierge</li>
              <li>Balcony with Eiffel Tower view</li>
              <li>Recently renovated kitchen</li>
              <li>Secure parking space</li>
            </ul>
          </div>
        </div>
      )}

      {modalType === "call" && (
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Agent"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h3 className="text-xl font-semibold mb-1">Pierre Dubois</h3>
          <p className="text-gray-500 mb-6">Senior Property Consultant</p>

          <div className="w-full space-y-4">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center">
              <Phone className="mr-2" size={18} />
              Call +33 01 23 45 67 89
            </button>

            <button className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg font-medium">
              Send Email
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center">Available Monday to Friday, 9:00 AM - 7:00 PM</p>
        </div>
      )}

      {modalType === "share" && (
        <div>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Share via</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <span className="text-xl">📱</span>
                </div>
                <span className="text-xs">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <span className="text-xl">✉️</span>
                </div>
                <span className="text-xs">Email</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <span className="text-xl">💬</span>
                </div>
                <span className="text-xs">SMS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <span className="text-xl">🔗</span>
                </div>
                <span className="text-xs">Copy Link</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Property Link</h3>
            <div className="flex">
              <input
                type="text"
                value={`https://bkok.fr/property/${property.id}`}
                readOnly
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50"
              />
              <button className="bg-blue-500 text-white px-4 rounded-r-lg">Copy</button>
            </div>
          </div>
        </div>
      )}

      {modalType === "web" && (
        <div className="text-center">
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/SeLoger_logo.svg/1200px-SeLoger_logo.svg.png"
              alt="SeLoger.com"
              className="h-12 mx-auto mb-4"
            />
            <p className="text-gray-700 mb-4">
              This property is listed on SeLoger.com, one of France's leading real estate platforms.
            </p>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
            onClick={() => {
              // Set the external URL based on property ID
              setExternalUrl(
                `https://www.seloger.com/annonces/achat/appartement/paris-16eme-75/victor-hugo/${property.id}`,
              )
              setShowExternalSite(true)
              onClose() // Close the current modal
            }}
          >
            <Globe size={18} className="mr-2" />
            View Original Listing
          </button>

          <p className="mt-4 text-sm text-gray-500">The content will be displayed within the app</p>
        </div>
      )}

      {/* WebView Modal */}
      <WebViewModal
        isOpen={showExternalSite}
        onClose={() => setShowExternalSite(false)}
        url={externalUrl}
        title="SeLoger.com"
      />
    </HalfScreenModal>
  )
}

