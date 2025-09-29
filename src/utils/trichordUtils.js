import { trichordMappings, trichordPriorities } from '../data/connections.js';

/**
 * Get visible trichords based on selected chords using the same logic as TrichordsDisplay
 * @param {Array} selectedChords - Array of selected chord names
 * @param {Object} customTrichordMappings - Optional custom mappings (defaults to connections.js)
 * @param {Object} customTrichordPriorities - Optional custom priorities (defaults to connections.js)
 * @returns {Array} Array of trichord type strings that should be displayed
 */
export const getVisibleTrichordTypes = (
  selectedChords = [], 
  customTrichordMappings = trichordMappings,
  customTrichordPriorities = trichordPriorities
) => {
  if (!selectedChords || selectedChords.length === 0) {
    return [];
  }
  
  if (!customTrichordMappings) {
    console.error('trichordMappings is undefined or null');
    return [];
  }
  
  // Special handling for exactly 2 selected chords - show only common trichords
  if (selectedChords.length === 2) {
    const chord1 = selectedChords[0];
    const chord2 = selectedChords[1];
    
    // Make sure both chords exist in the mappings
    if (customTrichordMappings[chord1] && customTrichordMappings[chord2]) {
      const trichords1 = customTrichordMappings[chord1];
      const trichords2 = customTrichordMappings[chord2];
      
      // Find common trichords between the two selected chords
      const commonTrichords = trichords1.filter(trichord => trichords2.includes(trichord));
      
      if (commonTrichords.length > 0) {
        // Sort common trichords by priority
        return commonTrichords
          .sort((a, b) => (customTrichordPriorities[a] || 999) - (customTrichordPriorities[b] || 999));
      }
    }
  }
  
  // Default behavior for 1 or 3+ selected chords
  // Get all unique trichord types for all selected chords
  const allTrichordTypes = new Set();
  const renderedTrichords = new Map();
  
  // Process each selected chord
  selectedChords.forEach(chord => {
    if (customTrichordMappings[chord]) {
      const types = customTrichordMappings[chord];
      
      // Add each trichord type to our set of unique types
      types.forEach(type => {
        if (!renderedTrichords.has(type)) {
          allTrichordTypes.add(type);
          renderedTrichords.set(type, chord);
        }
      });
    }
  });
  
  // Convert set back to array and sort by priority
  const uniqueTrichordTypes = Array.from(allTrichordTypes);
  return uniqueTrichordTypes
    .sort((a, b) => (customTrichordPriorities[a] || 999) - (customTrichordPriorities[b] || 999));
};
