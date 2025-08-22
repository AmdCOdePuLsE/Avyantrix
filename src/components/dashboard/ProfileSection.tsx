'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaSave, FaEdit, FaGithub, FaLinkedin, FaInstagram, FaPlus, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  email: string;
  phone: string;
  joinedDate: string;
}

const ProfileSection = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    role: '',
    bio: '',
    skills: [],
    image: '/placeholder-profile.jpg',
    social: {},
    email: '',
    phone: '',
    joinedDate: new Date().toISOString().split('T')[0]
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    // Load profile data from localStorage (temporary - will be replaced with Supabase)
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage (temporary - will be replaced with Supabase)
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // TODO: Save to Supabase database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setIsEditing(false);
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile Management</h1>
          <p className="text-white/70">Update your information that will be displayed on the team page</p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <motion.button
                onClick={() => setIsEditing(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <FaSave />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </motion.button>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={profileData.image}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-2 border-red-500/30"
                />
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-sm"
                  >
                    <FaEdit />
                  </motion.button>
                )}
              </div>
              
              {isEditing && (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={profileData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Profile image URL"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                  />
                  <p className="text-xs text-white/50">Enter image URL or upload will be available soon</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-white bg-white/5 rounded-lg px-3 py-2">{profileData.name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Role/Position</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                    placeholder="e.g., Frontend Developer"
                  />
                ) : (
                  <p className="text-white bg-white/5 rounded-lg px-3 py-2">{profileData.role || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <p className="text-white bg-white/5 rounded-lg px-3 py-2">{profileData.email || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <p className="text-white bg-white/5 rounded-lg px-3 py-2">{profileData.phone || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-white/80 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500 resize-none"
                  placeholder="Tell us about yourself and your expertise..."
                />
              ) : (
                <p className="text-white bg-white/5 rounded-lg px-3 py-2 min-h-[80px]">{profileData.bio || 'No bio added yet'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Skills & Technologies</h3>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-600/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-300 transition-colors"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                )}
              </motion.div>
            ))}
            
            {profileData.skills.length === 0 && (
              <p className="text-white/50 italic">No skills added yet</p>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                placeholder="Add a skill (e.g., React, Python, etc.)"
              />
              <motion.button
                onClick={addSkill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus />
                Add
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
              <FaGithub />
              GitHub
            </label>
            {isEditing ? (
              <input
                type="url"
                value={profileData.social.github || ''}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                placeholder="https://github.com/username"
              />
            ) : (
              <p className="text-white bg-white/5 rounded-lg px-3 py-2 break-all">
                {profileData.social.github || 'Not set'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
              <FaLinkedin />
              LinkedIn
            </label>
            {isEditing ? (
              <input
                type="url"
                value={profileData.social.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                placeholder="https://linkedin.com/in/username"
              />
            ) : (
              <p className="text-white bg-white/5 rounded-lg px-3 py-2 break-all">
                {profileData.social.linkedin || 'Not set'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
              <FaInstagram />
              Instagram
            </label>
            {isEditing ? (
              <input
                type="url"
                value={profileData.social.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
                placeholder="https://instagram.com/username"
              />
            ) : (
              <p className="text-white bg-white/5 rounded-lg px-3 py-2 break-all">
                {profileData.social.instagram || 'Not set'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
