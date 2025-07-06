import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import SvgComponent from './SvgComponent';
import styles from './TrichordsDisplay.module.css';
import { trichordMappings as defaultTrichordMappings, trichordPriorities as defaultTrichordPriorities } from '../data/connections.js';

// Import all trichord SVGs directly
// Diminished trichord
import diminishedTrichord_electron from '../assets/SVGs/trichords/diminishedTrichord_electron.svg';
import diminishedTrichord_tabby from '../assets/SVGs/trichords/diminishedTrichord_tabby.svg';

// Eight trichords
import eight_eight_electron from '../assets/SVGs/trichords/eight_eight_electron.svg';
import eight_eight_tabby from '../assets/SVGs/trichords/eight_eight_tabby.svg';
import eight_seventeen_electron from '../assets/SVGs/trichords/eight_seventeen_electron.svg';
import eight_seventeen_tabby from '../assets/SVGs/trichords/eight_seventeen_tabby.svg';
import eight_ten_electron from '../assets/SVGs/trichords/eight_ten_electron.svg';
import eight_ten_tabby from '../assets/SVGs/trichords/eight_ten_tabby.svg';
import three_eight_electron from '../assets/SVGs/trichords/three_eight_electron.svg';
import three_eight_tabby from '../assets/SVGs/trichords/three_eight_tabby.svg';
import one_three_electron from '../assets/SVGs/trichords/one_three_electron.svg';
import one_three_tabby from '../assets/SVGs/trichords/one_three_tabby.svg';
import sixteen_three_electron from '../assets/SVGs/trichords/sixteen_three_electron.svg';
import sixteen_three_tabby from '../assets/SVGs/trichords/sixteen_three_tabby.svg';
import sixteen_five_electron from '../assets/SVGs/trichords/sixteen_five_electron.svg';
import sixteen_five_tabby from '../assets/SVGs/trichords/sixteen_five_tabby.svg';
import eight_sixteen_electron from '../assets/SVGs/trichords/eight_sixteen_electron.svg';
import eight_sixteen_tabby from '../assets/SVGs/trichords/eight_sixteen_tabby.svg';
import sixteen_sixteen_electron from '../assets/SVGs/trichords/sixteen_sixteen_electron.svg';
import sixteen_sixteen_tabby from '../assets/SVGs/trichords/sixteen_sixteen_tabby.svg';
import sixteen_eighteen_electron from '../assets/SVGs/trichords/sixteen_eighteen_electron.svg';
import sixteen_eighteen_tabby from '../assets/SVGs/trichords/sixteen_eighteen_tabby.svg';
import sixteen_seventeen_electron from '../assets/SVGs/trichords/sixteen_seventeen_electron.svg';
import sixteen_seventeen_tabby from '../assets/SVGs/trichords/sixteen_seventeen_tabby.svg';
import seventeen_seventeen_electron from '../assets/SVGs/trichords/seventeen_seventeen_electron.svg';
import seventeen_seventeen_tabby from '../assets/SVGs/trichords/seventeen_seventeen_tabby.svg';
import seventeen_eighteen_electron from '../assets/SVGs/trichords/seventeen_eighteen_electron.svg';
import seventeen_eighteen_tabby from '../assets/SVGs/trichords/seventeen_eighteen_tabby.svg';
import three_five1_electron from '../assets/SVGs/trichords/three_five1_electron.svg';
import three_five1_tabby from '../assets/SVGs/trichords/three_five1_tabby.svg';
import three_five2_electron from '../assets/SVGs/trichords/three_five2_electron.svg';
import three_five2_tabby from '../assets/SVGs/trichords/three_five2_tabby.svg';
import three_three_electron from '../assets/SVGs/trichords/three_three_electron.svg';
import three_three_tabby from '../assets/SVGs/trichords/three_three_tabby.svg';
import ten_ten_electron from '../assets/SVGs/trichords/ten_ten_electron.svg';
import ten_ten_tabby from '../assets/SVGs/trichords/ten_ten_tabby.svg';
import ten_twelve_electron from '../assets/SVGs/trichords/ten_twelve_electron.svg';
import ten_twelve_tabby from '../assets/SVGs/trichords/ten_twelve_tabby.svg';
import ten_nineteen_electron from '../assets/SVGs/trichords/ten_nineteen_electron.svg';
import ten_nineteen_tabby from '../assets/SVGs/trichords/ten_nineteen_tabby.svg';
//import eight_nineteen_electron from '../assets/SVGs/trichords/eight_nineteen_electron.svg';
//import eight_nineteen_tabby from '../assets/SVGs/trichords/eight_nineteen_tabby.svg';
//import eight_sixteen_electron from '../assets/SVGs/trichords/eight_sixteen_electron.svg';
//import eight_sixteen_tabby from '../assets/SVGs/trichords/eight_sixteen_tabby.svg';
// Eighteen trichords
import eighteen_eight_electron from '../assets/SVGs/trichords/eighteen_eight_electron.svg';
import eighteen_eight_tabby from '../assets/SVGs/trichords/eighteen_eight_tabby.svg';
import eighteen_eighteen_electron from '../assets/SVGs/trichords/eighteen_eighteen_electron.svg';
import eighteen_eighteen_tabby from '../assets/SVGs/trichords/eighteen_eighteen_tabby.svg';
import eighteen_five_electron from '../assets/SVGs/trichords/eighteen_five_electron.svg';
import eighteen_five_tabby from '../assets/SVGs/trichords/eighteen_five_tabby.svg';
import eighteen_nineteen_electron from '../assets/SVGs/trichords/eighteen_nineteen_electron.svg';
import eighteen_nineteen_tabby from '../assets/SVGs/trichords/eighteen_nineteen_tabby.svg';
import eighteen_three_electron from '../assets/SVGs/trichords/eighteen_three_electron.svg';
import eighteen_three_tabby from '../assets/SVGs/trichords/eighteen_three_tabby.svg';

