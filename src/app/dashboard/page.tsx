'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaTasks, FaFolder, FaSignOutAlt, FaHome } from 'react-icons/fa';
import Link from 'next/link';

// Dashboard components
import ProfileSection from '@/components/dashboard/ProfileSection';
import TaskSection from '@/components/dashboard/TaskSection';
import FilesSection from '@/components/dashboard/FilesSection';

type ActiveSection = 'profile' | 'tasks' | 'files';

const Dashboard = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedTeamId = localStorage.getItem('teamId');
    
    if (authStatus !== 'true') {
      router.push('/login');
      return;
    }
    
    setIsAuthenticated(true);
    setTeamId(storedTeamId || '');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('teamId');
    router.push('/');
  };

  const navigationItems = [
    {
      id: 'profile' as ActiveSection,
      label: 'Profile',
      icon: FaUser,
      description: 'Update your profile information'
    },
    {
      id: 'tasks' as ActiveSection,
      label: 'Tasks',
      icon: FaTasks,
      description: 'Manage your assigned tasks'
    },
    {
      id: 'files' as ActiveSection,
      label: 'My Files',
      icon: FaFolder,
      description: 'Access your documents and files'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary/20 to-primary flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary/20 to-primary">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-red-500/20 p-6">
          {/* Header */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Dashboard
            </motion.h1>
            <p className="text-red-400 text-sm">Welcome back, {teamId}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-red-600/20 border border-red-500/30 text-red-400' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="text-lg" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </motion.button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="space-y-2">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                <FaHome className="text-lg" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-600/10 hover:text-red-300 transition-all duration-200"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {activeSection === 'profile' && <ProfileSection />}
            {activeSection === 'tasks' && <TaskSection />}
            {activeSection === 'files' && <FilesSection />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
