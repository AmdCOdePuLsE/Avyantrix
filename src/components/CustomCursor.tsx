'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-glow"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      
      {/* Outer circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-accent rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-glow"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />
    </>
  );
};

export default CustomCursor;
