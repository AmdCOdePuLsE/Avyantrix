'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { teamData } from '@/data';
import { FaRocket, FaUsers } from 'react-icons/fa';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary/30 to-primary" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center container mx-auto px-4"
      >
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1.5
          }}
          className="relative w-full max-w-[70vw] md:max-w-[60vw] h-[35vh] md:h-[40vh] mx-auto mb-8"
        >
          <Image
            src="/images/avyantrix.png"
            alt={teamData.name}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <p className="text-xl md:text-2xl text-white mb-8">
          {teamData.tagline}
        </p>
        
        {/* Button Container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:bg-accent/90 transition-colors shadow-lg"
          >
            <span className="flex items-center">
              <FaRocket className="mr-2" />
              Discover More
            </span>
          </motion.button>

          {/* Classy Animated Member Button */}
          <Link href="/member">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1.2,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden bg-black text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, #dc2626, #000, #dc2626, #000)",
                    "linear-gradient(225deg, #dc2626, #000, #dc2626, #000)",
                    "linear-gradient(45deg, #dc2626, #000, #dc2626, #000)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ padding: '2px' }}
              >
                <div className="w-full h-full bg-black rounded-full" />
              </motion.div>
              
              {/* Inner Red Glow */}
              <div className="absolute inset-1 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Subtle Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                animate={{ 
                  x: ['-100%', '100%']
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center text-white">
                <motion.span
                  className="mr-2"
                  animate={{ 
                    color: ['#ffffff', '#dc2626', '#ffffff']
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <FaUsers />
                </motion.span>
                <motion.span
                  className="font-medium"
                  whileHover={{
                    textShadow: "0 0 8px rgba(220, 38, 38, 0.8)"
                  }}
                >
                  Join Us
                </motion.span>
              </span>
              
              {/* Corner Accents */}
              <motion.div
                className="absolute top-1 right-1 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute bottom-1 left-1 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default Hero;