// Fifteen trichords
import fifteen_eight_electron from '../assets/SVGs/trichords/fifteen_eight_electron.svg';
import fifteen_eight_tabby from '../assets/SVGs/trichords/fifteen_eight_tabby.svg';
import fifteen_fifteen_electron from '../assets/SVGs/trichords/fifteen_fifteen_electron.svg';
import fifteen_fifteen_tabby from '../assets/SVGs/trichords/fifteen_fifteen_tabby.svg';
import fifteen_nineteen1_electron from '../assets/SVGs/trichords/fifteen_nineteen1_electron.svg';
import fifteen_nineteen1_tabby from '../assets/SVGs/trichords/fifteen_nineteen1_tabby.svg';
import fifteen_nineteen2_electron from '../assets/SVGs/trichords/fifteen_nineteen2_electron.svg';
import fifteen_nineteen2_tabby from '../assets/SVGs/trichords/fifteen_nineteen2_tabby.svg';
import fifteen_nineteen3_electron from '../assets/SVGs/trichords/fifteen_nineteen3_electron.svg';
import fifteen_nineteen3_tabby from '../assets/SVGs/trichords/fifteen_nineteen3_tabby.svg';
import fifteen_five_electron from '../assets/SVGs/trichords/fifteen_five_electron.svg';
import fifteen_five_tabby from '../assets/SVGs/trichords/fifteen_five_tabby.svg';

import fifteen_sixteen_electron from '../assets/SVGs/trichords/fifteen_sixteen_electron.svg';
import fifteen_sixteen_tabby from '../assets/SVGs/trichords/fifteen_sixteen_tabby.svg';
import fifteen_ten_electron from '../assets/SVGs/trichords/fifteen_ten_electron.svg';
import fifteen_ten_tabby from '../assets/SVGs/trichords/fifteen_ten_tabby.svg';
import fifteen_three1_electron from '../assets/SVGs/trichords/fifteen_three1_electron.svg';
import fifteen_three1_tabby from '../assets/SVGs/trichords/fifteen_three1_tabby.svg';
import fifteen_three2_electron from '../assets/SVGs/trichords/fifteen_three2_electron.svg';
import fifteen_three2_tabby from '../assets/SVGs/trichords/fifteen_three2_tabby.svg';

// Five trichords
import five_five_electron from '../assets/SVGs/trichords/five_five_electron.svg';
import five_five_tabby from '../assets/SVGs/trichords/five_five_tabby.svg';

