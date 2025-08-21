'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub } from 'react-icons/fa';
import { projects, socialLinks } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
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
      id="projects"
      className="min-h-screen bg-primary py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-accent text-center mb-16">
          Our Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              className="project-card bg-black/30 rounded-lg overflow-hidden border border-accent/20"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-serif text-accent">{project.name}</h3>
                <p className="text-white/80">{project.description}</p>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="flex-1 group relative overflow-hidden bg-accent/90 text-primary py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 text-center"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-sm">
                      View Project
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/30 p-2 rounded-lg text-white/60 hover:text-accent transition-colors hover:bg-black/50"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-primary px-8 py-3 rounded-full font-bold hover:bg-accent/90 transition-colors"
          >
            <FaGithub size={24} />
            <span>Visit Our GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
