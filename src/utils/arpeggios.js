// Arpeggio generation and management utilities

// Generate arpeggios from a scale (1st, 3rd, 5th, 7th degrees)
export const generateArpeggiosFromScale = (scaleNotes, root) => {
  console.log('Generating arpeggios from:', scaleNotes, 'length:', scaleNotes?.length);
  if (!scaleNotes || scaleNotes.length < 4) return [];
  
  const arpeggios = [];
  
  // Create arpeggios - one starting from each scale degree
  for (let startDegree = 0; startDegree < scaleNotes.length; startDegree++) {
    const arpeggio = [];
    
    // Take exactly 4 notes: start position, then skip one each time
    for (let i = 0; i < 4; i++) {
      const noteIndex = (startDegree + (i * 2)) % scaleNotes.length;
      arpeggio.push(scaleNotes[noteIndex]);
    }
    
    console.log(`Arpeggio ${startDegree + 1}:`, arpeggio);
    
    // Determine arpeggio name based on intervals
    const arpeggioName = getArpeggioName(arpeggio, scaleNotes[startDegree], startDegree + 1);
    
    arpeggios.push({
      id: startDegree,
      name: arpeggioName,
      notes: arpeggio,
      rootNote: scaleNotes[startDegree],
      scaleDegree: startDegree + 1
    });
  }
  
  return arpeggios;
};

// Determine arpeggio type/name based on intervals
const getArpeggioName = (arpeggioNotes, rootNote, degree) => {
  // This is a simplified naming - could be expanded for more accuracy
  const chordTypes = [
    'I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'
  ];
  
  const romanNumeral = chordTypes[degree - 1] || `${degree}`;
  return `${rootNote} ${romanNumeral} (${arpeggioNotes.join('-')})`;
};

// Find arpeggio notes within a specific scale pattern - linearly ascending sequence
export const findArpeggioInPattern = (arpeggio, scalePattern, minRootPosition = null) => {
  if (!arpeggio || !scalePattern || !scalePattern.notes) return [];
  
  // Find all root positions in the pattern
  const rootPositions = scalePattern.notes.filter(patternNote => 
    areNotesEquivalent(patternNote.note, arpeggio.rootNote)
  );
  
  if (rootPositions.length === 0) return [];
  
  // Sort root positions by linear order (string first, then fret)
  rootPositions.sort((a, b) => {
    if (a.string !== b.string) return a.string - b.string;
    return a.fret - b.fret;
  });
  
  // Find the appropriate root position based on minimum position
  let selectedRoot = rootPositions[0]; // Default to first root
  
  if (minRootPosition) {
    // Find the first root that's at or after the minimum position
    const validRoot = rootPositions.find(root => {
      const rootPos = root.string * 100 + root.fret;
      return rootPos >= minRootPosition;
    });
    
    if (validRoot) {
      selectedRoot = validRoot;
    } else {
      // If no valid root found, return empty (this arpeggio can't be played)
      return [];
    }
  }
  
  // Now build the arpeggio starting from this root
  const selectedPositions = [];
  
  // Add the root
  selectedPositions.push({
    ...selectedRoot,
    arpeggioNoteIndex: 0,
    arpeggioNote: arpeggio.rootNote,
    isArpeggioRoot: true
  });
  
  // Find the remaining arpeggio notes in ascending order from this root
  const rootPos = selectedRoot.string * 100 + selectedRoot.fret;
  
  for (let noteIndex = 1; noteIndex < arpeggio.notes.length; noteIndex++) {
    const targetNote = arpeggio.notes[noteIndex];
    
    // Find all positions of this note in the pattern
    const notePositions = scalePattern.notes.filter(patternNote => 
      areNotesEquivalent(patternNote.note, targetNote)
    );
    
    // Find the first occurrence that's after the current root position
    const validPosition = notePositions
      .sort((a, b) => {
        if (a.string !== b.string) return a.string - b.string;
        return a.fret - b.fret;
      })
      .find(pos => {
        const posValue = pos.string * 100 + pos.fret;
        return posValue > rootPos;
      });
    
    if (validPosition) {
      selectedPositions.push({
        ...validPosition,
        arpeggioNoteIndex: noteIndex,
        arpeggioNote: targetNote,
        isArpeggioRoot: false
      });
    }
  }
  
  // Only return if we have all 4 different arpeggio notes
  return selectedPositions.length === 4 ? selectedPositions : [];
};

// Check if two notes are equivalent (handles enharmonics)
const areNotesEquivalent = (note1, note2) => {
  if (note1 === note2) return true;
  
  // Handle enharmonic equivalents
  const enharmonics = {
    'C#': 'Db', 'Db': 'C#',
    'D#': 'Eb', 'Eb': 'D#',
    'F#': 'Gb', 'Gb': 'F#',
    'G#': 'Ab', 'Ab': 'G#',
    'A#': 'Bb', 'Bb': 'A#'
  };
  
  // Check if note1 includes a slash (e.g., "F#/Gb")
  if (note1.includes('/')) {
    const [note1a, note1b] = note1.split('/');
    return note1a === note2 || note1b === note2;
  }
  
  // Check if note2 includes a slash
  if (note2.includes('/')) {
    const [note2a, note2b] = note2.split('/');
    return note2a === note1 || note2b === note1;
  }
  
  // Check enharmonic equivalents
  return enharmonics[note1] === note2 || enharmonics[note2] === note1;
};

// Create a sequence for animated playback of arpeggio
export const createArpeggioSequence = (arpeggioPositions, tempo = 500) => {
  // Group positions by arpeggio note index for sequential playback
  const sequence = [];
  
  for (let noteIndex = 0; noteIndex < 4; noteIndex++) {
    const notePositions = arpeggioPositions.filter(pos => pos.arpeggioNoteIndex === noteIndex);
    if (notePositions.length > 0) {
      sequence.push({
        noteIndex,
        positions: notePositions,
        note: notePositions[0].arpeggioNote,
        delay: noteIndex * tempo
      });
    }
  }
  
  return sequence;
};

// Get optimal arpeggio positions (one per string/area for clean playing)
export const getOptimalArpeggioPositions = (arpeggioPositions) => {
  const optimal = [];
  const usedStrings = new Set();
  
  // Sort by string and fret
  const sorted = [...arpeggioPositions].sort((a, b) => {
    if (a.string !== b.string) return a.string - b.string;
    return a.fret - b.fret;
  });
  
  // For each arpeggio note, try to find a position on an unused string
  for (let noteIndex = 0; noteIndex < 4; noteIndex++) {
    const notePositions = sorted.filter(pos => pos.arpeggioNoteIndex === noteIndex);
    
    // Try to find a position on an unused string
    let selectedPosition = notePositions.find(pos => !usedStrings.has(pos.string));
    
    // If no unused string, take the first available position
    if (!selectedPosition && notePositions.length > 0) {
      selectedPosition = notePositions[0];
    }
    
    if (selectedPosition) {
      optimal.push(selectedPosition);
      usedStrings.add(selectedPosition.string);
    }
  }
  
  return optimal;
};
