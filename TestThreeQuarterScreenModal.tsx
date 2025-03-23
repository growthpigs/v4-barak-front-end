"use client"

import { useState } from "react"
import { Info, Phone, Share2, Globe, Star, MapPin, Calendar, Home } from "lucide-react"
import ActionButton from "./ActionButton"
import ThreeQuarterScreenModal from "./ThreeQuarterScreenModal"

export function TestThreeQuarterScreenModal() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (modalType: string) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Three-Quarter Screen Modal Test</h2>

      <div className="flex space-x-4 mb-8">
        <ActionButton icon={<Info size={24} className="text-blue-500" />} onClick={() => openModal("info")} />
        <ActionButton icon={<Phone size={24} className="text-green-500" />} onClick={() => openModal("call")} />
        <ActionButton icon={<Share2 size={24} className="text-orange-500" />} onClick={() => openModal("share")} />
        <ActionButton icon={<Globe size={24} className="text-purple-500" />} onClick={() => openModal("web")} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-700">
          Click on any of the action buttons above to open a three-quarter screen modal. The modal will slide up from
          the bottom of the screen and take up 75% of the viewport height, providing more space for detailed content.
        </p>
      </div>

      {/* Property Details Modal */}
      <ThreeQuarterScreenModal isOpen={activeModal === "info"} onClose={closeModal} title="Property Details">
        <div className="space-y-6">
          {/* Property Image Gallery */}
          <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
              alt="Property"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
            </div>
          </div>

          {/* Property Title and Price */}
          <div>
            <h3 className="text-2xl font-bold">Elegant Apartment in 16th</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin size={16} className="mr-1" />
              <span>Avenue Victor Hugo • 16th Arrondissement</span>
            </div>
            <div className="mt-2 text-xl font-semibold text-blue-600">€780,000</div>
          </div>

          {/* Property Specs */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
            <div className="text-center">
              <div className="text-gray-500 text-sm">Size</div>
              <div className="font-semibold">85m²</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-sm">Rooms</div>
              <div className="font-semibold">2 pieces</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-sm">Type</div>
              <div className="font-semibold">Apt.</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-lg mb-2">Description</h4>
            <p className="text-gray-700">
              This beautiful property is located in the heart of the 16th arrondissement, offering exceptional views and
              premium amenities. The apartment features high ceilings, hardwood floors, and large windows that provide
              plenty of natural light throughout the day.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-medium text-lg mb-2">Features</h4>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Home size={16} className="text-blue-600" />
                </div>
                <span>Elevator building</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Home size={16} className="text-blue-600" />
                </div>
                <span>24/7 concierge</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Home size={16} className="text-blue-600" />
                </div>
                <span>Balcony</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Home size={16} className="text-blue-600" />
                </div>
                <span>Renovated kitchen</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Home size={16} className="text-blue-600" />
                </div>
                <span>Parking space</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Home size={16} className="text-blue-600" />
                </div>
                <span>Storage room</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-medium text-lg mb-2">Location</h4>
            <div className="h-40 bg-gray-200 rounded-lg mb-2">
              {/* Map placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">Map View</div>
            </div>
            <p className="text-gray-700">
              Located in the prestigious 16th arrondissement, just 5 minutes from Victor Hugo metro station. The
              neighborhood offers excellent schools, high-end boutiques, and is close to Bois de Boulogne.
            </p>
          </div>

          {/* Available dates */}
          <div>
            <h4 className="font-medium text-lg mb-2">Availability</h4>
            <div className="flex items-center text-gray-700">
              <Calendar size={18} className="mr-2 text-blue-600" />
              <span>Available immediately</span>
            </div>
          </div>

          {/* Contact button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-4">Contact Agent</button>
        </div>
      </ThreeQuarterScreenModal>

      {/* Call Modal */}
      <ThreeQuarterScreenModal isOpen={activeModal === "call"} onClose={closeModal} title="Contact Agent">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Agent"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h3 className="text-2xl font-semibold mb-1">Pierre Dubois</h3>
          <p className="text-gray-500 mb-2">Senior Property Consultant</p>
          <div className="flex items-center text-yellow-500 mb-6">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-gray-600">(42 reviews)</span>
          </div>

          <div className="w-full space-y-4">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center">
              <Phone className="mr-2" size={18} />
              Call +33 01 23 45 67 89
            </button>

            <button className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg font-medium">
              Send Email
            </button>
          </div>

          <div className="mt-8 w-full">
            <h4 className="font-medium mb-3">About Pierre</h4>
            <p className="text-gray-700 mb-4">
              Pierre has been a property consultant for over 15 years, specializing in luxury properties in Paris's most
              prestigious neighborhoods. He speaks fluent English, French, and Spanish.
            </p>

            <h4 className="font-medium mb-3">Availability</h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                <div className="text-xs text-gray-500">Mon</div>
                <div className="text-xs text-gray-500">Tue</div>
                <div className="text-xs text-gray-500">Wed</div>
                <div className="text-xs text-gray-500">Thu</div>
                <div className="text-xs text-gray-500">Fri</div>
                <div className="text-xs text-gray-500">Sat</div>
                <div className="text-xs text-gray-500">Sun</div>

                <div className="bg-green-100 text-green-800 rounded py-1 text-xs">9-7</div>
                <div className="bg-green-100 text-green-800 rounded py-1 text-xs">9-7</div>
                <div className="bg-green-100 text-green-800 rounded py-1 text-xs">9-7</div>
                <div className="bg-green-100 text-green-800 rounded py-1 text-xs">9-7</div>
                <div className="bg-green-100 text-green-800 rounded py-1 text-xs">9-5</div>
                <div className="bg-gray-200 text-gray-400 rounded py-1 text-xs">-</div>
                <div className="bg-gray-200 text-gray-400 rounded py-1 text-xs">-</div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Pierre typically responds within 2 hours during business hours
              </p>
            </div>
          </div>
        </div>
      </ThreeQuarterScreenModal>

      {/* Share Modal */}
      <ThreeQuarterScreenModal isOpen={activeModal === "share"} onClose={closeModal} title="Share Property">
        <div>
          {/* Property preview */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="flex">
              <div className="w-20 h-20 bg-gray-300 rounded-md overflow-hidden mr-3">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Elegant Apartment in 16th</h3>
                <p className="text-gray-600 text-sm mt-1">€780,000 • 85m² • 2 pieces</p>
                <p className="text-gray-600 text-sm mt-1">Avenue Victor Hugo • 16th</p>
              </div>
            </div>
          </div>

          {/* Share options */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Share via</h3>
            <div className="grid grid-cols-4 gap-4">
              <button className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                  <span className="text-2xl">W</span>
                </div>
                <span className="text-xs">WhatsApp</span>
              </button>

              <button className="flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white mb-2">
                  <span className="text-2xl">M</span>
                </div>
                <span className="text-xs">Message</span>
              </button>

              <button className="flex flex-col items-center">
                <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center text-white mb-2">
                  <span className="text-2xl">E</span>
                </div>
                <span className="text-xs">Email</span>
              </button>

              <button className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center text-white mb-2">
                  <span className="text-2xl">+</span>
                </div>
                <span className="text-xs">More</span>
              </button>
            </div>
          </div>

          {/* Property link */}
          <div className="mb-8">
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

          {/* Decision circle */}
          <div>
            <h3 className="font-medium mb-2">Add to your decision circle</h3>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm mb-4">
                Create a "Cercle de Décision" to make property decisions together with friends or family. Share
                properties, comments, and vote on your favorites.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
                    P
                  </div>
                  <span>Pierre</span>
                </div>

                <div className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2">
                    S
                  </div>
                  <span>Sophie</span>
                </div>

                <div className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs mr-2">
                    +
                  </div>
                  <span>Add person</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                Create circle
              </button>
            </div>
          </div>
        </div>
      </ThreeQuarterScreenModal>

      {/* Web Modal */}
      <ThreeQuarterScreenModal isOpen={activeModal === "web"} onClose={closeModal} title="External Listing">
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/SeLoger_logo.svg/1200px-SeLoger_logo.svg.png"
              alt="SeLoger.com"
              className="h-12 mx-auto mb-4"
            />

            <div className="flex mb-4">
              <div className="w-20 h-20 bg-gray-300 rounded-md overflow-hidden mr-3">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Elegant Apartment in 16th</h3>
                <p className="text-gray-600 text-sm mt-1">€780,000 • 85m² • 2 pieces</p>
                <p className="text-gray-600 text-sm mt-1">Avenue Victor Hugo • 16th</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              This property is listed on SeLoger.com, one of France's leading real estate platforms. You'll be
              redirected to view the complete listing details.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <p>
                External websites may have different information or pricing. Always verify details with the listing
                agent.
              </p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">Open Original Listing</button>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">Other listings for this property</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                  <span>Propriétés de France</span>
                </div>
                <span className="text-blue-600">View</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                  <span>Paris Luxury Real Estate</span>
                </div>
                <span className="text-blue-600">View</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            French Property Finder is not responsible for content on external websites
          </p>
        </div>
      </ThreeQuarterScreenModal>
    </div>
  )
}

