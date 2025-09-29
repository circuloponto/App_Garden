import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import SvgComponent from './SvgComponent';
import styles from './TrichordsDisplay.module.css';
import { trichordMappings as defaultTrichordMappings, trichordPriorities as defaultTrichordPriorities } from '../data/connections.js';

// Import all unified trichord SVGs directly
// Eight trichords
import trichord_eight_eight from '../assets/SVGs/trichordsUnity/trichord_eight_eight.svg';
import trichord_eight_seventeen from '../assets/SVGs/trichordsUnity/trichord_eight_seventeen.svg';
import trichord_eight_ten from '../assets/SVGs/trichordsUnity/trichord_eight_ten.svg';
import trichord_three_eight from '../assets/SVGs/trichordsUnity/trichord_three_eight.svg';
import trichord_one_three from '../assets/SVGs/trichordsUnity/trichord_one_three.svg';
import trichord_sixteen_three from '../assets/SVGs/trichordsUnity/trichord_sixteen_three.svg';
import trichord_sixteen_five from '../assets/SVGs/trichordsUnity/trichord_sixteen_five.svg';
// trichord_eight_sixteen.svg is missing from the trichordsUnity folder
import trichord_sixteen_sixteen from '../assets/SVGs/trichordsUnity/trichord_sixteen_sixteen.svg';
import trichord_sixteen_eighteen from '../assets/SVGs/trichordsUnity/trichord_sixteen_eighteen.svg';
import trichord_sixteen_seventeen from '../assets/SVGs/trichordsUnity/trichord_sixteen_seventeen.svg';
import trichord_sixteen_eight from '../assets/SVGs/trichordsUnity/trichord_sixteen_eight.svg';
import trichord_seventeen_seventeen from '../assets/SVGs/trichordsUnity/trichord_seventeen_seventeen.svg';
import trichord_seventeen_eighteen from '../assets/SVGs/trichordsUnity/trichord_seventeen_eighteen.svg';
import trichord_three_five1 from '../assets/SVGs/trichordsUnity/trichord_three_five1.svg';
import trichord_three_five2 from '../assets/SVGs/trichordsUnity/trichord_three_five2.svg';
import trichord_three_three from '../assets/SVGs/trichordsUnity/trichord_three_three.svg';
import trichord_ten_ten from '../assets/SVGs/trichordsUnity/trichord_ten_ten.svg';
import trichord_ten_twelve from '../assets/SVGs/trichordsUnity/trichord_ten_twelve.svg';
import trichord_ten_nineteen1 from '../assets/SVGs/trichordsUnity/trichord_ten_nineteen1.svg';

// Eighteen trichords
import trichord_eighteen_eight from '../assets/SVGs/trichordsUnity/trichord_eighteen_eight.svg';
import trichord_eighteen_eighteen from '../assets/SVGs/trichordsUnity/trichord_eighteen_eighteen.svg';
import trichord_eighteen_five from '../assets/SVGs/trichordsUnity/trichord_eighteen_five.svg';
import trichord_eighteen_nineteen from '../assets/SVGs/trichordsUnity/trichord_eighteen_nineteen.svg';
import trichord_eighteen_three from '../assets/SVGs/trichordsUnity/trichord_eighteen_three.svg';

// Fifteen trichords
import trichord_fifteen_eight from '../assets/SVGs/trichordsUnity/trichord_fifteen_eight.svg';
import trichord_fifteen_fifteen from '../assets/SVGs/trichordsUnity/trichord_fifteen_fifteen.svg';
import trichord_fifteen_nineteen1 from '../assets/SVGs/trichordsUnity/trichord_fifteen_nineteen1.svg';
import trichord_fifteen_nineteen2 from '../assets/SVGs/trichordsUnity/trichord_fifteen_nineteen2.svg';
import trichord_fifteen_nineteen3 from '../assets/SVGs/trichordsUnity/trichord_fifteen_nineteen3.svg';
import trichord_fifteen_five from '../assets/SVGs/trichordsUnity/trichord_fifteen_five.svg';
import trichord_fifteen_sixteen from '../assets/SVGs/trichordsUnity/trichord_fifteen_sixteen.svg';
import trichord_fifteen_ten1 from '../assets/SVGs/trichordsUnity/trichord_fifteen_ten1.svg';
import trichord_fifteen_three1 from '../assets/SVGs/trichordsUnity/trichord_fifteen_three1.svg';
import trichord_fifteen_three2 from '../assets/SVGs/trichordsUnity/trichord_fifteen_three2.svg';

