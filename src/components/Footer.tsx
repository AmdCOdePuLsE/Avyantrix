'use client';

import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { socialLinks } from '@/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-2xl font-serif text-accent">Avyantrix</div>

          <div className="flex space-x-6">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          <div className="text-white/60 text-sm">
            © {currentYear} Team Avyantrix. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
