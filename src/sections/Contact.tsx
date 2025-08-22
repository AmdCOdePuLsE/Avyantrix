'use client';

import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { contactInfo } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
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
      id="contact"
      className="min-h-screen bg-primary py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-accent text-center mb-16">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="contact-content space-y-8">
            <h3 className="text-2xl font-serif text-accent">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <FaEnvelope className="text-accent text-xl" />
                </div>
                <div>
                  <p className="text-white/60">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-white hover:text-accent transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-accent text-xl" />
                </div>
                <div>
                  <p className="text-white/60">Location</p>
                  <p className="text-white">{contactInfo.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <FaPhone className="text-accent text-xl" />
                </div>
                <div>
                  <p className="text-white/60">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white hover:text-accent transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="contact-content space-y-6"
          >
            <div>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className={`w-full bg-black/30 border ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-accent/20'
                } rounded-lg p-3 text-white focus:outline-none focus:border-accent`}
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className={`w-full bg-black/30 border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-accent/20'
                } rounded-lg p-3 text-white focus:outline-none focus:border-accent`}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className={`w-full bg-black/30 border ${
                  formik.touched.subject && formik.errors.subject
                    ? 'border-red-500'
                    : 'border-accent/20'
                } rounded-lg p-3 text-white focus:outline-none focus:border-accent`}
                {...formik.getFieldProps('subject')}
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="mt-1 text-red-500 text-sm">
                  {formik.errors.subject}
                </p>
              )}
            </div>

            <div>
              <textarea
                id="message"
                placeholder="Your Message"
                rows={5}
                className={`w-full bg-black/30 border ${
                  formik.touched.message && formik.errors.message
                    ? 'border-red-500'
                    : 'border-accent/20'
                } rounded-lg p-3 text-white focus:outline-none focus:border-accent`}
                {...formik.getFieldProps('message')}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="mt-1 text-red-500 text-sm">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden bg-accent text-primary py-4 rounded-lg font-bold transition-all duration-500 ease-out hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center justify-center gap-2">
                Send Message
                <svg 
                  className="w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-500"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-black to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.5),transparent_70%)]"></div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
