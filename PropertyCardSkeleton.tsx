"use client"

import { motion } from "framer-motion"

interface PropertyCardSkeletonProps {
  count?: number
}

export default function PropertyCardSkeleton({ count = 1 }: PropertyCardSkeletonProps) {
  return (
    <div className="relative aspect-square w-full max-w-[300px] mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-lg bg-white"
          style={{
            zIndex: count - index,
            scale: 1 - index * 0.02,
            transformOrigin: "bottom center",
            rotate: -1.5 * index,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {/* Image skeleton */}
          <div className="w-full h-3/5 bg-gray-200 animate-pulse"></div>

          {/* Content skeleton */}
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="absolute top-4 right-4 flex flex-col space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

