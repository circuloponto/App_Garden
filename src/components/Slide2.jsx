import React from 'react';
import { motion } from 'framer-motion';
import styles from './SlidePresentation.module.css';
import slide2SVG from '../assets/SVGs/slide2.svg';

const Slide2 = () => {
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
        <div className={styles.instructionText}>play a note</div>
        <div className={styles.instructionExample}>ex C</div>
      </motion.div>
      <motion.object
        type="image/svg+xml"
        data={slide2SVG}
        className={styles.svgObject}
        width="500"
        height="500"
        aria-label="Slide 2 SVG"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 0.5 }
        }}
        onLoad={(e) => {
          // After the SVG loads, we can access its document to animate elements
          const svgDoc = e.target.contentDocument;
          if (!svgDoc) {
            console.error('SVG document not found');
            return;
          }
          
          // Debug what's in the SVG
          console.log('SVG loaded:', svgDoc);
          console.log('SVG root element:', svgDoc.querySelector('svg'));
          console.log('Paths found:', svgDoc.querySelectorAll('path').length);
          console.log('Circles found:', svgDoc.querySelectorAll('circle').length);
          console.log('Text elements found:', svgDoc.querySelectorAll('text').length);
          
          // First, add a style to hide all elements until we're ready
          const preloadStyle = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
          preloadStyle.textContent = `
            path, text { opacity: 0; }
            circle:not([fill="#FFFFFF"]):not([fill="white"]) { opacity: 0; }
          `;
          svgDoc.querySelector('svg').appendChild(preloadStyle);
          
          // Find all path elements and animate them
          const paths = svgDoc.querySelectorAll('path');
          console.log('Processing paths:', paths);
          
          paths.forEach((path, index) => {
            try {
              // Some SVG paths might not have a getTotalLength method or might return 0
              const length = path.getTotalLength ? path.getTotalLength() : 100;
              console.log(`Path ${index} length:`, length);
              
              // Make sure we have a valid length
              if (length && length > 0) {
                path.style.cssText = `
                  stroke-dasharray: ${length};
                  stroke-dashoffset: ${length};
                  animation: dash 1.5s ease-in-out forwards;
                  opacity: 1;
                `;
              } else {
                // For paths without a valid length, just fade them in
                path.style.cssText = `
                  opacity: 0;
                  animation: fadeIn 1.5s ease-in-out forwards;
                `;
              }
            } catch (error) {
              console.error(`Error animating path ${index}:`, error);
              // Fallback animation
              path.style.opacity = 0;
              setTimeout(() => {
                path.style.opacity = 1;
                path.style.transition = 'opacity 1.5s ease-in-out';
              }, 100);
            }
          });

          // Find all circle elements and animate them
          const circles = svgDoc.querySelectorAll('circle');
          console.log('Processing circles:', circles);
          
          circles.forEach((circle, index) => {
            try {
              const fill = circle.getAttribute('fill');
              console.log(`Circle ${index} fill:`, fill);
              
              // Make sure the white center dot is visible immediately
              if (fill === '#FFFFFF' || fill === 'white') {
                console.log(`Circle ${index} is white, making visible immediately`);
                circle.style.cssText = `
                  opacity: 1;
                `;
              } else {
                // Add animation for other circles
                console.log(`Circle ${index} is not white, animating`);
                circle.style.cssText = `
                  opacity: 0;
                  animation: fadeIn 0.5s ease-in-out 1s forwards;
                `;
                
                // Force the circle to be visible after animation time
                // in case the animation doesn't trigger properly
                setTimeout(() => {
                  if (parseFloat(getComputedStyle(circle).opacity) < 1) {
                    console.log(`Forcing circle ${index} to be visible`);
                    circle.style.opacity = 1;
                  }
                }, 2000);
              }
            } catch (error) {
              console.error(`Error animating circle ${index}:`, error);
              // Fallback - make circle visible
              circle.style.opacity = 1;
            }
          });
          // Make text elements visible
          const textElements = svgDoc.querySelectorAll('text');
          console.log('Processing text elements:', textElements);
          
          textElements.forEach((text, index) => {
            try {
              console.log(`Text element ${index}:`, text.textContent);
              text.style.opacity = 0;
              
              // Show text after a delay
              setTimeout(() => {
                try {
                  text.style.opacity = 1;
                  text.style.transition = 'opacity 0.5s ease-in-out';
                  console.log(`Text element ${index} should now be visible`);
                  
                  // Force visibility after animation time in case transition doesn't work
                  setTimeout(() => {
                    if (parseFloat(getComputedStyle(text).opacity) < 1) {
                      console.log(`Forcing text element ${index} to be visible`);
                      text.style.opacity = 1;
                    }
                  }, 1000);
                } catch (innerError) {
                  console.error(`Error making text ${index} visible:`, innerError);
                  text.style.opacity = 1; // Fallback
                }
              }, 1500); // Fixed delay for all text elements
            } catch (error) {
              console.error(`Error processing text element ${index}:`, error);
              // Fallback - make text visible immediately
              text.style.opacity = 1;
            }
          });
          
          // Add keyframe animations to the SVG document
          const keyframes = document.createElement('style');
          keyframes.textContent = `
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes fadeIn {
              to {
                opacity: 1;
              }
            }
            @keyframes drawPath {
              to {
                stroke-dashoffset: 0;
              }
            }
          `;
          svgDoc.querySelector('svg').appendChild(keyframes);
          
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

export default Slide2;
