// Utility functions for finding scale patterns on the fretboard

// Standard guitar tuning notes for each string (low E to high E)
const GUITAR_STRINGS = [
  // 6th string (low E)
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
  // 5th string (A)
  ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
  // 4th string (D)
  ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  // 3rd string (G)
  ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
  // 2nd string (B)
  ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
  // 1st string (high E)
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#']
];

// Enharmonic equivalents for note comparison
const ENHARMONIC_MAP = {
  'C#': 'Db', 'Db': 'C#',
  'D#': 'Eb', 'Eb': 'D#',
  'F#': 'Gb', 'Gb': 'F#',
  'G#': 'Ab', 'Ab': 'G#',
  'A#': 'Bb', 'Bb': 'A#'
};

// Check if two notes are equivalent (including enharmonic equivalents)
const areNotesEquivalent = (note1, note2) => {
  if (note1 === note2) return true;
  if (ENHARMONIC_MAP[note1] === note2) return true;
  if (ENHARMONIC_MAP[note2] === note1) return true;
  return false;
};

// Check if a note is in the scale
const isNoteInScale = (note, scaleNotes) => {
  return scaleNotes.some(scaleNote => areNotesEquivalent(note, scaleNote));
};

// Find all root note positions on the fretboard
const findRootPositions = (root) => {
  const rootPositions = [];
  
  for (let stringIndex = 0; stringIndex < GUITAR_STRINGS.length; stringIndex++) {
    for (let fretIndex = 0; fretIndex < GUITAR_STRINGS[stringIndex].length; fretIndex++) {
      const note = GUITAR_STRINGS[stringIndex][fretIndex];
      if (areNotesEquivalent(note, root)) {
        rootPositions.push({
          string: stringIndex,
          fret: fretIndex,
          note: note
        });
      }
    }
  }
  
  return rootPositions;
};

// Find a scale pattern starting from a specific root position
const findScalePatternFromRoot = (rootPosition, scaleNotes, root, maxFretSpan = 4) => {
  const pattern = [];
  const { string: rootString, fret: rootFret } = rootPosition;
  
  // Define the fret range for this pattern - center around the root
  const minFret = Math.max(0, rootFret - 1);
  const maxFret = Math.min(21, rootFret + maxFretSpan);
  
  // Look for scale notes within the fret range on all strings
  for (let stringIndex = 0; stringIndex < GUITAR_STRINGS.length; stringIndex++) {
    for (let fretIndex = minFret; fretIndex <= maxFret; fretIndex++) {
      const note = GUITAR_STRINGS[stringIndex][fretIndex];
      
      if (isNoteInScale(note, scaleNotes)) {
        const isRoot = areNotesEquivalent(note, root || scaleNotes[0]);
        
        pattern.push({
          string: stringIndex,
          fret: fretIndex,
          note: note,
          isRoot: isRoot
        });
      }
    }
  }
  
  return {
    rootPosition,
    fretRange: { min: minFret, max: maxFret },
    notes: pattern,
    name: `Pattern ${minFret}-${maxFret} (${['E', 'A', 'D', 'G', 'B', 'E'][rootPosition.string]}${rootPosition.fret})`
  };
};

// Find all possible scale patterns on the fretboard
export const findAllScalePatterns = (scaleNotes, root) => {
  if (!scaleNotes || scaleNotes.length === 0) return [];
  
  const patterns = [];
  
  // Create patterns at specific fret positions to ensure they're different
  const patternStarts = [0, 3, 5, 7, 9, 12, 15, 17, 19]; // Fixed starting positions
  
  patternStarts.forEach((startFret, index) => {
    if (startFret > 21) return; // Don't go beyond fret 21
    
    const pattern = [];
    const minFret = startFret;
    const maxFret = Math.min(21, startFret + 4); // 5-fret span
    
    // Find all scale notes in this fret range
    for (let stringIndex = 0; stringIndex < GUITAR_STRINGS.length; stringIndex++) {
      for (let fretIndex = minFret; fretIndex <= maxFret; fretIndex++) {
        const note = GUITAR_STRINGS[stringIndex][fretIndex];
        
        if (isNoteInScale(note, scaleNotes)) {
          const isRoot = areNotesEquivalent(note, root || scaleNotes[0]);
          
          pattern.push({
            string: stringIndex,
            fret: fretIndex,
            note: note,
            isRoot: isRoot
          });
        }
      }
    }
    
    // Only add patterns that have notes
    if (pattern.length > 0) {
      patterns.push({
        rootPosition: null, // No specific root position for these patterns
        fretRange: { min: minFret, max: maxFret },
        notes: pattern,
        name: `Pattern ${index + 1} (Frets ${minFret}-${maxFret})`
      });
    }
  });
  
  return patterns;
};

// Get all scale notes across the entire fretboard
export const getAllScaleNotesOnFretboard = (scaleNotes, root) => {
  const allNotes = [];
  
  for (let stringIndex = 0; stringIndex < GUITAR_STRINGS.length; stringIndex++) {
    for (let fretIndex = 0; fretIndex < GUITAR_STRINGS[stringIndex].length; fretIndex++) {
      const note = GUITAR_STRINGS[stringIndex][fretIndex];
      
      if (isNoteInScale(note, scaleNotes)) {
        const isRoot = areNotesEquivalent(note, root || scaleNotes[0]);
        
        allNotes.push({
          string: stringIndex,
          fret: fretIndex,
          note: note,
          isRoot: isRoot
        });
      }
    }
  }
  
  return allNotes;
};

export default {
  findAllScalePatterns,
  getAllScaleNotesOnFretboard,
  areNotesEquivalent,
  isNoteInScale
};
