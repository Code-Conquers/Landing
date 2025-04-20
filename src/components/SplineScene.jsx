import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const SPLINE_SCENES = {
  heroBackground: 'https://prod.spline.design/QDK5FeMkXi6SbJAx/scene.splinecode',
  contact: 'https://prod.spline.design/6F6Er4XcJcCsyT2f/scene.splinecode',  
  features : 'https://prod.spline.design/xE8jRT5xru1Qdp3L/scene.splinecode'
};
const SplineScene = ({ scene = 'heroBackground', className = '', isActive = true }) => {
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <motion.div 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {shouldRender && (
        <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center">Loading 3D Scene...</div>}>
          <div className="w-full h-full pointer-events-none">
            <Spline scene={SPLINE_SCENES[scene]} />
          </div>
        </Suspense>
      )}
    </motion.div>
  );
};
export default SplineScene;
