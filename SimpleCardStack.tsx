import React from "react";
import { motion } from "framer-motion";

interface SimpleCardStackProps {
  children: React.ReactNode[];
  onCardRemove?: (index: number) => void;
  isLoading?: boolean;
}

const SimpleCardStack: React.FC<SimpleCardStackProps> = ({
  children,
  onCardRemove,
  isLoading = false,
}) => {
  // Calculate stacking effect for each card
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {React.Children.map(children, (child, index) => {
        // Apply stacking effect: rotation, scale, opacity
        const isFirstCard = index === 0;
        
        // Calculate transforms for stacking effect
        const cardRotation = index > 0 ? -5 + (index * 2) : 0;
        const cardScale = Math.max(1 - (index * 0.05), 0.85);
        const yOffset = index * 8;
        
        return (
          <motion.div
            className="absolute w-full" 
            style={{
              zIndex: children.length - index,
              transformOrigin: "bottom center"
            }}
            initial={{ scale: cardScale, y: yOffset, rotate: cardRotation, opacity: isFirstCard ? 1 : 0.7 }}
            animate={{ scale: cardScale, y: yOffset, rotate: cardRotation, opacity: isFirstCard ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {/* Pass isActive prop only to the first card */}
            {React.cloneElement(child as React.ReactElement, {
              isActive: isFirstCard && !isLoading,
              onSwipeLeft: isFirstCard ? () => onCardRemove && onCardRemove(index) : undefined,
              onSwipeRight: isFirstCard ? () => onCardRemove && onCardRemove(index) : undefined,
            })}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SimpleCardStack;

