"use client"

import { useState } from "react"
import { Info, Phone, Share2, ExternalLink } from "lucide-react"
import ActionButton from "./ActionButton"
import HalfScreenModal from "./HalfScreenModal"

export function TestHalfScreenModal() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (modalType: string) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Half Screen Modal Test</h2>

      <div className="flex space-x-4 mb-8">
        <ActionButton icon={<Info size={24} className="text-blue-500" />} onClick={() => openModal("info")} />
        <ActionButton icon={<Phone size={24} className="text-green-500" />} onClick={() => openModal("call")} />
        <ActionButton icon={<Share2 size={24} className="text-orange-500" />} onClick={() => openModal("share")} />
        <ActionButton icon={<ExternalLink size={24} className="text-purple-500" />} onClick={() => openModal("web")} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-700">
          Click on any of the action buttons above to open a half-screen modal. The modal will slide up from the bottom
          of the screen.
        </p>
      </div>

      {/* Info Modal */}
      <HalfScreenModal isOpen={activeModal === "info"} onClose={closeModal} title="Property Details">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Price</div>
              <div className="font-semibold">€780,000</div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Size</div>
              <div className="font-semibold">85m²</div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Rooms</div>
              <div className="font-semibold">2 pieces</div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-sm text-gray-500">Type</div>
              <div className="font-semibold">Apt.</div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">
              Beautiful apartment located in the prestigious 16th arrondissement of Paris. This property features high
              ceilings, hardwood floors, and large windows that provide plenty of natural light.
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
      </HalfScreenModal>

      {/* Call Modal */}
      <HalfScreenModal isOpen={activeModal === "call"} onClose={closeModal} title="Contact Agent">
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
      </HalfScreenModal>

      {/* Share Modal */}
      <HalfScreenModal isOpen={activeModal === "share"} onClose={closeModal} title="Share Property">
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
                value="https://bkok.fr/property/12345"
                readOnly
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50"
              />
              <button className="bg-blue-500 text-white px-4 rounded-r-lg">Copy</button>
            </div>
          </div>
        </div>
      </HalfScreenModal>

      {/* Web Modal */}
      <HalfScreenModal isOpen={activeModal === "web"} onClose={closeModal} title="Original Listing">
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

          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium">Open Original Listing</button>

          <p className="mt-4 text-sm text-gray-500">You will be redirected to the external website</p>
        </div>
      </HalfScreenModal>
    </div>
  )
}

