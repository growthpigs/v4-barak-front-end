"use client"

import type React from "react"
import { motion } from "framer-motion"

interface ActionButtonProps {
  icon: React.ReactNode
  onClick: (e: React.MouseEvent) => void
  backgroundColor?: string
  className?: string
}

export default function ActionButton({
  icon,
  onClick,
  backgroundColor = "bg-white",
  className = "",
}: ActionButtonProps) {
  return (
    <motion.button
      className={`w-12 h-12 rounded-full ${backgroundColor} shadow-md flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  )
}

