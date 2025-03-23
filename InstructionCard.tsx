import React from 'react';
import { motion } from 'framer-motion';

interface InstructionCardProps {
  isLoading: boolean;
  onSwipe: () => void;
  className?: string;
}

const InstructionCard: React.FC<InstructionCardProps> = ({ 
  isLoading, 
  onSwipe, 
  className = ''
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 relative ${className}`}
      onClick={isLoading ? undefined : onSwipe}
    >
      <h2 className="text-2xl font-bold mb-6">Find Your Dream Property</h2>
      
      <div className="w-56 h-56 mb-8">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#333" strokeWidth="3">
            <rect x="40" y="40" width="120" height="120" rx="8" />
            <path d="M160 100 H 190" strokeWidth="6" strokeLinecap="round" />
            <path d="M10 100 H 40" strokeWidth="6" strokeLinecap="round" />
            <path d="M170 100 l 15 -15 l 0 30 z" fill="#333" />
            <path d="M30 100 l -15 -15 l 0 30 z" fill="#333" />
          </g>
          <g transform="translate(100, 100)" textAnchor="middle">
            <text fill="#333" fontSize="14" dy="0.35em">
              Swipe
            </text>
          </g>
        </svg>
      </div>
      
      <p className="text-gray-600 text-center">
        Swipe right to save properties you like.<br/>
        Swipe left to dismiss.
      </p>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute bottom-4 right-4 flex items-center">
          <span className="mr-2 text-sm text-gray-600">Loading properties</span>
          <img 
            src="https://p129.p0.n0.cdn.zight.com/items/QwuzqkZD/60703eb1-316d-492b-b871-34e057d4b005.gif?v=1c645286732211ca2e6c23614e8f3c9f"
            alt="Loading"
            className="w-6 h-6"
          />
        </div>
      )}
      
      {!isLoading && (
        <motion.div 
          className="absolute bottom-6 w-full"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center text-blue-500 font-medium">
            Tap or swipe to continue
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InstructionCard;

