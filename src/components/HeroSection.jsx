// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SplineScene from './SplineScene';

const HeroSection = ({ isActive }) => {
  return (
    <section className="section bg-[#030202] text-white flex items-center justify-center relative font-secondary">
         <div className="absolute inset-0 z-0 pointer-events-none filter  ">
      <SplineScene scene="heroBackground" isActive={isActive} />
</div>
      <div className="container mx-auto px-4 z-10 h-full relative">
        <motion.div
          className="absolute bottom-12 left-8 max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Next Generation <span className="text-[#8D305D]">Digital Experience</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Transform your digital presence with our cutting-edge interactive solutions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-row gap-4"
          >
            <motion.button
              className="bg-[#8D305D] hover:bg-opacity-80 text-white px-6 py-2 rounded-full font-medium text-base transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            
            <motion.button
              className="bg-transparent border-2 border-[#8D305D] text-white px-6 py-2 rounded-full font-medium text-base transition-all hover:bg-[#8D305D] hover:bg-opacity-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 "
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div 
          className="w-6 h-12 border-2 border-[#8D305D] rounded-full flex justify-center items-start p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div className="w-1 h-2 bg-[#8D305D] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;