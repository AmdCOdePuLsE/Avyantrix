'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const TeamMember = ({
  name,
  role,
  image,
  bio,
  skills,
  social,
}: TeamMemberProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-black/30 rounded-lg overflow-hidden border border-accent/20"
    >
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-serif text-accent">{name}</h3>
          <p className="text-white/60">{role}</p>
        </div>

        <p className="text-white/80">{bio}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-accent/80">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-accent/10 text-accent rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors"
            >
              <FaGithub size={20} />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
