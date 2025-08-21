'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '@/data';
import TeamMember from '@/components/TeamMember';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-member', {
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
      id="team"
      className="min-h-screen bg-primary py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-accent text-center mb-16">
          Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member">
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
