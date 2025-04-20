import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ProductSection = ({ isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create tree-like structure with dots
    const createTreeDots = () => {
      const dots = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Tree trunk
      const trunkHeight = canvas.height * 0.4;
      const trunkWidth = canvas.width * 0.015; // Slimmer trunk
      const dotDensity = 200; // Higher number means more dots
      
      // Add trunk dots
      for (let i = 0; i < trunkHeight * trunkWidth / dotDensity; i++) {
        dots.push({
          x: centerX - trunkWidth/2 + Math.random() * trunkWidth,
          y: centerY + Math.random() * trunkHeight * 0.8,
          radius: Math.random() * 1.2 + 0.5, // Smaller dots
          opacity: Math.random() * 0.5 + 0.4,
          blinkSpeed: Math.random() * 0.01 + 0.003,
          blinkDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
      
      // Add tree branches - recursive function
      const addBranch = (startX, startY, length, angle, width, depth) => {
        if (depth <= 0) return;
        
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        
        // Add dots for this branch
        for (let i = 0; i < length * width / dotDensity; i++) {
          const ratio = Math.random();
          const branchX = startX + (endX - startX) * ratio;
          const branchY = startY + (endY - startY) * ratio;
          
          dots.push({
            x: branchX - width/2 + Math.random() * width,
            y: branchY - width/2 + Math.random() * width,
            radius: Math.random() * 1.2 + 0.5, // Smaller dots
            opacity: Math.random() * 0.5 + 0.4,
            blinkSpeed: Math.random() * 0.01 + 0.003,
            blinkDirection: Math.random() > 0.5 ? 1 : -1
          });
        }
        
        // Create more sub-branches with smaller angles between them
        const newDepth = depth - 1;
        const newLength = length * 0.65; // Smaller branches
        const newWidth = width * 0.65; // Smaller width
        
        // More branching angles for a denser tree
        const branchingAngles = [
          angle - Math.PI / 4,
          angle - Math.PI / 6,
          angle + Math.PI / 6,
          angle + Math.PI / 4
        ];
        
        // Add smaller sub-branches at different angles
        branchingAngles.forEach(newAngle => {
          addBranch(endX, endY, newLength, newAngle, newWidth, newDepth);
        });
        
        // For deeper branches, add even more detailed sub-branches
        if (depth > 2) {
          addBranch(endX, endY, newLength * 0.7, angle - Math.PI / 3, newWidth * 0.7, depth - 2);
          addBranch(endX, endY, newLength * 0.7, angle + Math.PI / 3, newWidth * 0.7, depth - 2);
        }
      };
      
      // Start branches from the top of the trunk
      addBranch(centerX, centerY, canvas.height * 0.25, -Math.PI / 2, trunkWidth * 0.8, 5);
      
      // Add more main branches from the trunk for a fuller tree
      addBranch(centerX, centerY + canvas.height * 0.1, canvas.height * 0.18, -Math.PI / 2.5, trunkWidth * 0.6, 4);
      addBranch(centerX, centerY + canvas.height * 0.1, canvas.height * 0.18, -Math.PI / 1.7, trunkWidth * 0.6, 4);
      
      // Add random stars in the background
      const starCount = Math.floor(canvas.width * canvas.height / 8000);
      for (let i = 0; i < starCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.4, // Smaller stars
          opacity: Math.random() * 0.4 + 0.3,
          blinkSpeed: Math.random() * 0.02 + 0.005,
          blinkDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
      
      return dots;
    };
    
    const dots = createTreeDots();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach(dot => {
        // Update dot opacity for blinking effect
        dot.opacity += dot.blinkSpeed * dot.blinkDirection;
        
        // Change blink direction when limits reached
        if (dot.opacity <= 0.3 || dot.opacity >= 0.9) {
          dot.blinkDirection *= -1;
        }
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dots.length = 0;
      Array.prototype.push.apply(dots, createTreeDots());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="section bg-[#1C2F2A] text-dark flex items-center justify-center relative">
      {/* Animated background with refined tree pattern of blinking dots */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ opacity: 0.55 }}
      />
      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-white font-ren"
            variants={itemVariants}
          >
            Discover Our <span className="text-primary">Product</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center ">
            <motion.div variants={itemVariants}>
              <div className="bg-slate-100 rounded-xl shadow-xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 overflow-hidden ">
                  <img 
                    src="src/assets/productShowcase.jpg" 
                    alt="Interactive Design Showcase" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Product image placeholder";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-ren">Interactive Design</h3>
                <p className="text-gray-600 font-ren">Create immersive experiences that captivate your audience with fluid animations and responsive interactions.</p>
              </div>
            </motion.div>
            
            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.div 
                variants={itemVariants}
                className="bg-primary bg-opacity-10 border-l-4 border-primary rounded-r-lg p-6"
              >
                <h4 className="font-bold text-2xl mb-2 text-white font-ren">Stunning Visuals</h4>
                <p className="text-white font-bold font-ren">High-fidelity 3D models and animations that bring your products to life</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-primary bg-opacity-10 border-l-4 border-primary rounded-r-lg p-6"
              >
                <h4 className="font-bold text-2xl mb-2 text-white font-ren">Effortless Integration</h4>
                <p className="text-white font-bold font-ren">Seamlessly works with your existing tech stack and workflows</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-primary bg-opacity-10 border-l-4 border-primary rounded-r-lg p-6"
              >
                <h4 className="font-bold text-2xl mb-2 text-white font-ren">Performance Optimized</h4>
                <p className="text-white font-bold font-ren">Built with speed and efficiency in mind for smooth user experiences</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;