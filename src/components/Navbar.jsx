import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ currentSection, setCurrentSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'product', label: 'Product' },
    { id: 'features', label: 'Features' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (index) => {
    setCurrentSection(index);
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300 flex justify-between items-center bg-transparent backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-white text-2xl font-bold"
        whileHover={{ scale: 1.05 }}
      >
        BRAND
      </motion.div>

      <div className="flex space-x-2">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`px-3 py-1.5 rounded-full text-xs font-medium text-white transition-all duration-300 ${
              currentSection === index
                ? 'shadow-[0_0_10px_rgba(96,165,250,0.8)]'
                : 'hover:shadow-[0_0_15px_rgba(96,165,250,0.6)]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(index)}
          >
            {section.label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;