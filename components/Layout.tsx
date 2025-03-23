"use client"
import type React from "react"
import type { ReactNode } from "react"
import BottomNavigationBar from "./BottomNavigationBar"

interface LayoutProps {
  children: ReactNode
  hideNavBar?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavBar = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow pb-16">{children}</main>
      {!hideNavBar && <BottomNavigationBar />}
    </div>
  )
}

export default Layout

