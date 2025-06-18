// noteCalculator2.js - Alternative implementation for debugging scale note generation

// Define the chromatic scale for reference
export const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * Get the index of a note in the flatNotes array
 * @param {string} note - The note to find
 * @returns {number} - The index of the note or -1 if not found
 */
export const getNoteIndex = (note) => {
  return flatNotes.indexOf(note);
};

/**
 * Convert interval notation to semitone offset
 * @param {string} interval - Interval notation (e.g., '0', 'b3', '#5')
 * @returns {number} - Semitone offset
 */
const intervalToSemitones = (interval) => {
  const intervalMap = {
    '0': 0,   // Root
    '1': 1,   // Minor second
    'b2': 1,  // Minor second
    '2': 2,   // Major second
    'b3': 3,  // Minor third
    '3': 4,   // Major third
    '4': 5,   // Perfect fourth
    '#4': 6,  // Augmented fourth
    'b5': 6,  // Diminished fifth
    '5': 7,   // Perfect fifth
    '#5': 8,  // Augmented fifth
    'b6': 8,  // Minor sixth
    '6': 9,   // Major sixth
    'b7': 10, // Minor seventh
    '7': 11,  // Major seventh
  };
  
  return intervalMap[interval] !== undefined ? intervalMap[interval] : 0;
};

/**
 * Calculate chord notes based on root note and chord definition
 * @param {string} root - Root note
 * @param {Object} chordDef - Chord definition from chordTypes
 * @returns {string[]} - Array of notes in the chord
 */
export const calculateChordNotes = (root, chordDef) => {
  console.log(`Calculating chord notes for ${root} ${chordDef.name}`);
  
  const rootIndex = getNoteIndex(root);
  if (rootIndex === -1) {
    console.error(`Invalid root note: ${root}`);
    return [];
  }
  
  // Convert intervals to semitones and get notes
  return chordDef.intervals.map(interval => {
    const semitones = intervalToSemitones(interval);
    const noteIndex = (rootIndex + semitones) % 12;
    const note = flatNotes[noteIndex];
    console.log(`  Interval ${interval} (${semitones} semitones) -> ${note}`);
    return note;
  });
};

/**
 * Calculate notes for two chords using chord definitions and offsets
 * @param {string} rootNote - Starting root note
 * @param {Object} firstChordDef - First chord definition from chordTypes
 * @param {Object} secondChordDef - Second chord definition from chordTypes
 * @param {number|number[]} offset - Semitone offset(s) from first to second chord
 * @returns {Object} - Object containing notes for both chords and scales
 */
export const calculateTwoChords = (rootNote, firstChordDef, secondChordDef, offset) => {
  console.log(`calculateTwoChords called with:`);
  console.log(`Root note: ${rootNote}`);
  console.log(`First chord: ${firstChordDef ? firstChordDef.name : 'undefined'}`);
  console.log(`Second chord: ${secondChordDef ? secondChordDef.name : 'undefined'}`);
  console.log(`Offset: ${Array.isArray(offset) ? JSON.stringify(offset) : offset}`);
  
  // Validate inputs
  if (!rootNote || !firstChordDef || !secondChordDef) {
    console.error('Missing required parameters for calculateTwoChords');
    return {
      firstChord: { root: rootNote, notes: [] },
      secondChord: { notes: [] },
      scale: []
    };
  }
  
  // Calculate first chord notes
  const firstChordNotes = calculateChordNotes(rootNote, firstChordDef);
  console.log(`First chord notes: ${firstChordNotes.join(', ')}`);
  
  // Handle multiple offsets (scale alternatives)
  if (Array.isArray(offset) && offset.length > 0) {
    console.log(`Multiple offsets detected: ${offset.join(', ')}`);
    
    const result = {
      firstChord: {
        root: rootNote,
        type: firstChordDef.name,
        className: firstChordDef.className,
        notes: firstChordNotes
      },
      secondChord: {
        type: secondChordDef.name,
        className: secondChordDef.className
      },
      scales: {}
    };
    
    // Calculate each scale alternative
    offset.forEach((singleOffset, index) => {
      // Calculate second chord root based on offset
      const rootIndex = getNoteIndex(rootNote);
      const secondRootIndex = (rootIndex + singleOffset + 12) % 12; // Add 12 to handle negative offsets
      const secondRoot = flatNotes[secondRootIndex];
      
      console.log(`\nScale alternative ${index + 1}:`);
      console.log(`Offset: ${singleOffset}`);
      console.log(`Second chord root: ${secondRoot} (index: ${secondRootIndex})`);
      
      // Calculate second chord notes
      const secondChordNotes = calculateChordNotes(secondRoot, secondChordDef);
      console.log(`Second chord notes: ${secondChordNotes.join(', ')}`);
      
      // Calculate chromatic scale starting from first chord root
      const scale = Array.from({ length: 12 }, (_, i) => {
        const noteIndex = (rootIndex + i + singleOffset) % 12;
        return flatNotes[noteIndex];
      });
      
      console.log(`Scale ${index + 1}: ${scale.join(', ')}`);
      
      // Store this scale alternative
      result.scales[`scale${index + 1}`] = {
        offset: singleOffset,
        secondRoot,
        secondChordNotes,
        scale
      };
    });
    
    return result;
  } 
  // Handle single offset
  else {
    console.log(`Single offset: ${offset}`);
    
    // Calculate second chord root based on offset
    const rootIndex = getNoteIndex(rootNote);
    const secondRootIndex = (rootIndex + offset + 12) % 12; // Add 12 to handle negative offsets
    const secondRoot = flatNotes[secondRootIndex];
    
    console.log(`Second chord root: ${secondRoot} (index: ${secondRootIndex})`);
    
    // Calculate second chord notes
    const secondChordNotes = calculateChordNotes(secondRoot, secondChordDef);
    console.log(`Second chord notes: ${secondChordNotes.join(', ')}`);
    
    // Calculate chromatic scale starting from first chord root
    const scale = Array.from({ length: 12 }, (_, i) => {
      const noteIndex = (rootIndex + i + offset) % 12;
      return flatNotes[noteIndex];
    });
    
    console.log(`Scale: ${scale.join(', ')}`);
    
    return {
      firstChord: {
        root: rootNote,
        type: firstChordDef.name,
        className: firstChordDef.className,
        notes: firstChordNotes
      },
      secondChord: {
        root: secondRoot,
        type: secondChordDef.name,
        className: secondChordDef.className,
        notes: secondChordNotes
      },
      scale
    };
  }
};

export default {
  flatNotes,
  getNoteIndex,
  calculateChordNotes,
  calculateTwoChords
};
