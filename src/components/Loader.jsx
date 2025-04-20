import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <motion.div
          className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          3D World
        </motion.div>
        
        <div className="relative w-24 h-24">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full border-4 border-transparent rounded-full border-t-blue-500 border-r-purple-500"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                rotate: 360,
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <motion.p
          className="mt-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Loading amazing 3D experiences...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;