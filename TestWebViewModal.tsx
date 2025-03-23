"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import WebViewModal from "./WebViewModal"
import ActionButton from "./ActionButton"

export function TestWebViewModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("https://www.seloger.com")

  const websites = [
    { name: "SeLoger", url: "https://www.seloger.com" },
    { name: "LeBonCoin", url: "https://www.leboncoin.fr/recherche?category=10&real_estate_type=1" },
    { name: "PAP", url: "https://www.pap.fr/annonce/vente-appartement-paris-16e-g37785" },
  ]

  const openWebsite = (url: string, name: string) => {
    setCurrentUrl(url)
    setIsOpen(true)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-6">WebView Modal Test</h2>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-gray-700 mb-4">
          Click on any of the buttons below to open a website in the WebView modal. The modal will slide up from the
          bottom of the screen and display the website in an iframe.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">French Property Websites</h3>

        <div className="grid grid-cols-3 gap-4">
          {websites.map((site) => (
            <button
              key={site.name}
              onClick={() => openWebsite(site.url, site.name)}
              className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-2">
                <Globe size={24} className="text-blue-600" />
              </div>
              <div className="font-medium">{site.name}</div>
              <div className="text-xs text-gray-500 mt-1">View listings</div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <ActionButton
            icon={<Globe size={24} className="text-white" />}
            onClick={() => setIsOpen(true)}
            backgroundColor="bg-blue-600"
            className="px-4"
          />
        </div>
      </div>

      {/* WebView Modal */}
      <WebViewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={currentUrl}
        title={websites.find((site) => site.url === currentUrl)?.name || "External Website"}
      />
    </div>
  )
}

export default TestWebViewModal

