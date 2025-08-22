'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';

interface LoginFormData {
  teamId: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    teamId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual Supabase authentication
      // For now, simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Temporary validation (replace with Supabase auth)
      if (formData.teamId === 'AVYANTRIX' && formData.password === 'team2024') {
        // Store login state (temporary - replace with proper auth)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('teamId', formData.teamId);
        
        // Redirect to team page
        router.push('/team');
      } else {
        setError('Invalid team ID or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary/20 to-primary flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/team"
            className="inline-flex items-center text-accent hover:text-accent/80 transition-colors group"
          >
            <motion.div
              whileHover={{ x: -5 }}
              className="flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Team
            </motion.div>
          </Link>
        </motion.div>

        {/* Login Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-red-600 to-accent rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaUser className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-3xl font-serif text-center mb-6 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
              Team Portal
            </h1>
            <p className="text-white/70">Enter your credentials to access the team dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-600/20 border border-red-600/50 rounded-lg p-3 mb-6"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team ID Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label htmlFor="teamId" className="text-white/90 font-medium text-sm uppercase tracking-wider">
                Team ID *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  id="teamId"
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                  placeholder="Enter your team ID"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="password" className="text-white/90 font-medium text-sm uppercase tracking-wider">
                Password *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={isLoading}
              whileHover={{ 
                scale: isLoading ? 1 : 1.02,
                boxShadow: isLoading ? undefined : "0 10px 40px rgba(220, 38, 38, 0.3)"
              }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg border border-red-500/20 relative overflow-hidden group ${
                isLoading 
                  ? 'bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:shadow-red-500/30'
              }`}
            >
              {!isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaUser className="text-lg" />
                    Sign In to Team Portal
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 space-y-4"
          >
            <div className="text-center text-white/60 text-sm">
              Forgot your credentials?{' '}
              <a href="mailto:admin@avyantrix.com" className="text-red-400 hover:text-red-300 transition-colors">
                Contact Admin
              </a>
            </div>
            
            <div className="border-t border-white/10 pt-4 text-center">
              <p className="text-white/50 text-xs mb-2">
                Not a team member yet?
              </p>
              <Link 
                href="/member"
                className="text-accent hover:text-accent/80 transition-colors text-sm font-medium"
              >
                Apply to Join Team →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-white/30 text-xs">
            🔒 Secure team portal • Protected by encryption
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
