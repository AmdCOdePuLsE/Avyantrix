'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCode, FaRocket, FaUpload, FaFilePdf, FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { initEmailJS, sendApplicationEmail, sendConfirmationEmail, sendApplicationViaAPI, isEmailJSConfigured } from '@/utils/emailService';

const MemberPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    experience: '',
    motivation: '',
    resume: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailConfigured, setEmailConfigured] = useState(false);

  useEffect(() => {
    // Initialize EmailJS and check configuration
    initEmailJS();
    setEmailConfigured(isEmailJSConfigured());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      resume: file
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (emailConfigured) {
        // Use EmailJS if configured
        await sendApplicationEmail(formData);
        await sendConfirmationEmail(formData);
      } else {
        // Use API route as fallback
        await sendApplicationViaAPI(formData);
      }

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          education: '',
          skills: '',
          experience: '',
          motivation: '',
          resume: null
        });

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        // Reset status after showing success for a while
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Reset error status after showing error for a while
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary/20 to-primary py-20 px-4">
      <div className="container mx-auto max-w-5xl">
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
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-serif text-center mb-6 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"
          >
            Join Team Avyantrix
          </motion.h1>

          {/* Email Configuration Status */}
          {!emailConfigured && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <FaExclamationTriangle className="text-lg" />
                <p className="font-medium">
                  Using fallback email service - API route with Nodemailer
                </p>
              </div>
              <p className="text-blue-300/70 text-sm text-center mt-2">
                EmailJS not configured. Configure EmailJS for more features or use current setup.
              </p>
            </motion.div>
          )}

          {emailConfigured && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 text-green-400">
                <FaCheckCircle className="text-lg" />
                <p className="font-medium">
                  EmailJS configured - Full email functionality enabled
                </p>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-white/90 text-xl mb-4">
              Ready to push the boundaries of innovation?
            </p>
            <p className="text-white/70 text-lg">
              Join our collective of passionate engineers and help us build the future through cutting-edge technology.
            </p>
          </motion.div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          {/* Background Effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-black/60 to-black/40 p-8 border-b border-red-500/20">
              <h2 className="text-2xl font-serif text-red-400 mb-2">Application Form</h2>
              <p className="text-white/60">Tell us about yourself and your passion for innovation</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-red-500/20 pb-2 flex items-center">
                  <FaUser className="mr-2 text-red-400" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Full Name *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                        placeholder="Enter your full name"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Email Address *
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                        placeholder="your.email@example.com"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                        placeholder="+1 (555) 123-4567"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Education */}
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Education/Institution
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                        placeholder="University, Degree, Year"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Technical Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-red-500/20 pb-2 flex items-center">
                  <FaCode className="mr-2 text-red-400" />
                  Technical Expertise
                </h3>

                {/* Skills */}
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                    Technical Skills *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                      placeholder="React, Python, AI/ML, Docker, etc."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Experience */}
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                    Experience & Projects
                  </label>
                  <div className="relative group">
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 resize-none group-hover:border-white/20"
                      placeholder="Tell us about your relevant experience, projects, hackathons, or achievements..."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>
              </div>

              {/* Motivation Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-red-500/20 pb-2 flex items-center">
                  <FaRocket className="mr-2 text-red-400" />
                  Your Vision
                </h3>

                {/* Motivation */}
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                    Why Join Avyantrix? *
                  </label>
                  <div className="relative group">
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300 resize-none group-hover:border-white/20"
                      placeholder="What drives you to innovate? How do you see yourself contributing to our mission?"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Resume Upload */}
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="text-white/90 font-medium text-sm uppercase tracking-wider">
                    Resume/CV *
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center w-full bg-white/5 border-2 border-dashed border-white/20 rounded-xl px-4 py-8 text-white cursor-pointer hover:bg-white/10 hover:border-red-500/40 transition-all duration-300 group-hover:border-white/30"
                    >
                      <div className="text-center">
                        {formData.resume ? (
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="space-y-3"
                          >
                            <FaFilePdf className="mx-auto text-red-400 text-4xl" />
                            <div>
                              <p className="text-white font-medium">{formData.resume.name}</p>
                              <p className="text-white/60 text-sm mt-1">
                                {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="space-y-3">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <FaUpload className="mx-auto text-white/60 text-4xl" />
                            </motion.div>
                            <div>
                              <p className="text-white/90 font-medium">Drop your resume here</p>
                              <p className="text-white/60 text-sm mt-1">
                                or click to browse
                              </p>
                              <p className="text-white/40 text-xs mt-2">
                                PDF, DOC, DOCX (Max 5MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                    {formData.resume && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        type="button"
                        onClick={() => setFormData({ ...formData, resume: null })}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors shadow-lg"
                      >
                        ×
                      </motion.button>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ 
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting ? undefined : "0 10px 40px rgba(220, 38, 38, 0.3)"
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg border border-red-500/20 relative overflow-hidden group ${
                  isSubmitting 
                    ? 'bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 cursor-not-allowed' 
                    : submitStatus === 'success'
                    ? 'bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:shadow-green-500/30'
                    : submitStatus === 'error'
                    ? 'bg-gradient-to-r from-red-800 via-red-700 to-red-800 hover:shadow-red-700/30'
                    : 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:shadow-red-500/30'
                }`}
              >
                {!isSubmitting && submitStatus === 'idle' && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{ opacity: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaRocket className="text-lg" />
                      Submit Application
                    </span>
                  </>
                )}
                
                {isSubmitting && (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaSpinner className="text-lg animate-spin" />
                    Sending Application...
                  </span>
                )}
                
                {submitStatus === 'success' && (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaCheckCircle className="text-lg" />
                    Application Sent Successfully!
                  </span>
                )}
                
                {submitStatus === 'error' && (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaArrowLeft className="text-lg" />
                    Error - Please Try Again
                  </span>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <p className="text-green-400 text-center font-medium">
                    🎉 Thank you for your application! 
                    {emailConfigured ? (
                      <>We've sent a confirmation email to <span className="font-bold">{formData.email}</span>. 
                      We'll review your application and get back to you within 48 hours.</>
                    ) : (
                      <>Your application has been received. Since email is not configured, please contact us directly.</>
                    )}
                  </p>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <p className="text-red-400 text-center font-medium">
                    ❌ There was an error sending your application. 
                    {emailConfigured ? (
                      <>Please check your internet connection and try again. If the problem persists, contact us directly.</>
                    ) : (
                      <>Email service is not configured. Please set up EmailJS or contact us directly.</>
                    )}
                  </p>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/10">
            <p className="text-white/70 text-sm mb-2">
              📧 Applications are reviewed on a rolling basis
            </p>
            <p className="text-red-400 text-sm font-medium">
              We'll get back to you within 48 hours
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberPage;
