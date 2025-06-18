import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FretboardDisplayerNew from '../components/fretboardDisplayerNew';
import styles from './fretboardPage.module.css';

const FretboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract all state data from location
  const { scaleData, selectedChords = [] } = location.state || {};
  
  // Default chord data if no scale data is provided
  const defaultFirstChord = {
    name: 'C Major',
    root: 'C',
    spelling: ['C', 'E', 'G'],
    positions: [
      { string: 5, fret: 3 },
      { string: 4, fret: 2 },
      { string: 3, fret: 0 },
      { string: 2, fret: 1 },
      { string: 1, fret: 0 }
    ]
  };

  const defaultSecondChord = {
    name: 'G Major',
    root: 'G',
    spelling: ['G', 'B', 'D'],
    positions: [
      { string: 6, fret: 3 },
      { string: 5, fret: 2 },
      { string: 4, fret: 0 },
      { string: 3, fret: 0 },
      { string: 2, fret: 0 },
      { string: 1, fret: 3 }
    ]
  };
  
  // Use scale data from infoBox if available, otherwise use defaults
  const firstChord = scaleData?.firstScale || defaultFirstChord;
  const secondChord = scaleData?.secondScale || defaultSecondChord;

  // State for orientation
  const [orientation, setOrientation] = useState('vertical');

  // Toggle orientation
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
  };

  return (
    <div className={styles.fretboardPage}>
      <div className={styles.header}>
        
        <Link 
          to="/" 
          state={{ 
            preserveSelections: true, 
            selectedChords: selectedChords 
          }} 
          className={styles.backLink}
        >
          Back to Home
        </Link>
        <button 
          className={styles.orientationButton}
          onClick={toggleOrientation}
        >
          {orientation === 'vertical' ? 'Switch to Horizontal' : 'Switch to Vertical'}
        </button>
      </div>
      
      <div className={styles.fretboardContainer}>
        <FretboardDisplayerNew
          firstChord={firstChord}
          secondChord={secondChord}
          orientation={orientation}
          firstChordColor="#f08c00"
          secondChordColor="#00e1ff"
        />
      </div>
    </div>
  );
};

export default FretboardPage;