// Five trichords
import trichord_five_five from '../assets/SVGs/trichordsUnity/trichord_five_five.svg';

// Nineteen trichords
import trichord_nineteen_eight from '../assets/SVGs/trichordsUnity/trichord_nineteen_eight.svg';
import trichord_nineteen_five from '../assets/SVGs/trichordsUnity/trichord_nineteen_five.svg';
import trichord_nineteen_nineteen from '../assets/SVGs/trichordsUnity/trichord_nineteen_nineteen.svg';
import trichord_nineteen_three1 from '../assets/SVGs/trichordsUnity/trichord_nineteen_three1.svg';
import trichord_nineteen_three2 from '../assets/SVGs/trichordsUnity/trichord_nineteen_three2.svg';
import trichord_nineteen_twentyOne from '../assets/SVGs/trichordsUnity/trichord_nineteen_twentyOne.svg';

// Thirteen trichords
import trichord_thirteen_fifteen from '../assets/SVGs/trichordsUnity/trichord_thirteen_fifteen.svg';

// Additional trichords
import trichord_one_one from '../assets/SVGs/trichordsUnity/trichord_one_one.svg';
import trichord_twelve_twelve from '../assets/SVGs/trichordsUnity/trichord_twelve_twelve.svg';
import trichord_thirteen_thirteen from '../assets/SVGs/trichordsUnity/trichord_thirteen_thirteen.svg';
import trichord_twentyOne_twentyOne from '../assets/SVGs/trichordsUnity/trichord_twentyOne_twentyOne.svg';

// Create a static mapping of trichord types to their unified SVG imports
const trichordSvgs = {
  'eight_eight': trichord_eight_eight,
  'eight_seventeen': trichord_eight_seventeen,
  'eight_ten': trichord_eight_ten,
  'three_eight': trichord_three_eight,
  'one_three': trichord_one_three,
  'sixteen_three': trichord_sixteen_three,
  'sixteen_five': trichord_sixteen_five,
  // 'eight_sixteen': trichord_eight_sixteen, // SVG file is missing
  'sixteen_sixteen': trichord_sixteen_sixteen,
  'sixteen_eighteen': trichord_sixteen_eighteen,
  'sixteen_seventeen': trichord_sixteen_seventeen,
  'sixteen_eight': trichord_sixteen_eight,
  'seventeen_seventeen': trichord_seventeen_seventeen,
  'seventeen_eighteen': trichord_seventeen_eighteen,
  'three_five1': trichord_three_five1,
  'three_five2': trichord_three_five2,
  'three_three': trichord_three_three,
  'ten_ten': trichord_ten_ten,
  'ten_twelve': trichord_ten_twelve,
  'ten_nineteen': trichord_ten_nineteen1,
  'eighteen_eight': trichord_eighteen_eight,
  'eighteen_eighteen': trichord_eighteen_eighteen,
  'eighteen_five': trichord_eighteen_five,
  'eighteen_nineteen': trichord_eighteen_nineteen,
  'eighteen_three': trichord_eighteen_three,
  'fifteen_eight': trichord_fifteen_eight,
  'fifteen_fifteen': trichord_fifteen_fifteen,
  'fifteen_five': trichord_fifteen_five,
  'fifteen_nineteen1': trichord_fifteen_nineteen1,
  'fifteen_nineteen2': trichord_fifteen_nineteen2,
  'fifteen_nineteen3': trichord_fifteen_nineteen3,
  'fifteen_sixteen': trichord_fifteen_sixteen,
  'fifteen_ten': trichord_fifteen_ten1,
  'fifteen_three1': trichord_fifteen_three1,
  'fifteen_three2': trichord_fifteen_three2,
  'five_five': trichord_five_five,
  'nineteen_eight': trichord_nineteen_eight,
  'nineteen_five': trichord_nineteen_five,
  'nineteen_nineteen': trichord_nineteen_nineteen,
  'nineteen_three1': trichord_nineteen_three1,
  'nineteen_three2': trichord_nineteen_three2,
  'nineteen_twentyOne': trichord_nineteen_twentyOne,
  'thirteen_fifteen': trichord_thirteen_fifteen,
  'one_one': trichord_one_one,
  'twelve_twelve': trichord_twelve_twelve,
  'thirteen_thirteen': trichord_thirteen_thirteen,
  'twentyOne_twentyOne': trichord_twentyOne_twentyOne
};

