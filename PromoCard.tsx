import React from 'react';
import { motion } from 'framer-motion';

interface PromoCardProps {
  onSignUp: () => void;
  onSwipe: () => void;
  className?: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ 
  onSignUp, 
  onSwipe,
  className = '' 
}) => {
  return (
    <div className={`bg-blue-600 rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-white">
          Ready to find more properties?
        </h2>
        
        <p className="text-xl mb-10 text-blue-100">
          Create an account to save your favorites and get personalized recommendations.
        </p>
        
        <motion.button
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg"
          whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
          whileTap={{ scale: 0.95 }}
          onClick={onSignUp}
        >
          Sign up with phone
        </motion.button>
        
        <p className="mt-8 text-blue-200 text-sm">
          Or swipe to start over
        </p>
      </motion.div>
    </div>
  );
};

export default PromoCard;

