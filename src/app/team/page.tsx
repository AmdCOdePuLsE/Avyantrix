'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaGithub, FaLinkedin, FaInstagram, FaPlus, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import TeamMember from '@/components/TeamMember';
import { teamData } from '@/data';

// Temporary interface - will be replaced with Supabase types
interface TeamMemberData {
  id: number;
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
  joinedDate?: string;
  isActive?: boolean;
}

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Mock data - will be replaced with Supabase data
  useEffect(() => {
    // Simulate loading from database
    setTimeout(() => {
      setTeamMembers([
        {
          id: 1,
          name: "Debsmit Ghosh",
          role: "AI / ML Specialist",
          image: "/placeholder-profile.jpg",
          bio: "Tech visionary with 8+ years of experience in leading innovative projects",
          skills: ["Machine Learning", "Python", "TensorFlow", "Computer Vision"],
          social: {
            github: "https://github.com/debsmit",
            linkedin: "https://linkedin.com/in/debsmit",
            instagram: "https://instagram.com/debsmit",
          },
          joinedDate: "2023-01-15",
          isActive: true,
        },
        {
          id: 2,
          name: "Sobhan Roy",
          role: "Frontend Developer",
          image: "/sobhan_profile.png",
          bio: "Passionate developer with a focus on building scalable web applications.",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          social: {
            github: "https://github.com/sobhan",
            linkedin: "https://linkedin.com/in/sobhan",
            instagram: "https://instagram.com/sobhan",
          },
          joinedDate: "2023-02-20",
          isActive: true,
        },
        {
          id: 3,
          name: "Ujan Das",
          role: "Hardware Engineer",
          image: "/placeholder-profile.jpg",
          bio: "Hardware specialist focused on IoT and embedded systems",
          skills: ["IoT", "Arduino", "Raspberry Pi", "Circuit Design"],
          social: {
            github: "https://github.com/ujan",
            linkedin: "https://linkedin.com/in/ujan",
          },
          joinedDate: "2023-03-10",
          isActive: true,
        },
        {
          id: 4,
          name: "Anuksha Ganguly",
          role: "UI/UX Designer",
          image: "/placeholder-profile.jpg",
          bio: "Creative designer passionate about crafting intuitive and beautiful user experiences",
          skills: ["UI Design", "UX Research", "Figma", "Motion Design"],
          social: {
            github: "https://github.com/anuksha",
            linkedin: "https://linkedin.com/in/anuksha",
            instagram: "https://instagram.com/anuksha",
          },
          joinedDate: "2023-04-05",
          isActive: true,
        },
        {
          id: 5,
          name: "Ayushman Das",
          role: "Full Stack Developer",
          image: "/placeholder-profile.jpg",
          bio: "System architect specializing in scalable backend solutions and microservices",
          skills: ["Node.js", "React", "PostgreSQL", "Docker"],
          social: {
            github: "https://github.com/ayushman",
            linkedin: "https://linkedin.com/in/ayushman",
          },
          joinedDate: "2023-05-12",
          isActive: true,
        },
        {
          id: 6,
          name: "Annick Das",
          role: "DevOps Engineer",
          image: "/placeholder-profile.jpg",
          bio: "Infrastructure expert ensuring smooth deployment and operation of our systems",
          skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
          social: {
            github: "https://github.com/annick",
            linkedin: "https://linkedin.com/in/annick",
          },
          joinedDate: "2023-06-18",
          isActive: true,
        },
        {
          id: 7,
          name: "Sujal Kushwaha",
          role: "Security Specialist",
          image: "/placeholder-profile.jpg",
          bio: "Cybersecurity expert ensuring the safety and integrity of our systems",
          skills: ["Security Architecture", "Penetration Testing", "Cryptography", "Risk Assessment"],
          social: {
            github: "https://github.com/sujal",
            linkedin: "https://linkedin.com/in/sujal",
          },
          joinedDate: "2023-07-25",
          isActive: true,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary/20 to-primary">
      <AnimatedBackground />
      <Navbar />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              href="/"
              className="inline-flex items-center text-accent hover:text-accent/80 transition-colors mb-8 group"
            >
              <motion.div
                whileHover={{ x: -5 }}
                className="flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Home
              </motion.div>
            </Link>
            
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"
              >
                Meet Our Team
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 mb-4 max-w-3xl mx-auto"
              >
                {teamData.tagline}
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/70 max-w-4xl mx-auto leading-relaxed"
              >
                A collective of passionate engineers, designers, and innovators working together to build the future through cutting-edge technology.
              </motion.p>
            </div>
          </motion.div>

          {/* Authentication Section - Placeholder for Supabase Auth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Team Member Portal</h3>
              
              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
                    >
                      <FaSignInAlt />
                      Access Dashboard
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10 px-6 py-3 rounded-lg font-medium transition-colors"
                    onClick={() => {
                      // TODO: Implement Supabase Auth
                      alert('Team member registration will be implemented here');
                    }}
                  >
                    <FaUserPlus />
                    Join Team
                  </motion.button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-green-400 font-medium">✓ Authenticated as Team Member</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      onClick={() => {
                        // TODO: Navigate to profile editing
                        alert('Profile editing will be implemented here');
                      }}
                    >
                      <FaPlus />
                      Update My Profile
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      onClick={() => {
                        localStorage.removeItem('isAuthenticated');
                        setIsAuthenticated(false);
                      }}
                    >
                      <FaSignInAlt />
                      Logout
                    </motion.button>
                  </div>
                </div>
              )}
              
              <p className="text-white/60 text-sm text-center mt-4">
                Team members can login to update their profiles and information
              </p>
            </div>
          </motion.div>

          {/* Team Members Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full"
              />
              <p className="text-white/70 mt-4">Loading team members...</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {teamMembers.map((member) => (
                <motion.div key={member.id} variants={itemVariants}>
                  <TeamMember member={member} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                {teamMembers.filter(m => m.isActive).length}
              </div>
              <div className="text-white/70">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                15+
              </div>
              <div className="text-white/70">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                8
              </div>
              <div className="text-white/70">Hackathons Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                3+
              </div>
              <div className="text-white/70">Years Active</div>
            </div>
          </motion.div>

          {/* Team Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-red-500/10">
              <h3 className="text-2xl font-serif text-red-400 mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed max-w-4xl mx-auto">
                {teamData.mission}
              </p>
            </div>
          </motion.div>

          {/* Join Us CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-12 text-center"
          >
            <Link href="/member">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                Want to Join Our Team?
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TeamPage;
