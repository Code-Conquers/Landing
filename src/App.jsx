import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const sections = ['hero', 'product', 'features', 'contact'];
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Disable native scrolling completely and handle manually
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const goToSection = (index) => {
    if (isAnimating || index === currentSection) return;
    
    setIsAnimating(true);
    setCurrentSection(index);
    
    // Reset after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      scrollAccumulator.current = 0;
    }, 800);
  };

  // Handle wheel events (mouse wheel and trackpad)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Skip if currently animating
      if (isAnimating) return;
      
      // Throttle events
      const now = Date.now();
      if (now - lastScrollTime.current < 50) return;
      lastScrollTime.current = now;
      
      // Accumulate scroll values to handle trackpad's subtle movements
      scrollAccumulator.current += e.deltaY;
      
      // Define threshold for section change - higher number means less sensitive
      const threshold = 50;
      
      if (Math.abs(scrollAccumulator.current) > threshold) {
        // Determine direction based on accumulated value
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        
        // Calculate target section
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        
        // Only proceed if there's a change
        if (nextSection !== currentSection) {
          goToSection(nextSection);
        }
        
        // Reset accumulator
        scrollAccumulator.current = 0;
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isAnimating, sections.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;
      
      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        goToSection(currentSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isAnimating, sections.length]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (isAnimating) return;
      
      const touchY = e.touches[0].clientY;
      const diff = touchY - touchStartY;
      
      // Only trigger once per touch with sufficient movement
      if (Math.abs(diff) > 100) {
        const direction = diff > 0 ? -1 : 1;
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        
        if (nextSection !== currentSection) {
          goToSection(nextSection);
        }
        
        // Reset
        touchStartY = touchY;
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentSection, isAnimating, sections.length]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden">
      <CustomCursor />
      <Navbar currentSection={currentSection} setCurrentSection={goToSection} />
      <SectionIndicator
        currentSection={currentSection}
        setCurrentSection={goToSection}
        sections={sections}
        isAnimating={isAnimating}
      />
      
      <div className="relative h-full">
        {sections.map((_, index) => {
          const Component = [HeroSection, ProductSection, FeaturesSection, ContactSection][index];
          return (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{
                opacity: currentSection === index ? 1 : 0,
                pointerEvents: currentSection === index ? 'auto' : 'none',
              }}
              transition={{ 
                duration: 0.7,
                ease: "easeInOut" 
              }}
            >
              <Component isActive={currentSection === index} />
            </motion.div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

// SectionIndicator component
const SectionIndicator = ({ currentSection, setCurrentSection, sections, isAnimating }) => {
  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {sections.map((_, index) => (
        <motion.button
          key={index}
          className="w-3 h-3 rounded-full bg-white bg-opacity-50 focus:outline-none cursor-pointer"
          animate={{
            scale: currentSection === index ? 1.5 : 1,
            backgroundColor: currentSection === index ? 'rgb(96, 165, 250)' : 'rgba(255, 255, 255, 0.5)',
          }}
          onClick={() => {
            if (!isAnimating) {
              setCurrentSection(index);
            }
          }}
          disabled={isAnimating}
        />
      ))}
    </motion.div>
  );
};

export default App;