// Nineteen trichords
import nineteen_eight_electron from '../assets/SVGs/trichords/nineteen_eight_electron.svg';
import nineteen_eight_tabby from '../assets/SVGs/trichords/nineteen_eight_tabby.svg';
import nineteen_five_electron from '../assets/SVGs/trichords/nineteen_five_electron.svg';
import nineteen_five_tabby from '../assets/SVGs/trichords/nineteen_five_tabby.svg';
import nineteen_nineteen_electron from '../assets/SVGs/trichords/nineteen_nineteen_electron.svg';
import nineteen_nineteen_tabby from '../assets/SVGs/trichords/nineteen_nineteen_tabby.svg';
import nineteen_three1_electron from '../assets/SVGs/trichords/nineteen_three1_electron.svg';
import nineteen_three1_tabby from '../assets/SVGs/trichords/nineteen_three1_tabby.svg';
import nineteen_three2_electron from '../assets/SVGs/trichords/nineteen_three2_electron.svg';
import nineteen_three2_tabby from '../assets/SVGs/trichords/nineteen_three2_tabby.svg';
import nineteen_twentOne_electron from '../assets/SVGs/trichords/nineteen_twentOne_electron.svg';
import nineteen_twentOne_tabby from '../assets/SVGs/trichords/nineteen_twentOne_tabby.svg';

// Thirteen trichords
import thirteen_fifteen_electron from '../assets/SVGs/trichords/thirteen_fifteen_electron.svg';
import thirteen_fifteen_tabby from '../assets/SVGs/trichords/thirteen_fifteen_tabby.svg';

// Create a static mapping of trichord types to their SVG imports
const trichordSvgs = {
  'diminishedTrichord': {
    electron: diminishedTrichord_electron,
    tabby: diminishedTrichord_tabby
  },
  'eight_eight': {
    electron: eight_eight_electron,
    tabby: eight_eight_tabby
  },
  'eight_seventeen': {
    electron: eight_seventeen_electron,
    tabby: eight_seventeen_tabby
  },
  'eight_ten': {
    electron: eight_ten_electron,
    tabby: eight_ten_tabby
  },
  'three_eight': {
    electron: three_eight_electron,
    tabby: three_eight_tabby
  },
  'one_three': {
    electron: one_three_electron,
    tabby: one_three_tabby
  },
  'sixteen_three': {
    electron: sixteen_three_electron,
    tabby: sixteen_three_tabby
  },
  'three_five1': {
    electron: three_five1_electron,
    tabby: three_five1_tabby
  },
  'three_five2': {
    electron: three_five2_electron,
    tabby: three_five2_tabby
  },
  'three_three': {
    electron: three_three_electron,
    tabby: three_three_tabby
  },
  'ten_ten': {
    electron: ten_ten_electron,
    tabby: ten_ten_tabby
  },
  'ten_twelve': {
    electron: ten_twelve_electron,
    tabby: ten_twelve_tabby
  },
  'ten_nineteen': {
    electron: ten_nineteen_electron,
    tabby: ten_nineteen_tabby
  },
  /* 'eight_nineteen': {
    electron: eight_nineteen_electron,
    tabby: eight_nineteen_tabby
  }, */
  'eight_sixteen': {
    electron: eight_sixteen_electron,
    tabby: eight_sixteen_tabby
  },
  'eighteen_eight': {
    electron: eighteen_eight_electron,
    tabby: eighteen_eight_tabby
  },
  'eighteen_eighteen': {
    electron: eighteen_eighteen_electron,
    tabby: eighteen_eighteen_tabby
  },
  'eighteen_five': {
    electron: eighteen_five_electron,
    tabby: eighteen_five_tabby
  },
  'eighteen_nineteen': {
    electron: eighteen_nineteen_electron,
    tabby: eighteen_nineteen_tabby
  },
  'eighteen_three': {
    electron: eighteen_three_electron,
    tabby: eighteen_three_tabby
  },
  'fifteen_eight': {
    electron: fifteen_eight_electron,
    tabby: fifteen_eight_tabby
  },
  'fifteen_fifteen': {
    electron: fifteen_fifteen_electron,
    tabby: fifteen_fifteen_tabby
  },
  'fifteen_five': {
    electron: fifteen_five_electron,
    tabby: fifteen_five_tabby
  },
  'fifteen_nineteen1': {
    electron: fifteen_nineteen1_electron,
    tabby: fifteen_nineteen1_tabby
  },
  'fifteen_nineteen2': {
    electron: fifteen_nineteen2_electron,
    tabby: fifteen_nineteen2_tabby
  },
  'fifteen_nineteen3': {
    electron: fifteen_nineteen3_electron,
    tabby: fifteen_nineteen3_tabby
  },
  'fifteen_sixteen': {
    electron: fifteen_sixteen_electron,
    tabby: fifteen_sixteen_tabby
  },
  'fifteen_ten': {
    electron: fifteen_ten_electron,
    tabby: fifteen_ten_tabby
  },
  'fifteen_three1': {
    electron: fifteen_three1_electron,
    tabby: fifteen_three1_tabby
  },
  'fifteen_three2': {
    electron: fifteen_three2_electron,
    tabby: fifteen_three2_tabby
  },
  'five_five': {
    electron: five_five_electron,
    tabby: five_five_tabby
  },
  'nineteen_eight': {
    electron: nineteen_eight_electron,
    tabby: nineteen_eight_tabby
  },
  'nineteen_five': {
    electron: nineteen_five_electron,
    tabby: nineteen_five_tabby
  },
  'nineteen_nineteen': {
    electron: nineteen_nineteen_electron,
    tabby: nineteen_nineteen_tabby
  },
  'nineteen_three1': {
    electron: nineteen_three1_electron,
    tabby: nineteen_three1_tabby
  },
  'nineteen_three2': {
    electron: nineteen_three2_electron,
    tabby: nineteen_three2_tabby
  },
  'nineteen_twentOne': {
    electron: nineteen_twentOne_electron,
    tabby: nineteen_twentOne_tabby
  },
  'thirteen_fifteen': {
    electron: thirteen_fifteen_electron,
    tabby: thirteen_fifteen_tabby
  },
  'sixteen_three': {
    electron: sixteen_three_electron,
    tabby: sixteen_three_tabby
  },
  'sixteen_five': {
    electron: sixteen_five_electron,
    tabby: sixteen_five_tabby
  },
  'eight_sixteen': {
    electron: eight_sixteen_electron,
    tabby: eight_sixteen_tabby
  },
  'sixteen_sixteen': {
    electron: sixteen_sixteen_electron,
    tabby: sixteen_sixteen_tabby
  },
  'sixteen_eighteen': {
    electron: sixteen_eighteen_electron,
    tabby: sixteen_eighteen_tabby
  },
  'sixteen_seventeen': {
    electron: sixteen_seventeen_electron,
    tabby: sixteen_seventeen_tabby
  },
  'seventeen_seventeen': {
    electron: seventeen_seventeen_electron,
    tabby: seventeen_seventeen_tabby
  },
  'seventeen_eighteen': {
    electron: seventeen_eighteen_electron,
    tabby: seventeen_eighteen_tabby
  },
  'eight_seventeen': {
    electron: eight_seventeen_electron,
    tabby: eight_seventeen_tabby
  }
};

