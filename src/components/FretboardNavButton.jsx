import React from 'react';
import { Link } from 'react-router-dom';
import styles from './fretboardNavButton.module.css';

/**
 * A navigation button that appears only when scale data is available
 * @param {Object} props
 * @param {Object} props.scaleData - The scale data from infoBox
 */
const FretboardNavButton = ({ scaleData }) => {
  // Only render the button if scale data is available
  if (!scaleData || (!scaleData.firstScale && !scaleData.secondScale)) {
    return null;
  }

  return (
    <Link 
      to="/fretboard" 
      state={{ scaleData }}
      className={styles.fretboardNavButton}
    >
      View on Fretboard
    </Link>
  );
};

export default FretboardNavButton;
