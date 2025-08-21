'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages } from '@/data';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return galleryImages.length - 1;
      if (nextIndex >= galleryImages.length) return 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="min-h-screen bg-primary py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-accent text-center mb-16">
          Gallery
        </h2>

        <div className="relative h-[600px] overflow-hidden rounded-lg">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full"
            >
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-lg">
                    {galleryImages[currentIndex].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={() => paginate(-1)}
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={() => paginate(1)}
          >
            <FiChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-accent' : 'bg-white/50'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