// Function to get trichord SVGs with enhanced matching
const getTrichordSvg = (trichordType) => {
  console.log(`Getting SVG for trichord type: ${trichordType}`);
  
  // Special handling for three_eight to ensure it doesn't match with eighteen_three
  if (trichordType === 'three_eight' && trichordSvgs['three_eight']) {
    console.log('Using exact match for three_eight');
    return trichordSvgs['three_eight'];
  }
  
  // Direct match
  if (trichordSvgs[trichordType]) {
    console.log(`Found direct match for ${trichordType}`);
    return trichordSvgs[trichordType];
  }
  
  // Special case handling for specific trichord types
  // This ensures we match the exact trichords needed for chord "three"
  const specialCases = {
    'sixteen': 'fifteen_sixteen',
    'five': 'fifteen_five',
    'three_eight': 'three_eight'  // Force three_eight to match only with itself
  };
  
  if (specialCases[trichordType]) {
    console.log(`Found special case match for ${trichordType} -> ${specialCases[trichordType]}`);
    return trichordSvgs[specialCases[trichordType]];
  }
  
  // Remove trailing numbers (for cases like 'fifteen_three1' vs 'fifteen_three')
  const baseType = trichordType.replace(/\d+$/, '');
  if (trichordSvgs[baseType]) {
    console.log(`Found base match: ${trichordType} -> ${baseType}`);
    return trichordSvgs[baseType];
  }
  
  // Try to find a match by parts (e.g., 'fifteen_nineteen1' might match with 'fifteen_nineteen')
  const [part1, part2] = trichordType.split('_');
  
  // Special handling for single-part trichord types (like 'sixteen', 'five', etc.)
  if (!part2 && part1) {
    // Look for any key that starts with or ends with this part
    const singlePartMatch = Object.keys(trichordSvgs).find(key => 
      key.startsWith(`${part1}_`) || key.endsWith(`_${part1}`)
    );
    
    if (singlePartMatch) {
      console.log(`Found single part match: ${trichordType} -> ${singlePartMatch}`);
      return trichordSvgs[singlePartMatch];
    }
  }
  
  // Look for any key that contains both parts in the correct order
  // But skip this for three_eight and eighteen_three to keep them distinct
  let matchingKey = null;
  
  // Only do partial matching if we're not dealing with three_eight or eighteen_three
  if (trichordType !== 'three_eight' && trichordType !== 'eighteen_three') {
    matchingKey = Object.keys(trichordSvgs).find(key => {
      const keyParts = key.split('_');
      return keyParts.length === 2 && 
             (keyParts[0] === part1 || keyParts[0].startsWith(part1)) && 
             (keyParts[1] === part2 || keyParts[1].startsWith(part2) || part2?.startsWith(keyParts[1]));
    });
  }
  
  if (matchingKey) {
    console.log(`Found partial match: ${trichordType} -> ${matchingKey}`);
    return trichordSvgs[matchingKey];
  }
  
  // Try reverse match (e.g., 'nineteen_fifteen' might match with 'fifteen_nineteen')
  // But completely skip this for three_eight and eighteen_three
  let reverseMatchingKey = null;
  
  // Only do reverse matching if we're not dealing with three_eight or eighteen_three
  if (trichordType !== 'three_eight' && trichordType !== 'eighteen_three') {
    reverseMatchingKey = Object.keys(trichordSvgs).find(key => {
      const keyParts = key.split('_');
      return keyParts.length === 2 && 
             (keyParts[0] === part2 || keyParts[0]?.startsWith(part2)) && 
             (keyParts[1] === part1 || keyParts[1].startsWith(part1));
    });
  }
  
  if (reverseMatchingKey) {
    console.log(`Found reverse match: ${trichordType} -> ${reverseMatchingKey}`);
    return trichordSvgs[reverseMatchingKey];
  }
  
  // Last resort: find any key that contains at least one part
  const fallbackKey = Object.keys(trichordSvgs).find(key => 
    key.includes(part1) || (part2 && key.includes(part2))
  );
  
  if (fallbackKey) {
    console.log(`Found fallback match: ${trichordType} -> ${fallbackKey}`);
    return trichordSvgs[fallbackKey];
  }
  
  console.warn(`No match found for ${trichordType}, using default fallback`);
  return {
    electron: diminishedTrichord_electron,
    tabby: diminishedTrichord_tabby
  };
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
      updatedTrichords.map(t => `${t.id} (electron: ${t.electron ? '✓' : '✗'}, tabby: ${t.tabby ? '✓' : '✗'})`) : 
      'none');
    setVisibleTrichords(updatedTrichords);
    console.log('======= TRICHORDS DISPLAY UPDATE END =======');
  }, [isVisible, selectedChords, trichordMappings, trichordPriorities]);

  // Effect to update SVG colors when trichordColor changes
  // Using useLayoutEffect for synchronous DOM updates before browser paint
  useLayoutEffect(() => {
    // Function to update all SVG colors
    const updateTrichordColors = () => {
      // Only update the color attributes, not any other attributes
      // This preserves the original SVG shapes
      
      // First, find all g elements with class 'trichord_electron'
      const trichordElectronGroups = document.querySelectorAll('g.trichord_electron');
      
      trichordElectronGroups.forEach(group => {
        // Update stroke on path elements within trichord_electron groups
        const pathElements = group.querySelectorAll('path');
        
        pathElements.forEach(path => {
          // Only change the stroke color, not any other attributes
          if (path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
            if (trichordColor !== '#ffffff') {
              path.setAttribute('stroke', trichordColor);
            } else {
              path.setAttribute('stroke', '#be4bdb'); // Default color
            }
          }
          
          // Update fill on elements with fill attribute
          if (path.getAttribute('fill') && path.getAttribute('fill') !== 'none') {
            if (trichordColor !== '#ffffff') {
              path.setAttribute('fill', trichordColor);
            } else {
              path.setAttribute('fill', '#be4bdb'); // Default color
            }
          }
        });
      });
      
      // Update the drop-shadow filter color for all SVG elements
      const svgElements = document.querySelectorAll('.trichord-svg');
      
      svgElements.forEach(svg => {
        if (trichordColor !== '#ffffff') {
          // Convert hex color to rgba for the drop-shadow
          const r = parseInt(trichordColor.slice(1, 3), 16);
          const g = parseInt(trichordColor.slice(3, 5), 16);
          const b = parseInt(trichordColor.slice(5, 7), 16);
          
          // Apply the new drop-shadow filter with the selected color
          svg.setAttribute('filter', `drop-shadow(0 0 8px rgba(${r}, ${g}, ${b}, 1))`);
        } else {
          // Reset to default purple color
          svg.setAttribute('filter', 'drop-shadow(0 0 8px rgba(218, 119, 242, 1))');
        }
      });
    };
    
    // Call the update function
    if (isVisible && visibleTrichords.length > 0) {
      // Small delay to ensure DOM elements are ready
      setTimeout(updateTrichordColors, 100);
    }
  }, [trichordColor, isVisible, visibleTrichords]);
  
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
                
                console.log(`  SVG paths for ${trichordType}:`, {
                  electron: svgPaths.electron ? '✓' : '✗',
                  tabby: svgPaths.tabby ? '✓' : '✗'
                });
                
                // Create a trichord object with both SVG components
                const trichord = {
                  id: trichordType,
                  electron: svgPaths.electron,
                  tabby: svgPaths.tabby,
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
          trichords.forEach(t => console.log(`  - ${t.id}`));
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
          
          console.log(`  SVG paths for ${trichordType}:`, {
            electron: svgPaths.electron ? '✓' : '✗',
            tabby: svgPaths.tabby ? '✓' : '✗'
          });
          
          // Create a trichord object with both SVG components
          const trichord = {
            id: trichordType,
            electron: svgPaths.electron,
            tabby: svgPaths.tabby,
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
    trichords.forEach(t => console.log(`  - ${t.id}`));
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

  // Function to render a single trichord pair (electron and tabby versions)
  const renderTrichord = (trichord) => {
    console.log(`%cRENDERING TRICHORD: ${trichord.id}`, 'background: #333; color: #bada55; padding: 2px 4px; border-radius: 2px');
    console.log(`  - Electron SVG: ${trichord.electron ? 'Available ✓' : 'Missing ✗'}`);
    console.log(`  - Tabby SVG: ${trichord.tabby ? 'Available ✓' : 'Missing ✗'}`);
    
    // Get CSS class names for this trichord
    const wrapperClass = getTrichordClassName(trichord.id, 'wrapper');
    const electronClass = getTrichordClassName(trichord.id, 'electron');
    const tabbyClass = getTrichordClassName(trichord.id, 'tabby');
    
    // In React, imported SVGs are already URL strings that can be used directly in img src
    return (
      <div 
        key={trichord.id}
        className={styles.trichordPair}
        onMouseEnter={() => handleTrichordHover(trichord.id)}
        onMouseLeave={handleTrichordHoverEnd}
      >
        {/* Electron version */}
        <div 
          className={`${styles.trichordWrapper} ${hoveredTrichord === trichord.id ? styles.hovered : ''}`}
          data-trichord-type={trichord.id}
          data-trichord-variant="electron"
        >
          <img 
            src={trichord.electron} 
            className={styles.trichordSvg}
            alt={`Electron Trichord: ${trichord.id}`}
            data-trichord-type={trichord.id}
            data-trichord-variant="electron"
            onLoad={() => console.log(`✅ Electron SVG for ${trichord.id} loaded successfully`)}
            onError={() => console.error(`❌ Failed to load electron SVG for ${trichord.id}`)}
          />
        </div>
        
        {/* Tabby version */}
        <div 
          className={`${styles.trichordWrapper} ${hoveredTrichord === trichord.id ? styles.hovered : ''}`}
          data-trichord-type={trichord.id}
          data-trichord-variant="tabby"
        >
          <img 
            src={trichord.tabby} 
            className={styles.trichordSvg}
            alt={`Tabby Trichord: ${trichord.id}`}
            data-trichord-type={trichord.id}
            data-trichord-variant="tabby"
            onLoad={() => console.log(`✅ Tabby SVG for ${trichord.id} loaded successfully`)}
            onError={() => console.error(`❌ Failed to load tabby SVG for ${trichord.id}`)}
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
