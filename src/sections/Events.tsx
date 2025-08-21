'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.event-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="min-h-screen bg-primary py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-accent text-center mb-16">
          Our Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card bg-black/30 rounded-lg overflow-hidden border border-accent/20"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-serif text-accent">{event.name}</h3>
                  <p className="text-white/60">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-white/80">{event.description}</p>
                  <p className="text-accent mt-2">{event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
