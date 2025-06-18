import React from 'react';
import { motion } from 'framer-motion';
import styles from './SlidePresentation.module.css';
import slide3SVG from '../assets/SVGs/slide3.svg';

const Slide3 = () => {
  // Create a ref for the instruction box
  const instructionBoxRef = React.useRef(null);
  
  return (
    <div className={styles.svgContent}>
      <motion.div
        ref={instructionBoxRef}
        className={styles.instructionBox}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }} // Keep hidden initially
        style={{ visibility: 'hidden' }} // Ensure it's hidden
      >
        <div className={styles.instructionText}>connect the notes</div>
        <div className={styles.instructionExample}>ex C to G</div>
      </motion.div>
      
      <motion.object
        type="image/svg+xml"
        data={slide3SVG}
        className={styles.svgObject}
        width="500"
        height="500"
        aria-label="Slide 3 SVG"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 0.5 }
        }}
        onLoad={(e) => {
          // After the SVG loads, we can access its document to animate elements
          const svgDoc = e.target.contentDocument;
          if (!svgDoc) return;
          
          // First, add a style to hide all elements until we're ready
          const preloadStyle = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
          preloadStyle.textContent = `
            path, circle, text { opacity: 0; }
          `;
          svgDoc.querySelector('svg').appendChild(preloadStyle);
          
          // Find all paths and circles in the SVG
          const paths = svgDoc.querySelectorAll('path');
          const circles = svgDoc.querySelectorAll('circle');
          
          // Apply the animation to each path with staggered delay
          paths.forEach((path, index) => {
            const length = path.getTotalLength();
            
            // Set initial state (invisible path)
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.opacity = 1; // Make visible again
            
            // Animate with delay based on index
            path.style.animation = `drawPath 0.8s ease-in-out ${index * 0.08}s forwards`;
          });
          
          // Apply animation to circles
          circles.forEach((circle, index) => {
            const radius = parseFloat(circle.getAttribute('r'));
            const circumference = 2 * Math.PI * radius;
            
            // Set initial state
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            circle.style.opacity = 1; // Make visible again
            
            // Animate with delay
            circle.style.animation = `drawPath 0.7s ease-in-out ${paths.length * 0.08 + index * 0.1}s forwards`;
          });
          
          // Make text elements visible
          svgDoc.querySelectorAll('text').forEach(text => {
            text.style.opacity = 0;
            setTimeout(() => {
              text.style.opacity = 1;
              text.style.transition = 'opacity 0.5s ease-in-out';
            }, (paths.length * 80) + (circles.length * 100) + 300); // Show text after paths and circles are drawn
          });
          
          // Add the keyframe animation to the SVG document
          const style = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
          style.textContent = `
            @keyframes drawPath {
              to {
                stroke-dashoffset: 0;
              }
            }
          `;
          svgDoc.querySelector('svg').appendChild(style);
          
          // Make the SVG object visible after everything is set up
          e.target.style.visibility = 'visible';
          
          // Show the instruction box after SVG is visible
          if (instructionBoxRef.current) {
            setTimeout(() => {
              instructionBoxRef.current.style.visibility = 'visible';
              instructionBoxRef.current.animate(
                [{ opacity: 0 }, { opacity: 1 }],
                { duration: 500, fill: 'forwards' }
              );
            }, 500); // Delay showing instruction box
          }
        }}
      />
    </div>
  );
};

export default Slide3;
