"use client"

import type React from "react"
import { useState } from "react"
import { Info, Phone, Share2, Globe } from "lucide-react"
import ActionButton from "./ActionButton"
import HalfScreenModal from "./HalfScreenModal"

const TestPropertyCardActions: React.FC = () => {
  // State for modals
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [callModalOpen, setCallModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [webModalOpen, setWebModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Property Card Actions Test</h1>

      <div className="relative w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Property image */}
          <div className="h-64 bg-gray-300 relative">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
              alt="Property"
              className="w-full h-full object-cover"
            />

            {/* Rating badge */}
            <div className="absolute top-4 left-4 flex items-center bg-yellow-500 text-white px-2 py-1 rounded-full">
              <span className="mr-1">⭐</span>
              <span>4/5</span>
            </div>
          </div>

          {/* Property info */}
          <div className="p-4">
            <h2 className="text-xl font-bold">Avenue Victor Hugo • 16th</h2>
            <p className="text-gray-700">€780,000 | 85m² | 2 pieces | Apt.</p>
          </div>

          {/* Action buttons */}
          <div className="absolute right-4 top-1/3 flex flex-col gap-4">
            <ActionButton icon={<Info size={20} className="text-blue-700" />} onClick={() => setInfoModalOpen(true)} />
            <ActionButton
              icon={<Phone size={20} className="text-green-700" />}
              onClick={() => setCallModalOpen(true)}
            />
            <ActionButton
              icon={<Share2 size={20} className="text-orange-700" />}
              onClick={() => setShareModalOpen(true)}
            />
            <ActionButton
              icon={<Globe size={20} className="text-purple-700" />}
              onClick={() => setWebModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">Click on the action buttons to open modals</div>

      {/* Modals */}
      <HalfScreenModal isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)} title="Property Details">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Elegant Apartment in 16th</h3>
          <div>
            <h4 className="font-medium text-gray-700">Description</h4>
            <p className="mt-1">
              This beautiful property is located in the heart of the 16th arrondissement, offering exceptional views and
              premium amenities.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Features</h4>
            <ul className="mt-1 list-disc list-inside">
              <li>Recently renovated</li>
              <li>High ceilings</li>
              <li>Parquet flooring</li>
              <li>South-facing balcony</li>
              <li>Secure building with elevator</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Location</h4>
            <p className="mt-1">
              5 minutes from Victor Hugo metro station, surrounded by shops, restaurants and high-end boutiques.
            </p>
          </div>
        </div>
      </HalfScreenModal>

      <HalfScreenModal isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} title="Contact Agent">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/42.jpg"
                alt="Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">Marie Dubois</h3>
              <p className="text-gray-600">Property Agent</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
              <Phone size={18} className="mr-2" />
              Call Agent
            </button>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
              <span className="mr-2">💬</span> Send Message
            </button>
          </div>

          <div className="text-sm text-gray-500 text-center">Agents typically respond within 2 hours</div>
        </div>
      </HalfScreenModal>

      <HalfScreenModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} title="Share Property">
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">Elegant Apartment in 16th</h3>
            <p className="text-gray-600 mt-1">€780,000 • 85m²</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-1">
                <span className="text-2xl">W</span>
              </div>
              <span className="text-xs">WhatsApp</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-1">
                <span className="text-2xl">M</span>
              </div>
              <span className="text-xs">Message</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white mb-1">
                <span className="text-2xl">E</span>
              </div>
              <span className="text-xs">Email</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white mb-1">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-xs">More</span>
            </button>
          </div>

          <div>
            <h4 className="font-medium mb-2">Add to your decision circle</h4>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-sm">
                Create a "Cercle de Décision" to make property decisions together with friends or family.
              </p>
              <button className="mt-2 text-blue-600 font-semibold text-sm">Create circle</button>
            </div>
          </div>
        </div>
      </HalfScreenModal>

      <HalfScreenModal isOpen={webModalOpen} onClose={() => setWebModalOpen(false)} title="External Listing">
        <div className="space-y-6">
          <p className="text-gray-600">You're about to visit an external website to see the original listing.</p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">Elegant Apartment in 16th</h3>
            <p className="text-gray-600 mt-1 text-sm">Listed on SeLoger.com</p>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">Visit Website</button>

          <p className="text-xs text-gray-500 text-center">
            French Property Finder is not responsible for content on external websites
          </p>
        </div>
      </HalfScreenModal>
    </div>
  )
}

export default TestPropertyCardActions

