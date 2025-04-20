import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SplineScene from './SplineScene';

const ContactSection = ({ isActive }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // Debug
    // Add your form submission logic here (e.g., API call)
    alert('Message sent! (Placeholder logic)');
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  // Handle Schedule Call click
  const handleScheduleCall = (e) => {
    console.log('Schedule Call clicked'); // Debug
    window.location.href = 'mailto:gmpaliwal21@gmail.com?subject=Schedule a Call';
  };

  // Handle View Portfolio click
  const handleViewPortfolio = (e) => {
    e.stopPropagation(); // Prevent parent interference
    console.log('View Portfolio clicked'); // Debug
  };

  return (
    <section className="section bg-dark text-light flex items-center justify-center z-30 font-secondary">
      <SplineScene scene="contact" isActive={isActive} style={{ pointerEvents: 'none' }} />
      <div className="container mx-auto px-4 py-16 z-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-1 bg-primary-light bg-opacity-20 text-primary-light rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get In Touch
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Ready to <span className="text-primary-light">Transform</span> Your Digital Experience?
            </motion.h2>

            <motion.p
              className="text-xl mb-8 text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Our team of experts is ready to help you create something amazing. Let's start a conversation about your project.
            </motion.p>

            <div className="flex flex-col space-y-4">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-4">
                  📧
                </div>
                <span>gmpaliwal21@gmail.com</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-4">
                  📱
                </div>
                <span>+91 9106647720</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-4">
                  📍
                </div>
                <span>Udaipur, Rajasthan</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-row gap-4 mt-8"
            >
              <motion.button
                className="bg-[#F3CD01] hover:bg-opacity-80 text-black px-6 py-2 rounded-full font-medium text-base transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScheduleCall}
              >
                Schedule Call
              </motion.button>

              <motion.a
                href="https://gauravportfolio-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-[#CFCFCE] text-white px-6 py-2 rounded-full font-medium text-base transition-all hover:bg-[#CFCFCE1A]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewPortfolio}
              >
                View Portfolio
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-filter backdrop-blur-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-3 bg-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition-all"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#F3CD01] hover:bg-opacity-80 text-black px-6 py-3 rounded-full font-medium transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => console.log('Send Message clicked')} // Debug
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;