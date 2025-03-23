import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';

interface SimpleTinderCardProps {
  onSwipe: (direction: 'left' | 'right') => void;
  children: React.ReactNode;
  className?: string;
}

const SimpleTinderCard: React.FC<SimpleTinderCardProps> = ({ onSwipe, children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Motion values for dragging
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Calculated values
  const rotate = useMotionValue(0);
  
  // Transform opacity for like/dislike indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);
  
  // Heart animations
  const [showLikeHeart, setShowLikeHeart] = useState(false);
  const [showDislikeHeart, setShowDislikeHeart] = useState(false);
  
  // Track if we're currently dragging to prevent multiple triggers
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const calculateRotationBasedOnDrag = (info: PanInfo) => {
    // Get card dimensions
    if (!cardRef.current) return 0;
    const cardHeight = cardRef.current.offsetHeight;
    
    // Calculate rotation based on drag position and velocity
    // Drag position relative to center of card affects rotation angle
    // Higher drag distance = more rotation
    const dragDistanceFromCenter = info.point.y - cardHeight / 2;
    const rotationFactor = 0.1; // Adjust for more/less rotation sensitivity
    
    // Combine horizontal drag with vertical position for natural pivoting feel
    let rotation = (info.offset.x * rotationFactor) * (1 + Math.abs(dragDistanceFromCenter / cardHeight));
    
    // Limit maximum rotation
    rotation = Math.min(Math.max(rotation, -45), 45);
    
    return rotation;
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    
    // Calculate and set rotation during drag for natural pivoting feel
    const newRotation = calculateRotationBasedOnDrag(info);
    rotate.set(newRotation);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100; // Minimum drag distance for swipe
    const velocity = 0.5; // Minimum velocity for swipe
    
    // Calculate if swipe action should be taken
    const isSwipingRight = info.offset.x > threshold && info.velocity.x > velocity;
    const isSwipingLeft = info.offset.x < -threshold && info.velocity.x < -velocity;
    
    // Calculate final rotation for exit animation
    const exitRotation = calculateRotationBasedOnDrag(info);
    
    if (isSwipingRight) {
      // Calculate exit point based on swipe velocity and direction
      const exitX = window.innerWidth + 200;
      const speedFactor = Math.min(Math.max(info.velocity.x / 2, 1), 3);
      const arcY = -150 * speedFactor; // Higher velocity = higher arc
      
      // Show heart animation in center
      setShowLikeHeart(true);
      
      // Execute exit animation with curved path
      controls.start({ 
        x: exitX,
        y: arcY,
        rotate: exitRotation + 5, // Add a bit more rotation for effect
        transition: { 
          type: 'spring',
          duration: 0.4,
          bounce: 0.2,
          mass: 0.8
        }
      });
      
      setTimeout(() => {
        onSwipe('right');
        setShowLikeHeart(false);
      }, 400);
    } else if (isSwipingLeft) {
      // Calculate exit point based on swipe velocity and direction
      const exitX = -window.innerWidth - 200;
      const speedFactor = Math.min(Math.max(Math.abs(info.velocity.x) / 2, 1), 3);
      const arcY = -150 * speedFactor; // Higher velocity = higher arc
      
      // Show broken heart animation in center
      setShowDislikeHeart(true);
      
      // Execute exit animation with curved path
      controls.start({ 
        x: exitX,
        y: arcY,
        rotate: exitRotation - 5, // Add a bit more rotation for effect
        transition: { 
          type: 'spring',
          duration: 0.4,
          bounce: 0.2,
          mass: 0.8
        }
      });
      
      setTimeout(() => {
        onSwipe('left');
        setShowDislikeHeart(false);
      }, 400);
    } else {
      // Return to center if not swiped enough
      controls.start({ 
        x: 0, 
        y: 0, 
        rotate: 0, 
        transition: { 
          type: 'spring', 
          stiffness: 500, 
          damping: 30 
        } 
      });
    }
  };

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        className={`relative touch-none ${className || ''}`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate }}
        whileTap={{ scale: 1.02 }}
      >
        {children}
        
        {/* Like and Dislike indicators that appear during drag */}
        <motion.div 
          className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-2xl transform rotate-12"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>
        
        <motion.div 
          className="absolute top-8 left-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-2xl transform -rotate-12"
          style={{ opacity: dislikeOpacity }}
        >
          NOPE
        </motion.div>
      </motion.div>
      
      {/* Centered heart animations */}
      {showLikeHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://p129.p0.n0.cdn.zight.com/items/nOurdnR1/dda6975b-4cbd-4ee4-b6a0-fdb4e40877ed.svg?v=b8d7727135f3ba2efdedc7a91c06588a" 
              alt="Like" 
              className="w-32 h-32"
            />
          </motion.div>
        </div>
      )}
      
      {showDislikeHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://p129.p0.n0.cdn.zight.com/items/6qupKPZb/f43dadd4-28a0-497b-978e-95211e258a71.svg?v=516e7098d6fc59cf68466fa4ce4da63f" 
              alt="Nope" 
              className="w-32 h-32"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SimpleTinderCard;

