"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Home, Heart, Bell, Settings } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

const BottomNavigationBar: React.FC = () => {
  const pathname = usePathname()
  const { translate } = useLanguage()

  // Determine which tab is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path === "/explorer" && pathname?.startsWith("/explorer")) return true
    if (path === "/my-properties" && pathname?.startsWith("/my-properties")) return true
    if (path === "/notifications" && pathname?.startsWith("/notifications")) return true
    if (path === "/settings" && pathname?.startsWith("/settings")) return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50 px-1 shadow-md">
      {/* Search Tab */}
      <Link href="/" className="flex flex-col items-center justify-center w-1/5 py-2">
        <div className={`flex flex-col items-center ${isActive("/") ? "text-blue-600" : "text-gray-500"}`}>
          <Search size={24} />
          <span className="text-xs mt-1 text-center">{translate("navigation.search")}</span>
        </div>
      </Link>

      {/* Explorer Tab */}
      <Link href="/explorer" className="flex flex-col items-center justify-center w-1/5 py-2">
        <div className={`flex flex-col items-center ${isActive("/explorer") ? "text-blue-600" : "text-gray-500"}`}>
          <Home size={24} />
          <span className="text-xs mt-1 text-center">{translate("navigation.explorer")}</span>
        </div>
      </Link>

      {/* My Properties Tab */}
      <Link href="/my-properties" className="flex flex-col items-center justify-center w-1/5 py-2">
        <div className={`flex flex-col items-center ${isActive("/my-properties") ? "text-blue-600" : "text-gray-500"}`}>
          <Heart size={24} />
          <span className="text-xs mt-1 text-center">{translate("navigation.myProperties")}</span>
        </div>
      </Link>

      {/* Notifications Tab */}
      <Link href="/notifications" className="flex flex-col items-center justify-center w-1/5 py-2">
        <div className={`flex flex-col items-center ${isActive("/notifications") ? "text-blue-600" : "text-gray-500"}`}>
          <Bell size={24} />
          <span className="text-xs mt-1 text-center">{translate("navigation.notifications")}</span>
        </div>
      </Link>

      {/* Settings Tab */}
      <Link href="/settings" className="flex flex-col items-center justify-center w-1/5 py-2">
        <div className={`flex flex-col items-center ${isActive("/settings") ? "text-blue-600" : "text-gray-500"}`}>
          <Settings size={24} />
          <span className="text-xs mt-1 text-center">{translate("navigation.settings")}</span>
        </div>
      </Link>
    </div>
  )
}

export default BottomNavigationBar

