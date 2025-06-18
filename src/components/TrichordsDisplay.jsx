import React, { useState, useEffect } from 'react';
import styles from './TrichordsDisplay.module.css';

// Import SVG files directly
import diminishedTrichord from '../assets/SVGs/trichords/diminishedTrichord.svg';
import one_three from '../assets/SVGs/trichords/one_three.svg';
import thirteen_fifteen from '../assets/SVGs/trichords/thirteen_fifteen.svg';

// Map of trichord IDs to their SVG imports
const trichordSvgMap = {
  'diminishedTrichord': diminishedTrichord,
  'one_three': one_three,
  'thirteen_fifteen': thirteen_fifteen
};

/**
 * Component that displays trichord SVGs based on chord selections
 * @param {Object} props
 * @param {boolean} props.isVisible - Whether the trichords should be visible
 * @param {Array} props.selectedChords - Array of selected chord names
 * @param {string} props.hoveredChord - Currently hovered chord name
 * @param {Function} props.onTrichordHover - Callback when a trichord is hovered
 * @param {Object} props.trichordMappings - Mapping of chord names to trichord SVG filenames
 * @param {Object} props.trichordPriorities - Priority order for displaying trichords
 */
const TrichordsDisplay = ({ 
  isVisible = true, 
  selectedChords = [], 
  hoveredChord = null, 
  onTrichordHover,
  trichordMappings = {},
  trichordPriorities = {}
}) => {
  const [hoveredTrichord, setHoveredTrichord] = useState(null);
  const [visibleTrichords, setVisibleTrichords] = useState([]);
  
  // Update visible trichords when selected chords change
  useEffect(() => {
    const trichords = getVisibleTrichords();
    console.log('TrichordsDisplay - Visible trichords:', trichords);
    console.log('TrichordsDisplay - Props:', { isVisible, selectedChords, hoveredChord });
    setVisibleTrichords(trichords);
  }, [selectedChords, isVisible, hoveredChord]);
  
  // Helper function to get visible trichords based on selected chords
  const getVisibleTrichords = () => {
    if (!isVisible) {
      return [];
    }
    if (!selectedChords || selectedChords.length === 0) {
      console.log('No selected chords, returning empty array');
      return [];
    }
    
    // Get the first selected chord
    const selectedChord = selectedChords[0];
    console.log('Selected chord:', selectedChord);
    
    // Get trichord types for this chord from mappings
    const trichordTypes = trichordMappings[selectedChord] || [];
    console.log('Trichord types for selected chord:', trichordTypes);
    
    if (trichordTypes.length === 0) {
      console.log('No trichord types found for this chord');
      return [];
    }
    
    // Create trichord objects for all trichord types
    const trichords = trichordTypes
      .filter(trichordType => trichordSvgMap[trichordType]) // Only include types that have SVGs
      .sort((a, b) => {
        // Sort by priority if available
        const priorityA = trichordPriorities[a] || 999;
        const priorityB = trichordPriorities[b] || 999;
        return priorityA - priorityB;
      })
      .map(trichordType => {
        // Create a trichord object with the SVG path
        const trichord = {
          id: trichordType,
          src: trichordSvgMap[trichordType],
          className: `trichord_${trichordType}`
        };
        console.log('Created trichord object:', trichord);
        return trichord;
      });
    
    console.log('All trichord objects:', trichords);
    return trichords;
  };
  
  // Handle trichord hover
  const handleTrichordHover = (trichordId) => {
    setHoveredTrichord(trichordId);
    if (onTrichordHover) {
      onTrichordHover(trichordId);
    }
  };
  
  // Handle trichord hover end
  const handleTrichordHoverEnd = () => {
    setHoveredTrichord(null);
    if (onTrichordHover) {
      onTrichordHover(null);
    }
  };
  
  // If not visible, return null
  if (!isVisible) {
    console.log('TrichordsDisplay: Not visible, returning null');
    return null;
  }
  
  // If no trichords to show, show a fallback
  if (visibleTrichords.length === 0) {
    console.log('TrichordsDisplay: No visible trichords, showing fallback');
    // Show a fallback trichord if we have selected chords but no matching trichords
    if (selectedChords && selectedChords.length > 0) {
      return (
        <div className={styles.trichordsContainer}>
          <div className={styles.trichordWrapper}>
            <img 
              src={diminishedTrichord} 
              className={styles.trichordSvg}
              alt="Fallback Trichord"
            />
           {/*  <div className={styles.trichordLabel}>
              Fallback: {selectedChords[0]}
            </div> */}
          </div>
        </div>
      );
    }
    return null;
  }
  
  return (
    <div className={styles.trichordsContainer}>
      {visibleTrichords.map((trichord) => (
        <div 
          key={trichord.id}
          className={`${styles.trichordWrapper} ${hoveredTrichord === trichord.id ? styles.hovered : ''}`}
          onMouseEnter={() => handleTrichordHover(trichord.id)}
          onMouseLeave={handleTrichordHoverEnd}
        >
          <img 
            src={trichord.src} 
            className={`${styles.trichordSvg} ${styles[trichord.className]}`}
            alt={`Trichord: ${trichord.id}`}
          />
        {/*   <div className={styles.trichordLabel}>
            {trichord.id}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TrichordsDisplay;
