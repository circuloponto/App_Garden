import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FretboardDisplayerNew from '../components/fretboardDisplayerNew';
import { findAllScalePatterns, getAllScaleNotesOnFretboard } from '../utils/scalePatterns';
import { generateArpeggiosFromScale, findArpeggioInPattern, createArpeggioSequence, getOptimalArpeggioPositions } from '../utils/arpeggios';
import styles from './fretboardPage.module.css';

const FretboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract all state data from location
  const { scaleData, selectedChords = [] } = location.state || {};
  
  console.log('Raw scaleData received:', scaleData);
  
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
  
  // Create full 8-note scale by combining both chords and sorting chromatically
  const fullScale = scaleData ? 
    sortChromatically([...firstChord.spelling, ...secondChord.spelling]) : 
    firstChord.spelling;
  
  console.log('Full 8-note scale:', fullScale);
  
  // Helper function to sort notes chromatically
  function sortChromatically(notes) {
    const chromaticOrder = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    return notes.sort((a, b) => chromaticOrder.indexOf(a) - chromaticOrder.indexOf(b));
  }

  // State for orientation
  const [orientation, setOrientation] = useState('vertical');

  // State for scale patterns
  const [scalePatterns, setScalePatterns] = useState([]);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(-1);
  const [allScaleNotes, setAllScaleNotes] = useState([]);
  const [clearAll, setClearAll] = useState(true); // Start with clear fretboard
  
  // State for arpeggios
  const [arpeggios, setArpeggios] = useState([]);
  const [currentArpeggioIndex, setCurrentArpeggioIndex] = useState(-1);
  const [arpeggioSequence, setArpeggioSequence] = useState([]);
  const [currentSequenceStep, setCurrentSequenceStep] = useState(-1);
  const [isPlayingArpeggio, setIsPlayingArpeggio] = useState(false);

  // Initialize scale patterns when component mounts or chord data changes
  useEffect(() => {
    if (firstChord && firstChord.spelling && firstChord.spelling.length > 0) {
      try {
        const patterns = findAllScalePatterns(fullScale, firstChord.root);
        const allNotes = getAllScaleNotesOnFretboard(fullScale, firstChord.root);
        const scaleArpeggios = generateArpeggiosFromScale(fullScale, firstChord.root);
        
        console.log('Scale patterns found:', patterns.length);
        console.log('All scale notes found:', allNotes.length);
        console.log('Scale spelling:', firstChord.spelling);
        console.log('Scale root:', firstChord.root);
        console.log('Arpeggios generated:', scaleArpeggios.length);
        console.log('Arpeggios:', scaleArpeggios);
        
        setScalePatterns(patterns);
        setAllScaleNotes(allNotes);
        setArpeggios(scaleArpeggios);
        setCurrentPatternIndex(-1); // Start with no pattern selected
        setCurrentArpeggioIndex(-1); // Start with no arpeggio selected
      } catch (error) {
        console.error('Error generating scale patterns:', error);
        setScalePatterns([]);
        setAllScaleNotes([]);
      }
    }
  }, [firstChord]);

  // Toggle orientation
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
  };

  // Cycle through scale patterns
  const nextPattern = () => {
    if (scalePatterns.length === 0) return;
    setCurrentPatternIndex(prev => (prev + 1) % scalePatterns.length);
    setClearAll(false); // Turn off clear all when showing patterns
    setCurrentArpeggioIndex(-1); // Turn off arpeggio when changing patterns
    setIsPlayingArpeggio(false);
  };

  // Toggle between clear all and show all scale notes
  const toggleClearAll = () => {
    const newClearAll = !clearAll;
    setClearAll(newClearAll);
    
    if (newClearAll) {
      // If clearing, turn off everything
      setCurrentPatternIndex(-1);
      setCurrentArpeggioIndex(-1);
      setIsPlayingArpeggio(false);
    }
    // Don't automatically turn on patterns when unclearning
  };

  // Cycle through arpeggios
  const nextArpeggio = () => {
    if (arpeggios.length === 0 || currentPatternIndex < 0) {
      console.log('Cannot cycle arpeggio:', { 
        arpeggiosLength: arpeggios.length, 
        currentPatternIndex, 
        arpeggios 
      });
      return;
    }
    
    const newIndex = (currentArpeggioIndex + 1) % arpeggios.length;
    console.log('Setting arpeggio index to:', newIndex, 'of', arpeggios.length);
    setCurrentArpeggioIndex(newIndex);
    setClearAll(false);
    setIsPlayingArpeggio(false);
  };

  // Play current arpeggio sequence
  const playArpeggioSequence = () => {
    if (currentArpeggioIndex < 0 || currentPatternIndex < 0 || isPlayingArpeggio) return;
    
    const currentArpeggio = arpeggios[currentArpeggioIndex];
    const currentPattern = scalePatterns[currentPatternIndex];
    
    if (!currentArpeggio || !currentPattern) return;
    
    // Find arpeggio positions in current pattern
    const arpeggioPositions = findArpeggioInPattern(currentArpeggio, currentPattern);
    const optimalPositions = getOptimalArpeggioPositions(arpeggioPositions);
    const sequence = createArpeggioSequence(optimalPositions, 600); // 600ms between notes
    
    setArpeggioSequence(sequence);
    setIsPlayingArpeggio(true);
    setCurrentSequenceStep(0);
    
    // Play sequence with timing
    sequence.forEach((step, index) => {
      setTimeout(() => {
        setCurrentSequenceStep(index);
        if (index === sequence.length - 1) {
          // End of sequence
          setTimeout(() => {
            setIsPlayingArpeggio(false);
            setCurrentSequenceStep(-1);
          }, 600);
        }
      }, step.delay);
    });
  };

  // Get current pattern
  const currentPattern = currentPatternIndex >= 0 ? scalePatterns[currentPatternIndex] : null;
  
  // Get current arpeggio data for fretboard
  const getCurrentArpeggioData = () => {
    if (currentArpeggioIndex < 0 || !currentPattern || arpeggios.length === 0) {
      // Only log if we're actually trying to get arpeggio data
      if (currentArpeggioIndex >= 0) {
        console.log('No arpeggio data:', { 
          currentArpeggioIndex, 
          hasCurrentPattern: !!currentPattern, 
          arpeggiosLength: arpeggios.length,
          hasArpeggio: currentArpeggioIndex >= 0 && currentArpeggioIndex < arpeggios.length ? !!arpeggios[currentArpeggioIndex] : false
        });
      }
      return null;
    }
    
    const currentArpeggio = arpeggios[currentArpeggioIndex];
    if (!currentArpeggio) {
      console.log('Arpeggio not found at index:', currentArpeggioIndex, 'of', arpeggios.length);
      return null;
    }
    const arpeggioPositions = findArpeggioInPattern(currentArpeggio, currentPattern);
    const optimalPositions = getOptimalArpeggioPositions(arpeggioPositions);
    
    console.log('Arpeggio data generated:', {
      arpeggio: currentArpeggio,
      positionsFound: arpeggioPositions.length,
      optimalPositions: optimalPositions.length
    });
    
    return {
      arpeggio: currentArpeggio,
      positions: arpeggioPositions,
      optimalPositions: optimalPositions,
      currentStep: currentSequenceStep,
      isPlaying: isPlayingArpeggio
    };
  };
  
  const currentArpeggioData = getCurrentArpeggioData();

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
        
        <div className={styles.controls}>
          <button 
            className={styles.orientationButton}
            onClick={toggleOrientation}
          >
            {orientation === 'vertical' ? 'Switch to Horizontal' : 'Switch to Vertical'}
          </button>
          
          <button 
            className={styles.patternButton}
            onClick={nextPattern}
            disabled={scalePatterns.length === 0}
          >
            Next Pattern ({currentPatternIndex >= 0 ? currentPatternIndex + 1 : 0}/{scalePatterns.length})
          </button>
          
          <button 
            className={`${styles.clearButton} ${clearAll ? styles.active : ''}`}
            onClick={toggleClearAll}
          >
            {clearAll ? 'Show Notes' : 'Clear All'}
          </button>
          
          <button 
            className={styles.arpeggioButton}
            onClick={nextArpeggio}
            disabled={arpeggios.length === 0 || currentPatternIndex < 0}
          >
            Next Arpeggio ({currentArpeggioIndex >= 0 ? currentArpeggioIndex + 1 : 0}/{arpeggios.length})
          </button>
          
          <button 
            className={`${styles.playButton} ${isPlayingArpeggio ? styles.playing : ''}`}
            onClick={playArpeggioSequence}
            disabled={currentArpeggioIndex < 0 || currentPatternIndex < 0 || isPlayingArpeggio}
          >
            {isPlayingArpeggio ? 'Playing...' : 'Play Arpeggio'}
          </button>
        </div>
        
        {currentPattern && (
          <div className={styles.patternInfo}>
            <span>Current Pattern: {currentPattern.name}</span>
            <span>Frets: {currentPattern.fretRange.min}-{currentPattern.fretRange.max}</span>
          </div>
        )}
        
        {currentArpeggioIndex >= 0 && arpeggios[currentArpeggioIndex] && (
          <div className={styles.arpeggioInfo}>
            <span>Current Arpeggio: {arpeggios[currentArpeggioIndex].name}</span>
            <span>Notes: {arpeggios[currentArpeggioIndex].notes.join(' - ')}</span>
          </div>
        )}
      </div>
      
      <div className={styles.fretboardContainer}>
        <FretboardDisplayerNew
          firstChord={firstChord}
          secondChord={secondChord}
          orientation={orientation}
          firstChordColor="#f08c00"
          secondChordColor="#00e1ff"
          flipStrings={true}
          scalePattern={currentPattern}
          showAllScale={false} // Don't show all scale by default
          allScaleNotes={allScaleNotes}
          clearAll={clearAll}
          arpeggioData={currentArpeggioData}
        />
      </div>
    </div>
  );
};

export default FretboardPage;
