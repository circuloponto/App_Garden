import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './fretboardNavButton.module.css';

/**
 * A navigation button that appears only when scale data is available
 * @param {Object} props
 * @param {Object} props.scaleData - The scale data from infoBox
 * @param {Array} props.selectedChords - The currently selected chords to preserve
 */
const FretboardNavButton = ({ scaleData, selectedChords }) => {
  // Ensure selectedChords is an array and log for debugging
  const chords = Array.isArray(selectedChords) ? selectedChords : [];
  console.log('FretboardNavButton passing selectedChords:', chords);

  // Only render the button if scale data is available
  if (!scaleData || (!scaleData.firstScale && !scaleData.secondScale)) {
    return null;
  }

  return (
    <Link 
      to="/fretboard" 
      state={{ 
        scaleData,
        selectedChords: chords, // Pass the selected chords to preserve them
        preserveSelections: true // Flag to indicate we want to preserve selections
      }}
      className={styles.fretboardNavButton}
    >
      View on Fretboard
    </Link>
  );
};

export default FretboardNavButton;