// Function to get trichord SVGs with enhanced matching
function getTrichordSvg(trichordType) {
  // Direct match
  if (trichordSvgs[trichordType]) {
    return trichordSvgs[trichordType];
  }

  const parts = trichordType.split('_');
  if (parts.length === 2) {
    const reversedType = `${parts[1]}_${parts[0]}`;
    if (trichordSvgs[reversedType]) {
      return trichordSvgs[reversedType];
    }
  }

  // No match found
  console.warn(`No trichord SVG found for type: ${trichordType}`);
  return null;
}

/**
 * Component that displays trichord SVGs based on chord selections
 * @param {Object} props
 * @param {boolean} props.isVisible - Whether the trichords should be visible
 * @param {Array} props.selectedChords - Array of selected chord names
 * @param {string} props.hoveredChord - Currently hovered chord name
 * @param {Function} props.onTrichordHover - Callback when a trichord is hovered
 * @param {Object} props.trichordMappings - Mapping of chord names to trichord SVG filenames
 * @param {Object} props.trichordPriorities - Priority order for displaying trichords
 * @param {string} props.trichordColor - Color for trichords
 */
const TrichordsDisplay = ({ 
  isVisible = true, 
  selectedChords = [], 
  hoveredChord = null,
  onTrichordHover = () => {},
  trichordMappings = defaultTrichordMappings,
  trichordPriorities = defaultTrichordPriorities,
  trichordColor = '#ffffff' // Add trichordColor prop with default value
}) => {
  // Debug props
  console.log('TrichordsDisplay props:', { 
    isVisible, 
    selectedChords: selectedChords || [], 
    trichordMappingsProvided: Object.keys(trichordMappings || {}).length > 0 
  });
  const [hoveredTrichord, setHoveredTrichord] = useState(null);
  const [visibleTrichords, setVisibleTrichords] = useState([]);
  const containerRef = useRef(null);

  // Effect to update visible trichords when selected chords change
  useEffect(() => {
    console.log('TrichordsDisplay useEffect: selectedChords or visibility changed');
    console.log('isVisible:', isVisible);
    console.log('selectedChords:', selectedChords);
    console.log('trichordMappings keys:', Object.keys(trichordMappings));
    
    // Check if we have a selected chord that exists in our mappings
    if (selectedChords && selectedChords.length > 0) {
      console.log('Selected chord mappings:');
      selectedChords.forEach(chord => {
        const mappings = trichordMappings[chord] || [];
        console.log(`- ${chord}: ${mappings.length} trichords [${mappings.join(', ')}]`);
      });
    }
    
    const updatedTrichords = getVisibleTrichords();
    console.log('FINAL TRICHORDS TO RENDER:', updatedTrichords.length > 0 ? 
      updatedTrichords.map(t => `${t.id} (svg: ${t.svg ? '✓' : '✗'})`) : 
      'none');
    setVisibleTrichords(updatedTrichords);
    console.log('======= TRICHORDS DISPLAY UPDATE END =======');
  }, [isVisible, selectedChords, trichordMappings, trichordPriorities]);

  // Effect to update SVG colors when trichordColor changes
  // Using useLayoutEffect for synchronous DOM updates before browser paint
  useLayoutEffect(() => {
    // The SvgComponent now handles the color updates internally
    // This effect is kept for potential future enhancements
  }, [visibleTrichords]);

  // Helper function to get trichord SVGs based on selected chords
  const getVisibleTrichords = () => {
    console.log('%c======= GETTING VISIBLE TRICHORDS =======', 'background: #4a4a4a; color: #ff9; padding: 3px; font-weight: bold');
    console.log('isVisible:', isVisible);
    console.log('selectedChords:', selectedChords);
    console.log('trichordMappings available:', Object.keys(trichordMappings).length > 0 ? 'Yes' : 'No');
    
    if (!isVisible) {
      console.log('TrichordsDisplay not visible - returning empty array');
      return [];
    }
    
    if (!selectedChords || selectedChords.length === 0) {
      console.log('No chords selected - returning empty array');
      return [];
    }
    
    console.log(`%cProcessing ${selectedChords.length} selected chords`, 'color: #6af; font-weight: bold');
    
    // Check if trichordMappings is defined
    if (!trichordMappings) {
      console.error('trichordMappings is undefined or null');
      return [];
    }
    
    // Special handling for exactly 2 selected chords - show only common trichords
    if (selectedChords.length === 2) {
      console.log('%cExactly 2 chords selected - filtering for common trichords', 'color: #ff9; font-weight: bold');
      const chord1 = selectedChords[0];
      const chord2 = selectedChords[1];
      
      // Make sure both chords exist in the mappings
      if (!trichordMappings[chord1] || !trichordMappings[chord2]) {
        console.warn('One or both selected chords not found in trichord mappings');
        console.log('Available chord mappings:', Object.keys(trichordMappings).join(', '));
        // Fall back to normal behavior
      } else {
        const trichords1 = trichordMappings[chord1];
        const trichords2 = trichordMappings[chord2];
        
        console.log(`Chord ${chord1} has ${trichords1.length} trichords:`, trichords1);
        console.log(`Chord ${chord2} has ${trichords2.length} trichords:`, trichords2);
        
        // Find common trichords between the two selected chords
        const commonTrichords = trichords1.filter(trichord => trichords2.includes(trichord));
        
        console.log(`Found ${commonTrichords.length} common trichords:`, commonTrichords);
        
        if (commonTrichords.length === 0) {
          console.log('No common trichords found - showing all trichords from both chords');
          // If no common trichords, fall back to normal behavior
        } else {
          // Sort common trichords by priority and map to trichord objects
          const trichords = commonTrichords
            .sort((a, b) => (trichordPriorities[a] || 999) - (trichordPriorities[b] || 999))
            .map(trichordType => {
              console.log(`%cMapping common trichord: ${trichordType}`, 'color: #afa');
              
              try {
                // Get both electron and tabby versions of the trichord
                const svgPaths = getTrichordSvg(trichordType);
                
                if (!svgPaths) {
                  console.error(`❌ No SVG paths found for ${trichordType}`);
                  return null;
                }
                
                console.log(`  SVG path for ${trichordType}:`, svgPaths ? '✓' : '✗');
                
                // Create a trichord object with the unified SVG
                const trichord = {
                  id: trichordType,
                  svg: svgPaths,
                  color: trichordColor,
                  className: `trichord_${trichordType}`
                };
                console.log(`  ✅ Created trichord object for ${trichordType}`);
                return trichord;
              } catch (error) {
                console.error(`  ❌ Error creating trichord object for ${trichordType}:`, error);
                return null;
              }
            })
            .filter(Boolean);
          
          console.log('%cFINAL COMMON TRICHORDS:', 'background: #4a4a4a; color: #ff9; padding: 3px; font-weight: bold');
          trichords.forEach(t => console.log(`  - ${t.id} (svg: ${t.svg ? '✓' : '✗'})`));
          console.log(`Total: ${trichords.length} common trichords`);
          console.log('%c======= END GETTING VISIBLE TRICHORDS =======', 'background: #4a4a4a; color: #ff9; padding: 3px; font-weight: bold');
          return trichords;
        }
      }
    }
    
    // Default behavior for 1 or 3+ selected chords
    // Get all unique trichord types for all selected chords
    const allTrichordTypes = new Set();
    // Track which trichords have already been rendered to avoid duplicates
    const renderedTrichords = new Map();
    
    // Process each selected chord
    selectedChords.forEach(chord => {
      console.log(`%cChord: ${chord}`, 'color: #6af');
      
      // Check if the chord exists in the mappings
      if (trichordMappings[chord]) {
        const types = trichordMappings[chord];
        console.log(`  Found ${types.length} trichord types:`, types);
        
        // Add each trichord type to our set of unique types
        types.forEach(type => {
          // Check if this trichord has already been added
          if (!renderedTrichords.has(type)) {
            allTrichordTypes.add(type);
            renderedTrichords.set(type, chord); // Track which chord added this trichord
            console.log(`  - Added: ${type} from chord ${chord}`);
          } else {
            console.log(`  - Skipped duplicate: ${type} (already added by chord ${renderedTrichords.get(type)})`);
          }
        });
      } else {
        console.warn(`  ⚠️ No trichord mappings found for chord: ${chord}`);
        console.log(`  Available chord mappings: ${Object.keys(trichordMappings).join(', ')}`);
      }
    });
    
    // Convert set back to array
    const uniqueTrichordTypes = Array.from(allTrichordTypes);
    console.log(`%cFound ${uniqueTrichordTypes.length} unique trichord types:`, 'color: #6af; font-weight: bold');
    uniqueTrichordTypes.forEach(type => console.log(`  - ${type}`));
    
    // Check if we have any trichord types
    if (uniqueTrichordTypes.length === 0) {
      console.warn('⚠️ No trichord types found for any selected chords');
      return [];
    }
    
    // Debug trichordSvgs
    console.log(`%cAvailable SVG mappings: ${Object.keys(trichordSvgs).length}`, 'color: #6af');
    
    const trichords = uniqueTrichordTypes
      .sort((a, b) => (trichordPriorities[a] || 999) - (trichordPriorities[b] || 999))
      .map(trichordType => {
        console.log(`%cMapping trichord: ${trichordType}`, 'color: #afa');
        
        try {
          // Get both electron and tabby versions of the trichord
          const svgPaths = getTrichordSvg(trichordType);
          
          if (!svgPaths) {
            console.error(`❌ No SVG paths found for ${trichordType}`);
            return null;
          }
          
          console.log(`  SVG path for ${trichordType}:`, svgPaths ? '✓' : '✗');
          
          // Create a trichord object with the unified SVG
          const trichord = {
            id: trichordType,
            svg: svgPaths,
            color: trichordColor,
            className: `trichord_${trichordType}`
          };
          console.log(`  ✅ Created trichord object for ${trichordType}`);
          return trichord;
        } catch (error) {
          console.error(`  ❌ Error creating trichord object for ${trichordType}:`, error);
          return null;
        }
      })
      .filter(Boolean);
    
    console.log('%cFINAL TRICHORDS:', 'background: #4a4a4a; color: #ff9; padding: 3px; font-weight: bold');
    trichords.forEach(t => console.log(`  - ${t.id} (svg: ${t.svg ? '✓' : '✗'})`));
    console.log(`Total: ${trichords.length} trichords`);
    console.log('%c======= END GETTING VISIBLE TRICHORDS =======', 'background: #4a4a4a; color: #ff9; padding: 3px; font-weight: bold');
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
  
  // Function to get CSS class name for a trichord
  const getTrichordClassName = (trichordId, type) => {
    // Convert trichord ID format (e.g., 'one_three') to camelCase format (e.g., 'oneThree')
    const camelCaseName = trichordId.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    
    // Create the class name based on type (wrapper, electron, tabby)
    const className = `trichord_${trichordId}`;
    
    console.log(`Generated class name for ${trichordId} (${type}): ${className}`);
    return className;
  };

  // Function to render a single unified trichord
  const renderTrichord = (trichord) => {
    console.log(`%cRENDERING TRICHORD: ${trichord.id}`, 'background: #333; color: #bada55; padding: 2px 4px; border-radius: 2px');
    console.log(`  - Unified SVG: ${trichord.svg ? 'Available ✓' : 'Missing ✗'}`);
    
    // Get CSS class name for this trichord
    const trichordClass = getTrichordClassName(trichord.id, 'unified');
    
    // In React, imported SVGs are already URL strings that can be used directly
    return (
      <div 
        key={trichord.id}
        className={styles.trichordPair}
      >
        <div 
          className={styles.trichordWrapper}
          data-trichord-type={trichord.id}
        >
          <SvgComponent
            src={trichord.svg}
            alt={`Trichord: ${trichord.id}`}
            className={`${styles.trichordSvg} ${trichordClass}`}
            data-trichord-id={trichord.id}
            data-trichord-type={trichord.id}
            trichordColor={trichord.color || '#be4bdb'}
          />
        </div>
      </div>
    );
  };
  
  console.log('Rendering trichords container with', visibleTrichords.length, 'trichords');
  console.log('Trichord IDs:', visibleTrichords.map(t => t.id));
  
  return (
    <div className={styles.trichordsContainer} ref={containerRef}>
      {visibleTrichords.map(trichord => {
        console.log('Rendering trichord in container:', trichord.id);
        return renderTrichord(trichord);
      })}
    </div>
  );
};

export default TrichordsDisplay;
