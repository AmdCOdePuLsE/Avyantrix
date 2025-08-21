'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamData } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-primary py-20 px-4"
    >
      <div
        ref={textRef}
        className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-accent">
            About Team Avyantrix
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            {teamData.description}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-black/30 p-6 rounded-lg border border-accent/20">
            <h3 className="text-2xl font-serif text-accent mb-4">Our Mission</h3>
            <p className="text-white/80">{teamData.mission}</p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-accent/20">
            <h3 className="text-2xl font-serif text-accent mb-4">Our Vision</h3>
            <p className="text-white/80">{teamData.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
