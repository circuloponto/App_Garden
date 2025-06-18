import React from 'react';
import { motion } from 'framer-motion';
import styles from './SlidePresentation.module.css';

const Slide1 = () => {
  // Define animation variants for different elements
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        delay: 0.1
      } 
    }
  };
  
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: "easeInOut" 
      } 
    }
  };
  
  return (
    <motion.svg 
      width="500" 
      height="500" 
      viewBox="0 0 646 646" 
      initial="hidden"
      animate="visible"
      style={{ maxWidth: '500px', maxHeight: '500px' }}
    >
      {/* Grid lines - not animated */}
      <g opacity="0.3">
        {Array(16).fill().map((_, i) => (
          <motion.path 
            key={`h-${i}`} 
            d={`M0 ${66 + i*40}H679`} 
            stroke="#4D4D4D"
          />
        ))}
        {Array(16).fill().map((_, i) => (
          <motion.path 
            key={`v-${i}`} 
            d={`M${19 + i*40} 0L${19 + i*40} 679`} 
            stroke="#4D4D4D"
          />
        ))}
      </g>
      
      {/* Animated white lines */}
      <motion.path 
        d="M258 346L418 346" 
        stroke="white" 
        strokeWidth="4"
        variants={pathVariants}
      />
      <motion.path 
        d="M418 265.5L259 426.5M418 426.5L259 265.5M340 426.5V505H259L340 426.5ZM340 426.5V265.5M340 265.5V185.5H418L340 265.5Z" 
        stroke="white" 
        strokeWidth="4"
        variants={pathVariants}
      />
      <motion.circle 
        cx="337" 
        cy="347" 
        r="239" 
        stroke="white" 
        strokeWidth="4"
        fill="none"
        variants={circleVariants}
      />
    </motion.svg>
  );
};

export default Slide1;
