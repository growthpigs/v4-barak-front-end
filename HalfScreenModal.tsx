"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence, PanInfo, useMotionValue } from "framer-motion"
import { X } from "lucide-react"

interface HalfScreenModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const HalfScreenModal: React.FC<HalfScreenModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  // Motion values for drag gesture
  const y = useMotionValue(0)
  const dragRef = useRef<HTMLDivElement>(null)
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Handle drag-to-dismiss gesture
  const handleDrag = (info: PanInfo) => {
    // Only allow dragging downward
    if (info.offset.y < 0) return
  }

  const handleDragEnd = (info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose()
    } else {
      // Reset position if not dismissed
      y.set(0)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={dragRef}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={(_, info) => handleDrag(info)}
            onDragEnd={(_, info) => handleDragEnd(info)}
            style={{ y }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-lg"
            initial={{ y: "100%" }}
            animate={{ 
              y: 0,
              transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 300, 
                mass: 0.8 
              }
            }}
            exit={{ 
              y: "100%",
              transition: { 
                duration: 0.3, 
                ease: "easeInOut" 
              }
            }}
            style={{ 
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              height: "50vh",
              y
            }}
          >
            {/* Drag handle */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div 
              className="p-6 overflow-y-auto" 
              style={{ 
                height: "calc(50vh - 100px - env(safe-area-inset-bottom, 0px))"
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default HalfScreenModal

