import React, { useState } from 'react';
import styles from './SlidePresentation.module.css';
// Import slide components
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

// Total number of slides in the presentation
const TOTAL_SLIDES = 3;

const SlidePresentation = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Render the current slide component
  const renderCurrentSlide = () => {
    switch(currentSlide) {
      case 0:
        return <Slide1 />;
      case 1:
        return <Slide2 />;
      case 2:
        return <Slide3 />;
      default:
        return null;
    }
  };
  
  // Implement infinite scrolling for slides
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % TOTAL_SLIDES);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  };

  return (
    <div className={styles.slidePresentation}>
      <div className={styles.slideControls}>
        <button 
          className={`${styles.slideControlButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <span className={styles.arrowLeft}></span>
        </button>
        <div className={styles.slideIndicator}>
          {currentSlide + 1} / {TOTAL_SLIDES}
        </div>
        <button 
          className={`${styles.slideControlButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <span className={styles.arrowRight}></span>
        </button>
        <button className={styles.slideCloseButton} onClick={onClose} aria-label="Close presentation">
          <span className={styles.closeX}></span>
        </button>
      </div>
      
      <div className={styles.slideContent}>
        <div className={styles.slide}>
          
          <div className={styles.svgContainer}>
            {/* SVG content with animated lines */}
            <div className={styles.svgContent} key={`svg-${currentSlide}`}>
              {renderCurrentSlide()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidePresentation;
