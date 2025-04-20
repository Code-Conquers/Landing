import React from 'react';
import { motion } from 'framer-motion';
import SplineScene from './SplineScene';

// Animated Background Component to replace SplineScene
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Animated circles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Wave animation at the bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay, index }) => {
  // Enhanced card design with more sophisticated animations
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 12, 
          delay: delay 
        }
      }}
    >
      {/* Card background with glass morphism effect */}
      <motion.div 
        className="absolute inset-0 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl z-10"
        initial={{ borderRadius: "1rem" }}
        whileHover={{ 
          borderRadius: "1.5rem", 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          scale: 1.02
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content container */}
      <motion.div 
        className="relative z-20 p-8 h-full"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {/* Decorative floating orbs that move on hover */}
        <motion.div 
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 blur-xl"
          initial={{ scale: 0.8, opacity: 0.5 }}
          whileHover={{ scale: 1.2, opacity: 0.8, x: -15, y: 15 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-primary/20 blur-xl"
          initial={{ scale: 0.6, opacity: 0.4 }}
          whileHover={{ scale: 1, opacity: 0.7, x: 10, y: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Interactive icon container */}
        <motion.div 
          className="flex mb-6"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: [0, -5, 5, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
            whileHover={{ 
              rotate: [0, 10, -10, 5, 0],
              scale: 1.1,
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          {/* Decorative accent lines */}
          <motion.div 
            className="w-6 h-1 bg-primary/30 rounded-full absolute left-20 top-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "1.5rem", opacity: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.3 }}
          />
          <motion.div 
            className="w-3 h-1 bg-primary/30 rounded-full absolute left-20 top-9"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "0.75rem", opacity: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.3 }}
          />
        </motion.div>

        {/* Title with hover effect */}
        <motion.h3 
          className="text-2xl font-bold mb-3 text-gray-800 relative inline-block"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
          <motion.div 
            className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>
        
        {/* Description with subtle animation */}
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
        
        {/* Call-to-action button that appears on hover */}
        <motion.div
          className="mt-5 overflow-hidden h-8"
          initial={{ height: 0 }}
          whileHover={{ height: "2rem" }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            className="px-4 py-1 bg-gradient-to-r from-primary/90 to-blue-500/90 text-white rounded-lg text-sm font-medium flex items-center gap-1"
            whileHover={{ 
              gap: "0.5rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
          >
            Learn more 
            <span>→</span>
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Bottom glowing accent that animates on hover */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full z-30"
        initial={{ width: "0%" }}
        whileHover={{ width: "90%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const FeaturesSection = ({ isActive }) => {
  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Optimized for performance with blazing fast load times and smooth interactions."
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Sleek, modern aesthetics that capture attention and enhance user experience."
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "Looks amazing on any device, from desktop to mobile and everything in between."
    },
    {
      icon: "🔍",
      title: "SEO Friendly",
      description: "Built with best practices to ensure your content ranks well in search engines."
    },
    {
      icon: "🛠️",
      title: "Easy Customization",
      description: "Simple to modify and adapt to fit your brand's unique identity and needs."
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Built with security in mind to keep your data and users protected."
    }
  ];

  // Parent container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="section bg-[#4A274F] text-dark flex items-center justify-center relative z-20 overflow-hidden font-secondary">
    <div className="absolute inset-0 z-0 pointer-events-none filter blur-xs opacity-95 ">
      <SplineScene scene='features' isActive={isActive} />
      </div>
      {/* Enhanced background decoration elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 py-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Powerful <span className="text-primary">Features</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Everything you need to create stunning digital experiences, all in one place
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.08}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;