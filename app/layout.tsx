import type React from "react"
import { LanguageProvider } from "../contexts/LanguageContext"
import BottomNavigationBar from "../components/BottomNavigationBar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow pb-16">{children}</main>
            <BottomNavigationBar />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
