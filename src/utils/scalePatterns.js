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
const findScalePatternFromRoot = (rootPosition, scaleNotes, root, maxFretSpan = 5) => {
  const pattern = [];
  const { string: rootString, fret: rootFret } = rootPosition;
  
  // Define the fret range for this pattern - start from root, not before it
  const minFret = Math.max(0, rootFret);
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
  
  const rootPositions = findRootPositions(root || scaleNotes[0]);
  const patterns = [];
  
  // Group root positions by fret area to avoid too many similar patterns
  const fretAreas = {};
  
  rootPositions.forEach(rootPos => {
    const areaKey = Math.floor(rootPos.fret / 3) * 3; // Group by 3-fret areas
    if (!fretAreas[areaKey]) {
      fretAreas[areaKey] = [];
    }
    fretAreas[areaKey].push(rootPos);
  });
  
  // Create patterns for each fret area, prioritizing lower strings
  Object.keys(fretAreas).forEach(areaKey => {
    const areaRoots = fretAreas[areaKey];
    
    // Sort by string (lower strings first) and then by fret
    areaRoots.sort((a, b) => {
      if (a.string !== b.string) return a.string - b.string;
      return a.fret - b.fret;
    });
    
    // Take the first few root positions from this area
    const selectedRoots = areaRoots.slice(0, 2);
    
    selectedRoots.forEach(rootPos => {
      const pattern = findScalePatternFromRoot(rootPos, scaleNotes, root);
      if (pattern.notes.length > 0) {
        patterns.push(pattern);
      }
    });
  });
  
  // Sort patterns by fret position
  patterns.sort((a, b) => a.fretRange.min - b.fretRange.min);
  
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
