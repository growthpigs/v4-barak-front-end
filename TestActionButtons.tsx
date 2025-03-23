"use client"
import { Info, Phone, Share2, ExternalLink, Heart, X, Star, MessageCircle } from "lucide-react"
import ActionButton from "./ActionButton"

export function TestActionButtons() {
  const handleButtonClick = (action: string) => {
    alert(`Action clicked: ${action}`)
  }

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-6">Action Buttons Test</h2>

      <div className="space-y-8">
        {/* Primary action buttons */}
        <div>
          <h3 className="text-lg font-medium mb-3">Primary Actions</h3>
          <div className="flex space-x-4">
            <ActionButton
              icon={<Info size={24} className="text-blue-500" />}
              onClick={() => handleButtonClick("info")}
            />
            <ActionButton
              icon={<Phone size={24} className="text-green-500" />}
              onClick={() => handleButtonClick("call")}
            />
            <ActionButton
              icon={<Share2 size={24} className="text-orange-500" />}
              onClick={() => handleButtonClick("share")}
            />
            <ActionButton
              icon={<ExternalLink size={24} className="text-purple-500" />}
              onClick={() => handleButtonClick("web")}
            />
          </div>
        </div>

        {/* Swipe action buttons */}
        <div>
          <h3 className="text-lg font-medium mb-3">Swipe Actions</h3>
          <div className="flex space-x-4">
            <ActionButton
              icon={<Heart size={24} className="text-white" />}
              onClick={() => handleButtonClick("like")}
              backgroundColor="bg-green-500"
            />
            <ActionButton
              icon={<X size={24} className="text-white" />}
              onClick={() => handleButtonClick("reject")}
              backgroundColor="bg-red-500"
            />
          </div>
        </div>

        {/* Custom styled buttons */}
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Styled</h3>
          <div className="flex space-x-4">
            <ActionButton
              icon={<Star size={24} className="text-yellow-500" />}
              onClick={() => handleButtonClick("favorite")}
              backgroundColor="bg-blue-900"
              className="border-2 border-yellow-400"
            />
            <ActionButton
              icon={<MessageCircle size={24} className="text-white" />}
              onClick={() => handleButtonClick("message")}
              backgroundColor="bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

